// React
import { Stack, TextField } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { DatePicker } from '@mui/x-date-pickers';
import React from 'react';
import config from "../../../../../config/config";
import CustomAutocomplete from '../../../atoms/custom-autocomplete/custom-autocomplete';

class InvoiceDetails extends React.Component {
    /**
     * Fetch all baggers from the API
     * 
     * @returns {Promise<Response>}
     */
    fetchBaggers() {
        return fetch(`${config.API_URL}/api/baggers/list`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    return data;
                }
            });
    }

    /**
     * Fetch all cashiers from the API
     * 
     * @returns {Promise<Response>}
     */
    fetchCashiers() {
        return fetch(`${config.API_URL}/api/cashiers/list`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    return data;
                }
            });
    }

    /**
     * Fetch all stores from the API
     * 
     * @returns {Promise<Response>}
     */
    fetchStores() {
        return fetch(`${config.API_URL}/api/stores/list`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    return data;
                }
            });
    }

    /**
     * Fetch branches by store from the API
     * 
     * @returns {Promise<Response>}
     */
     fetchBranchByStore(storeId) {
        return fetch(`${config.API_URL}/api/stores/${storeId}/branch`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    return data;
                }
            });
    }

    render() {
        return (
            <Stack xs={12} className="invoice-details">
                <Grid2>
                    <CustomAutocomplete
                        size="small"
                        label="Store"
                        name="store"
                        value={this.props.formData.store}
                        fetchOptions={() => this.fetchStores()}
                        onChange={(value) => {
                            this.props.formChanges.store(value);

                            // If the selected store is cleared, clear the branch field too
                            if (value === null) {
                                this.props.formChanges.branch(null);
                            }
                        }}
                    />
                </Grid2>
                {
                    this.props.formData.store ?
                        <Grid2>
                            <CustomAutocomplete
                                size="small"
                                label="Branch"
                                name="branch"
                                value={this.props.formData.branch}
                                fetchOptions={() => this.fetchBranchByStore(this.props.formData.store.id)}
                                onChange={(value) => {
                                    this.props.formChanges.branch(value);
                                }}
                                store={this.props.formData.store.id}
                            />
                        </Grid2> : null
                }
                <Grid2>
                    <DatePicker
                        label="Transaction Date"
                        value={this.props.formData.transactionDate}
                        onChange={(value) => {
                            this.props.formChanges.transactionDate(value);
                        }}
                        renderInput={(params) => <TextField fullWidth size="small" {...params} />}
                    />
                </Grid2>
                <Grid2>
                    <CustomAutocomplete
                        size="small"
                        label="Cashier"
                        name="cashier"
                        value={this.props.formData.cashier}
                        fetchOptions={() => this.fetchCashiers()}
                        onChange={(value) => {
                            this.props.formChanges.cashier(value);
                        }}
                    />
                </Grid2>
                <Grid2>
                    <CustomAutocomplete
                        size="small"
                        label="Bagger"
                        name="bagger"
                        value={this.props.formData.bagger}
                        fetchOptions={() => this.fetchBaggers()}
                        onChange={(value) => {
                            this.props.formChanges.bagger(value);
                        }}
                    />
                </Grid2>
            </Stack>
        );
    }
}

export default InvoiceDetails;
