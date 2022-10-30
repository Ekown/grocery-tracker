import React from 'react';
import './add-invoice.scss';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Autocomplete, CircularProgress, Container, Stack, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

class AddInvoice extends React.Component {
    constructor() {
        super();

        this.state = {
            selectOptions: {
                cashiers: [],
                baggers: [],
            },
            formData: {
                transactionDate: dayjs(new Date()), //Initialize the transaction date to the current day
                cashier: null,
                bagger: null,
            },
        };

        this.loading = this.state.selectOptions.cashiers.length === 0;
    }

    render() {
        return (
            <Container className="add-invoice">
                <Grid2 container spacing={2}>
                    <Grid2 xs={12}>
                        <h1 className="title">Add Invoice</h1>
                    </Grid2>

                    <Grid2 xs={12}>
                        <Stack xs={12} spacing={1}>
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
                                    renderInput={(params) => <TextField fullWidth size="large" {...params} />}
                                />
                            </Grid2>
                            <Grid2>
                                <Autocomplete
                                    selectOnFocus
                                    clearOnBlur
                                    handleHomeEndKeys
                                    freeSolo
                                    value={this.state.formData.cashier}
                                    options={this.state.selectOptions.cashiers}
                                    loading={this.loading}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            label="Cashier"
                                            InputProps={{
                                                ...params.InputProps,
                                                endAdornment: (
                                                    <React.Fragment>
                                                        {this.loading ? <CircularProgress color="inherit" size={20} /> : null}
                                                        {params.InputProps.endAdornment}
                                                    </React.Fragment>
                                                ),
                                            }}
                                        />
                                    }
                                />
                            </Grid2>
                            <Grid2>
                                <Autocomplete
                                    selectOnFocus
                                    clearOnBlur
                                    handleHomeEndKeys
                                    freeSolo
                                    value={this.state.formData.bagger}
                                    options={[]}
                                    renderInput={(params) => <TextField {...params} label="Bagger" />}
                                />
                            </Grid2>
                        </Stack>
                    </Grid2>
                </Grid2>
            </Container>
        );
    }
}

export default AddInvoice;
