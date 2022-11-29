import React from 'react';
import './add-invoice.scss';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Card, CardContent, Container, Fab, Zoom } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import dayjs from 'dayjs';
import StepZilla from "react-stepzilla";
import InvoiceDetails from '../../../components/shared/organisms/invoice/invoice-details/invoice-details';
import { withStyles } from '@mui/styles';
import InvoiceItemList from '../../../components/shared/organisms/invoice/invoice-item-list/invoice-item-list';

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
            currentStep: 0,
            open: false,
        };
    }

    /**
     * Set form field change handlers for lifting state up
     */
    setFormChangeHandlers() {
        this.formChanges = {
            store: (store) => {
                this.setState(prevState => {
                    return {
                        ...prevState,
                        formData: {
                            ...prevState.formData,
                            store: store,
                        }
                    };
                });
            },
            branch: (branch) => {
                this.setState(prevState => {
                    return {
                        ...prevState,
                        formData: {
                            ...prevState.formData,
                            branch: branch,
                        }
                    };
                });
            },
            transactionDate: (transactionDate) => {
                this.setState(prevState => {
                    return {
                        ...prevState,
                        formData: {
                            ...prevState.formData,
                            transactionDate: transactionDate,
                        }
                    };
                });
            },
            cashier: (cashier) => {
                this.setState(prevState => {
                    return {
                        ...prevState,
                        formData: {
                            ...prevState.formData,
                            cashier: cashier,
                        }
                    };
                });
            },
            bagger: (bagger) => {
                this.setState(prevState => {
                    return {
                        ...prevState,
                        formData: {
                            ...prevState.formData,
                            bagger: bagger,
                        }
                    };
                });
            },
        }
    }

    render() {
        this.setFormChangeHandlers();

        // Set the steps for the form
        this.steps = [
            { name: 'Details', component: <InvoiceDetails formData={this.state.formData} formChanges={this.formChanges} /> },
            {
                name: 'Items', component: <InvoiceItemList open={this.state.open}
                    handleModalClose={() => {
                        this.setState({
                            open: false,
                        });
                    }}
                />
            },
        ];

        const transitionDuration = {
            enter: this.props.theme.transitions.duration.enteringScreen,
            exit: this.props.theme.transitions.duration.leavingScreen,
        };

        return (
            <Container className="add-invoice">
                <Grid2 xs={12}>
                    <h1 className="title">Add Invoice</h1>
                </Grid2>

                <Grid2 container spacing={2}>
                    <Grid2 xs={12}>
                        <Card>
                            <CardContent className="card-content">
                                <StepZilla
                                    steps={this.steps}
                                    nextButtonText="NEXT"
                                    backButtonText="PREVIOUS"
                                    backButtonCls="btn primary"
                                    nextButtonCls="btn primary"
                                    onStepChange={(step) => {
                                        this.setState({
                                            currentStep: step,
                                        });
                                    }}
                                />
                            </CardContent>
                        </Card>
                    </Grid2>
                </Grid2>

                <Zoom
                    key="primary"
                    in={this.state.currentStep === 1}
                    timeout={transitionDuration}
                    style={{
                        transitionDelay: `${this.state.currentStep === 1 ? transitionDuration.exit : 0}ms`,
                    }}
                    unmountOnExit
                >
                    <Fab
                        sx={
                            {
                                position: 'absolute',
                                bottom: 16,
                                right: 16,
                            }
                        }
                        aria-label="Add"
                        color="primary"
                        onClick={() => {
                            this.setState({
                                open: true,
                            });
                        }}
                    >
                        <AddIcon />
                    </Fab>
                </Zoom>
            </Container>
        );
    }
}

export default withStyles({}, { withTheme: true })(AddInvoice);
