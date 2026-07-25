import { z } from 'zod';

/** Base fields shared across all entities */
const BaseEntity = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});

// ── Users ──────────────────────────────────────────────

export const UserSchema = BaseEntity.extend({
  clerk_id: z.string().nullable().optional(),
  email: z.string().email().optional(),
});
export type User = z.infer<typeof UserSchema>;

// ── Stores ─────────────────────────────────────────────

export const StoreSchema = BaseEntity.extend({
  name: z.string().min(1),
  address: z.string().optional(),
});
export type Store = z.infer<typeof StoreSchema>;

// ── Products ───────────────────────────────────────────

export const ProductSchema = BaseEntity.extend({
  barcode: z.string().min(1),
  name: z.string().min(1),
  brand: z.string().optional(),
  category: z.string().optional(),
  is_custom: z.boolean().default(false),
});
export type Product = z.infer<typeof ProductSchema>;

// ── Product Store Prices ───────────────────────────────

export const ProductStorePriceSchema = BaseEntity.extend({
  product_id: z.string().uuid(),
  store_id: z.string().uuid(),
  price: z.number().positive().multipleOf(0.01),
  effective_date: z.string().datetime(),
  receipt_id: z.string().uuid().nullable().optional(),
});
export type ProductStorePrice = z.infer<typeof ProductStorePriceSchema>;

// ── Receipts ───────────────────────────────────────────

export const SyncStatusEnum = z.enum(['local', 'synced']);
export type SyncStatus = z.infer<typeof SyncStatusEnum>;

export const ReceiptSchema = BaseEntity.extend({
  user_id: z.string().uuid(),
  store_id: z.string().uuid(),
  total_amount: z.number().positive().multipleOf(0.01).optional(),
  tax: z.number().positive().multipleOf(0.01).optional(),
  date: z.string().datetime(),
  image_s3_key: z.string().nullable().optional(),
  sync_status: SyncStatusEnum.default('local'),
});
export type Receipt = z.infer<typeof ReceiptSchema>;

// ── Line Items ─────────────────────────────────────────

export const LineItemSchema = BaseEntity.extend({
  receipt_id: z.string().uuid(),
  product_id: z.string().uuid(),
  quantity: z.number().int().positive().default(1),
  unit_price: z.number().positive().multipleOf(0.01),
  total_price: z.number().positive().multipleOf(0.01),
});
export type LineItem = z.infer<typeof LineItemSchema>;

// ── Shopping Lists ─────────────────────────────────────

export const ListStatusEnum = z.enum(['active', 'completed']);
export type ListStatus = z.infer<typeof ListStatusEnum>;

export const ShoppingListSchema = BaseEntity.extend({
  user_id: z.string().uuid(),
  name: z.string().min(1),
  target_store_id: z.string().uuid().nullable().optional(),
  status: ListStatusEnum.default('active'),
});
export type ShoppingList = z.infer<typeof ShoppingListSchema>;

// ── Shopping List Items ────────────────────────────────

export const ShoppingListItemSchema = BaseEntity.extend({
  list_id: z.string().uuid(),
  product_id: z.string().uuid().nullable().optional(),
  custom_name: z.string().nullable().optional(),
  quantity: z.number().int().positive().default(1),
  is_bought: z.boolean().default(false),
  priority: z.number().int().default(0),
});
export type ShoppingListItem = z.infer<typeof ShoppingListItemSchema>;

// ── Sync Outbox ────────────────────────────────────────

export const OutboxCommandSchema = z.object({
  id: z.string().uuid(),
  type: z.enum([
    'UPSERT_PRODUCT',
    'UPSERT_STORE',
    'UPSERT_RECEIPT',
    'UPSERT_LINE_ITEM',
    'UPSERT_PRODUCT_STORE_PRICE',
    'UPSERT_SHOPPING_LIST',
    'UPSERT_SHOPPING_LIST_ITEM',
    'DELETE_SHOPPING_LIST',
    'DELETE_SHOPPING_LIST_ITEM',
  ]),
  data: z.record(z.string(), z.unknown()),
  created_at: z.string().datetime(),
});
export type OutboxCommand = z.infer<typeof OutboxCommandSchema>;

// ── API Payloads ───────────────────────────────────────

export const SyncRequestSchema = z.object({
  userId: z.string().uuid(),
  commands: z.array(OutboxCommandSchema),
});
export type SyncRequest = z.infer<typeof SyncRequestSchema>;

export const SyncResponseSchema = z.object({
  success: z.boolean(),
  processed: z.number().int().nonnegative(),
  errors: z.array(z.object({ id: z.string().uuid(), error: z.string() })),
});
export type SyncResponse = z.infer<typeof SyncResponseSchema>;
