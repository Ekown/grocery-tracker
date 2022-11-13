// React
import { Stack, TextField } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { DatePicker } from '@mui/x-date-pickers';
import React from 'react';
import config from "../../../../config/config";
import CustomAutocomplete from '../../atoms/custom-autocomplete/custom-autocomplete';

class InvoiceDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formData: props.formData,
        };

    }

    componentDidUpdate(prevProps) {
    }

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

    render() {
        return (
            <Stack xs={12} className="invoice-details">
                <Grid2>
                    <CustomAutocomplete
                        size="small"
                        label="Store"
                        name="store"
                        value={this.state.formData.store}
                        fetchOptions={() => this.fetchStores()}
                        onChange={(value) => {
                            this.setState(prevState => {
                                return {
                                    ...prevState,
                                    formData: {
                                        ...prevState.formData,
                                        store: value,
                                    }
                                };
                            });
                        }}
                    />
                </Grid2>
                <Grid2>
                    <DatePicker
                        label="Transaction Date"
                        value={this.state.formData.transactionDate}
                        onChange={(newValue) => {
                            this.setState(prevState => {
                                return {
                                    ...prevState,
                                    formData: {
                                        ...prevState.formData,
                                        transactionDate: newValue,
                                    }
                                }
                            })
                        }}
                        renderInput={(params) => <TextField fullWidth size="small" {...params} />}
                    />
                </Grid2>
                <Grid2>
                    <CustomAutocomplete
                        size="small"
                        label="Cashier"
                        name="cashier"
                        value={this.state.formData.cashier}
                        fetchOptions={() => this.fetchCashiers()}
                        onChange={(value) => {
                            this.setState(prevState => {
                                return {
                                    ...prevState,
                                    formData: {
                                        ...prevState.formData,
                                        cashier: value,
                                    }
                                };
                            });
                        }}
                    />
                </Grid2>
                <Grid2>
                    <CustomAutocomplete
                        size="small"
                        label="Bagger"
                        name="bagger"
                        value={this.state.formData.bagger}
                        fetchOptions={() => this.fetchBaggers()}
                        onChange={(value) => {
                            this.setState(prevState => {
                                return {
                                    ...prevState,
                                    formData: {
                                        ...prevState.formData,
                                        bagger: value,
                                    }
                                };
                            });
                        }}
                    />
                </Grid2>
            </Stack>
        );
    }
}

export default InvoiceDetails;
