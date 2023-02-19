import { createSlice } from '@reduxjs/toolkit'

export const addInvoiceSlice = createSlice({
    name: 'add_invoice',
    initialState: {
        currentStep: 0,
        modals: [
            {
                name: 'add-item-modal',
                open: false,
            },
            {
                name: 'edit-item-modal',
                open: false,
            }
        ],
    },
    reducers: {
        setCurrentStep: (state, action) => {
            state.currentStep = action.payload;
        },

        setOpenModal: (state, action) => {
            state.modals = state.modals.map((modal, index) => {
                if (modal.name === action.payload) {
                    return {
                        ...modal,
                        open: true,
                    };
                }

                return modal;
            });
        },

        setCloseModal: (state, action) => {
            state.modals = state.modals.map((modal, index) => {
                if (modal.name === action.payload) {
                    return {
                        ...modal,
                        open: false,
                    };
                }

                return modal;
            });
        },
    },
})

// Action creators are generated for each case reducer function
export const { setCurrentStep, setOpenModal, setCloseModal} = addInvoiceSlice.actions

export default addInvoiceSlice.reducer