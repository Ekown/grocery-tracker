import { createSlice } from '@reduxjs/toolkit'
import Item from '../models/item';

export const itemsSlice = createSlice({
    name: 'items',
    initialState: {
        items: [],
    },
    reducers: {
        addItem: (state, action) => {
            state.items.push(Item(action.payload));
        },

        removeItem: (state, action) => {
            // @TODO: We might need to optimize deleting items from the array
            state.items = state.items.filter(item => item.id !== action.payload);
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
export const { addItem, removeItem, setItems, updateItem } = itemsSlice.actions

export default itemsSlice.reducer