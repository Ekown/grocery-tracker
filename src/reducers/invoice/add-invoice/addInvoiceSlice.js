import { createSlice } from '@reduxjs/toolkit'

export const addInvoiceSlice = createSlice({
    name: 'add_invoice',
    initialState: {
        currentStep: 0,
        open: false,
    },
    reducers: {
        setCurrentStep: (state, action) => {
            state.currentStep = action.payload;
        },

        setOpen: (state, action) => {
            state.open = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setCurrentStep, setOpen} = addInvoiceSlice.actions

export default addInvoiceSlice.reducer