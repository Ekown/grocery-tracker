import React from 'react';
import './add-invoice.scss';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Card, CardContent, Container } from '@mui/material';
import dayjs from 'dayjs';
import StepZilla from "react-stepzilla";
import InvoiceDetails from '../../../components/shared/molecules/invoice-details/invoice-details';
import InvoiceItemList from '../../../components/shared/molecules/invoice-item-list/invoice-item-list';

class AddInvoice extends React.Component {
    constructor() {
        super();

        this.state = {
            formData: {
                transactionDate: dayjs(new Date()), //Initialize the transaction date to the current day
                store: null,
                branch: null,
                cashier: null,
                bagger: null,
            },
        };

        this.steps = [
            { name: 'Details', component: <InvoiceDetails formData={this.state.formData} /> },
            { name: 'Items', component: <InvoiceItemList /> },
        ];
    }

    render() {
        return (
            <Container className="add-invoice">
                <Grid2 xs={12}>
                    <h1 className="title">Add Invoice</h1>
                </Grid2>

                <Grid2 container spacing={2}>
                    <Grid2 xs={12}>
                        <Card>
                            <CardContent>
                                <StepZilla
                                    steps={this.steps}
                                    nextButtonText="NEXT"
                                    backButtonText="PREVIOUS"
                                    backButtonCls="btn primary"
                                    nextButtonCls="btn primary"
                                />
                            </CardContent>
                        </Card>
                    </Grid2>
                </Grid2>
            </Container>
        );
    }
}

export default AddInvoice;
