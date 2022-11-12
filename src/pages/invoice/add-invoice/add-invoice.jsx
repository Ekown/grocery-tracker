import React from 'react';
import './add-invoice.scss';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Card, CardContent, Container } from '@mui/material';
import dayjs from 'dayjs';
import MultiStep from 'react-multistep';
import InvoiceDetails from '../../../components/shared/molecules/invoice-details/invoice-details';
import InvoiceItemList from '../../../components/shared/molecules/invoice-item-list/invoice-item-list';

class AddInvoice extends React.Component {
    constructor() {
        super();

        this.state = {
            formData: {
                transactionDate: dayjs(new Date()), //Initialize the transaction date to the current day
                cashier: null,
                bagger: null,
            },
        };

        this.steps = [
            { title: 'Details', component: <InvoiceDetails formData={this.state.formData} /> },
            { title: 'Items', component: <InvoiceItemList formData={this.state.formData} /> },
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
                                <MultiStep activeStep={0} showNavigation={true} steps={this.steps} />
                            </CardContent>
                        </Card>
                    </Grid2>
                </Grid2>
            </Container>
        );
    }
}

export default AddInvoice;
