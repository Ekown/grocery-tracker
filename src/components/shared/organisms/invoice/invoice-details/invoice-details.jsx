// React
import { Stack, TextField } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import config from "../../../../../config/config";
import { setBagger, setBranch, setCashier, setStore, setTransactionDate } from '../../../../../reducers/invoice/invoiceSlice';
import CustomAutocomplete from '../../../atoms/custom-autocomplete/custom-autocomplete';

function InvoiceDetails() {
    const invoiceFormData = useSelector((state) => state.addInvoice.invoice);
    const dispatch = useDispatch();

    /**
     * Fetch all baggers from the API
     * 
     * @returns {Promise<Response>}
     */
     const fetchBaggers = async () => {
        const res = await fetch(`${config.API_URL}/api/baggers/list`);
         const data = await res.json();
         if (data) {
             return data;
         }
    }

    /**
     * Fetch all cashiers from the API
     * 
     * @returns {Promise<Response>}
     */
     const fetchCashiers = async () => {
        const res = await fetch(`${config.API_URL}/api/cashiers/list`);
         const data = await res.json();
         if (data) {
             return data;
         }
    }

    /**
     * Fetch all stores from the API
     * 
     * @returns {Promise<Response>}
     */
     const fetchStores = async () => {
        const res = await fetch(`${config.API_URL}/api/stores/list`);
         const data = await res.json();
         if (data) {
             return data;
         }
    }

    /**
     * Fetch branches by store from the API
     * 
     * @returns {Promise<Response>}
     */
     const fetchBranchByStore = async (storeId) => {
        const res = await fetch(`${config.API_URL}/api/stores/${storeId}/branch`);
         const data = await res.json();
         if (data) {
             return data;
         }
    }

    return (
        <Stack xs={12} className="invoice-details">
            <Grid2>
                <CustomAutocomplete
                    size="small"
                    label="Store"
                    name="store"
                    value={invoiceFormData.store}
                    fetchOptions={() => fetchStores()}
                    onChange={(value) => {
                        dispatch(setStore(value));

                        // If the selected store is cleared, clear the branch field too
                        if (value === null) {
                            dispatch(setBranch(null));
                        }
                    }}
                />
            </Grid2>
            {
                invoiceFormData.store ?
                    <Grid2>
                        <CustomAutocomplete
                            size="small"
                            label="Branch"
                            name="branch"
                            value={invoiceFormData.branch}
                            fetchOptions={() => fetchBranchByStore(invoiceFormData.store.id)}
                            onChange={(value) => {
                                dispatch(setBranch(value));
                            }}
                            store={invoiceFormData.store.id}
                        />
                    </Grid2> : null
            }
            <Grid2>
                <DatePicker
                    label="Transaction Date"
                    value={dayjs(invoiceFormData.transactionDate)}
                    onChange={(value) => {
                        dispatch(setTransactionDate(dayjs(value).format()));
                    }}
                    renderInput={(params) => <TextField fullWidth size="small" {...params} />}
                />
            </Grid2>
            <Grid2>
                <CustomAutocomplete
                    size="small"
                    label="Cashier"
                    name="cashier"
                    value={invoiceFormData.cashier}
                    fetchOptions={() => fetchCashiers()}
                    onChange={(value) => {
                        dispatch(setCashier(value));
                    }}
                />
            </Grid2>
            <Grid2>
                <CustomAutocomplete
                    size="small"
                    label="Bagger"
                    name="bagger"
                    value={invoiceFormData.bagger}
                    fetchOptions={() => fetchBaggers()}
                    onChange={(value) => {
                        dispatch(setBagger(value));
                    }}
                />
            </Grid2>
        </Stack>
    );
}

export default InvoiceDetails;