# Grocery Tracker PWA - Technical Specification (Copilot Context)
**Version**: 1.0.0  
**Status**: Active Development (Solo User)  
**Last Updated**: 2026-07-25

## 1. Project Overview
A Progressive Web Application (PWA) for tracking grocery expenditures, product price histories, and shopping lists. Designed for offline-first usage (used inside stores with unstable connections). The application allows barcode scanning to add items to a cart, OCR (via Tesseract.js) for receipt scanning, and cloud synchronization to AWS S3 + PostgreSQL for analytics.

## 2. Critical Architecture Decisions
- **Monorepo**: NPM Workspaces (NO Nx, NO pnpm). Root `package.json` defines `"workspaces": ["packages/*"]`.
- **Backend**: NestJS + Sequelize (TypeScript) + PostgreSQL.
- **Frontend**: React (Vite) + Dexie.js (IndexedDB) + Tailwind + Shadcn/ui.
- **Shared Types**: `packages/shared-types` exporting Zod schemas and TS interfaces. Imported by both NestJS and React.
- **Offline-First**: IndexedDB (Dexie) is the Source of Truth. PostgreSQL is the remote replica.
- **Sync Strategy**: Local `sync_outbox` table. FIFO push to NestJS `/api/sync` when online.
- **ID Strategy**: UUID v4 generated on the client. No sequential integers.
- **Image Storage**: AWS S3 (via `@aws-sdk/client-s3`). Base64 is **never** stored in PostgreSQL. Images are Blobs in Dexie until synced.
- **OCR**: Tesseract.js v5 running in a Web Worker. Runs locally; no cloud costs.
- **Auth**: None initially. Hardcoded `user_id` in `.env`. Future-proofed with `user_id` column in all tables.

## 3. Folder Structure

```
/grocery-tracker
├── package.json (workspaces config)
├── .env (Backend AWS Keys, DB URL)
├── docs/
│ └── spec.md (this file)
├── packages/
│ ├── shared-types/
│ │ ├── src/
│ │ │ ├── schemas/ (Zod definitions)
│ │ │ └── interfaces/ (TS interfaces)
│ │ └── package.json
│ ├── backend/
│ │ ├── src/
│ │ │ ├── models/ (Sequelize models)
│ │ │ ├── modules/ (NestJS modules: Sync, Receipts, Products)
│ │ │ ├── services/ (S3 Uploader, Enrichment Queue)
│ │ │ └── main.ts
│ │ └── package.json
│ └── frontend/
│ ├── src/
│ │ ├── db/ (Dexie schema)
│ │ ├── components/ (Shadcn/ui + Barcode Scanner)
│ │ ├── hooks/ (useSync, useCart)
│ │ └── App.tsx
│ └── package.json
```


## 4. Database Schema (PostgreSQL & IndexedDB Mirror)
**Primary Key**: `id` (UUID v4) for all tables.  
**Foreign Keys**: Referenced by `_id` suffix.

### Users
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID | PK |
| `clerk_id` | String | Reserved for future auth |
| `email` | String | |

### Stores
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID | PK |
| `name` | String | "Walmart Supercenter" |
| `address` | String | Optional |

### Products
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID | PK |
| `barcode` | String | Unique, indexed |
| `name` | String | "Great Value Whole Milk" |
| `brand` | String | "Great Value" |
| `category` | String | "Dairy" |
| `is_custom` | Boolean | True if user created it manually (no barcode match) |

### Product Store Prices (Historical Tracking)
*Links products and stores to track price fluctuations over time.*
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID | PK |
| `product_id` | UUID | FK -> Products |
| `store_id` | UUID | FK -> Stores |
| `price` | Decimal(10,2) | e.g., 3.49 |
| `effective_date` | Timestamp | Date of purchase/observation |
| `receipt_id` | UUID | Nullable FK -> Receipts (traceability) |

### Receipts
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID | PK |
| `user_id` | UUID | FK -> Users |
| `store_id` | UUID | FK -> Stores |
| `total_amount` | Decimal(10,2) | Grand total |
| `tax` | Decimal(10,2) | |
| `date` | Timestamp | Purchase date |
| `image_s3_key` | String | Nullable. Path in S3 (`receipts/{userId}/{id}.jpg`) |
| `sync_status` | Enum('local','synced') | Default 'local' |

### Line Items
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID | PK |
| `receipt_id` | UUID | FK -> Receipts |
| `product_id` | UUID | FK -> Products |
| `quantity` | Integer | e.g., 2 |
| `unit_price` | Decimal(10,2) | Price per single unit |
| `total_price` | Decimal(10,2) | Calculated: quantity * unit_price |

### Shopping Lists
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID | PK |
| `user_id` | UUID | FK -> Users |
| `name` | String | "Weekly Groceries" |
| `target_store_id` | UUID | Nullable FK -> Stores |
| `status` | Enum('active','completed') | |

### Shopping List Items
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID | PK |
| `list_id` | UUID | FK -> Shopping Lists |
| `product_id` | UUID | Nullable FK -> Products |
| `custom_name` | String | Nullable (if product not in DB yet) |
| `quantity` | Integer | |
| `is_bought` | Boolean | Default false |
| `priority` | Integer | Sorting order |

### Sync Outbox (Used locally and mirrored on server for audit)
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID | PK |
| `command` | JSONB | Full operation payload (e.g., `{ type: 'UPSERT_RECEIPT', data: {...} }`) |
| `created_at` | Timestamp | Default now |

## 5. Backend API Endpoints (NestJS)

### POST /api/sync
- **Payload**: `{ userId: string, commands: OutboxCommand[] }`
- **Behavior**: Processes commands sequentially. Upserts `products`, `product_store_prices`, `receipts`, `line_items`.
- **Conflict**: Client `updated_at` > Server `updated_at` -> Client wins.
- **Enrichment**: After upserting products with `is_custom: true`, queues a BullMQ job to check Open Food Facts in the background (updates the record if found).

### POST /api/receipts/:id/upload-image
- **Payload**: Multipart form-data (image file).
- **Behavior**:
  1. Validates receipt belongs to user (hardcoded).
  2. Uploads buffer to S3 at `receipts/{userId}/{receiptId}.jpg`.
  3. Updates `receipt.image_s3_key` with the S3 key.
- **Returns**: `{ s3Url: string }`.

### GET /api/products/lookup/:barcode
- **Public fallback** (optional proxy for frontend if Open Food Facts is blocked).

## 6. Frontend User Flows (Critical)
### Flow 1: In-Store Cart Creation (Offline-first)
1. User opens PWA, navigates to "Current Cart".
2. Clicks "Scan Barcode".
3. **Barcode Logic**:
   - Query Dexie `products` by barcode.
   - If found -> Show "Add to Cart" modal.
   - If not found and **online** -> Fetch `world.openfoodfacts.org`. If found -> Save to Dexie, show modal.
   - If not found or **offline** -> Prompt user for `Product Name` (save as `is_custom: true`).
4. Modal asks for: **Unit Price** (optional, can be skipped) and **Quantity** (default 1).
5. Item added to cart (IndexedDB). Total calculated if price exists.

### Flow 2: Shopping List Management
- CRUD for lists.
- "Add to Shopping List" scans barcode -> pre-fills product.
- Checkbox toggles `is_bought`. Bought items are visually struck through.
- "Add all bought items to Cart" button (optional convenience).

### Flow 3: Receipt Finalization
1. When shopping is done, tap "Finalize Receipt".
2. Takes a photo (using Capacitor Camera or Webcam).
3. Saves image as Blob in Dexie `receipts.image_blob`.
4. Converts `line_items` from cart (linking to `products`).
5. Saves `receipt` record with `sync_status: 'local'`.
6. Pushes `SYNC_RECEIPT` command to `sync_outbox`.

### Flow 4: Receipt OCR (Background)
- Once receipt is saved, spawn a Web Worker.
- Worker loads image Blob from Dexie.
- Runs Tesseract.js (pre-process: grayscale, contrast enhancement).
- Extracts text -> attempts to match line items to existing `products` by name (fuzzy matching via Fuse.js).
- Auto-fills missing `unit_price` on the `line_items` in Dexie.
- User receives a notification "OCR Complete - Review prices".

## 7. UI/UX Design Guidelines
- **Theme**: Shadcn/ui (Sleek, minimal, modern). Default Dark/Light mode toggle.
- **Mobile-First**: Responsive design centered around the phone viewport (max-width 768px).
- **Feedback**: Toasts (Sonner) for sync status. Badge showing "Offline Mode" or "Synced".
- **Icons**: Lucide React.

## 8. Environment Variables (.env)
**Backend (.env)**:
```
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://user:pass@localhost:5432/grocery_db
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=us-east-1
S3_BUCKET_NAME=my-grocery-receipts

# Hardcoded for solo dev:
DEFAULT_USER_ID=00000000-0000-0000-0000-000000000001
```

**Frontend (.env.local)**:
```
VITE_API_URL=http://localhost:3000
VITE_DEFAULT_USER_ID=00000000-0000-0000-0000-000000000001
```


## 9. Implementation Phases
- **Phase 1 (Week 1)**: Dexie schema setup. Barcode scanner. Manual cart creation. Shopping List CRUD. Zero Backend.
- **Phase 2 (Week 2)**: Receipt finalization (image blob storage in Dexie). Background Tesseract Worker. OCR review UI.
- **Phase 3 (Week 3)**: NestJS setup + Sequelize models. `POST /sync` endpoint. Frontend sync engine pushing outbox commands.
- **Phase 4 (Week 4)**: S3 Upload integration. Dashboard Analytics (Recharts showing price history and spending by category).

## 10. Key Libraries & Versions
- **Shared**: `zod@^3.22`, `uuid@^9.0`
- **Frontend**: `react@^18.2`, `vite@^5.0`, `dexie@^4.0`, `@zxing/library@^0.19`, `tesseract.js@^5.0`, `tailwindcss@^3.4`, `@radix-ui/react-*` (Shadcn)
- **Backend**: `@nestjs/core@^10.0`, `@nestjs/sequelize@^10.0`, `sequelize@^6.32`, `pg@^8.11`, `@aws-sdk/client-s3@^3.500`, `bullmq@^5.0`

---
**End of Specification**