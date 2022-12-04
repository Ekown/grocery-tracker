import { createSlice } from '@reduxjs/toolkit'

export const itemsSlice = createSlice({
    name: 'items',
    initialState: {
        items: [],
    },
    reducers: {
        addItem: (state, action) => {
            let price = action.payload?.price || action.payload.Prices[0].unit_price || 0;

            if (typeof price === 'string') {
                price = parseFloat(price);
            }

            let cost = price * action.payload.quantity || 0;
            let name = action.payload?.name || action.payload?.Product?.name || ''; 

            state.items.push({
                image: action.payload?.image_url || action.payload?.image,
                id: action.payload.id,
                name: name,
                size: action.payload.size,
                quantity: action.payload.quantity,
                price: price,
                cost: cost,
            });
        },

        setItems: (state, action) => {
            state.items = action.payload;
        },

        updateItem: (state, action) => {
            state.items = state.items.map((item, index) => {
                if (index === action.payload.index) {
                    return {
                        ...item,
                        ...action.payload.data,
                    };
                }

                return item;
            });
        },
    },
})

// Action creators are generated for each case reducer function
export const { addItem, setItems, updateItem } = itemsSlice.actions

export default itemsSlice.reducer