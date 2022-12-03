import { createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs';

export const invoiceSlice = createSlice({
    name: 'invoice',
    initialState: {
        transactionDate: dayjs().format(), //Initialize the transaction date to the current day
        store: null,
        branch: null,
        cashier: null,
        bagger: null,
    },
    reducers: {
        setTransactionDate: (state, action) => {
            state.transactionDate = action.payload;
        },

        setStore: (state, action) => {
            state.store = action.payload;
        },

        setBranch: (state, action) => {
            state.branch = action.payload;
        },

        setCashier: (state, action) => {
            state.cashier = action.payload;
        },

        setBagger: (state, action) => {
            state.bagger = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setTransactionDate, setStore, setBranch, setCashier, setBagger } = invoiceSlice.actions

export default invoiceSlice.reducer