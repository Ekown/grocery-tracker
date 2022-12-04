import { configureStore, combineReducers } from '@reduxjs/toolkit'
import loadingSlice from '../reducers/loadingSlice'
import addInvoiceSlice from '../reducers/invoice/add-invoice/addInvoiceSlice';
import invoiceSlice from '../reducers/invoice/invoiceSlice';
import itemsSlice from '../reducers/itemsSlice';

const addInvoiceReducer = combineReducers({
    ui: addInvoiceSlice,
    invoice: invoiceSlice,
});

export default configureStore({
    reducer: {
        loading: loadingSlice,
        addInvoice: addInvoiceReducer,
        items: itemsSlice,
    },
})