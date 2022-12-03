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
    const { store, branch, transactionDate, cashier, bagger } = useSelector((state) => state.addInvoice.invoice);
    const dispatch = useDispatch();

    // console.log(store);

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
                    value={store}
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
                store ?
                    <Grid2>
                        <CustomAutocomplete
                            size="small"
                            label="Branch"
                            name="branch"
                            value={branch}
                            fetchOptions={() => fetchBranchByStore(store.id)}
                            onChange={(value) => {
                                dispatch(setBranch(value));
                            }}
                            store={store.id}
                        />
                    </Grid2> : null
            }
            <Grid2>
                <DatePicker
                    label="Transaction Date"
                    value={dayjs(transactionDate)}
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
                    value={cashier}
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
                    value={bagger}
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