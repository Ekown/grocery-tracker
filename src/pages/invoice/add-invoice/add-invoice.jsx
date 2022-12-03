import React from 'react';
import './add-invoice.scss';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Card, CardContent, Container, Fab, Zoom } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
// import dayjs from 'dayjs';
import StepZilla from "react-stepzilla";
import InvoiceDetails from '../../../components/shared/organisms/invoice/invoice-details/invoice-details';
import { useTheme } from '@mui/material/styles';
import InvoiceItemList from '../../../components/shared/organisms/invoice/invoice-item-list/invoice-item-list';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentStep, setOpen } from '../../../reducers/invoice/add-invoice/addInvoiceSlice';

function AddInvoice() {
    const theme = useTheme();    
    const isModalOpen = useSelector((state) => state.addInvoice.ui.open);
    const currentStep = useSelector((state) => state.addInvoice.ui.currentStep);
    const dispatch = useDispatch();

    // Set the steps for the form
    const steps = [
        { name: 'Details', component: <InvoiceDetails /> },
        {
            name: 'Items', component: <InvoiceItemList open={isModalOpen}
                handleModalClose={() => {
                    dispatch(setOpen(false))
                }}
            />
        },
    ];

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
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
                                steps={steps}
                                nextButtonText="NEXT"
                                backButtonText="PREVIOUS"
                                backButtonCls="btn primary"
                                nextButtonCls="btn primary"
                                onStepChange={(step) => {
                                    dispatch(setCurrentStep(step));
                                }}
                            />
                        </CardContent>
                    </Card>
                </Grid2>
            </Grid2>

            <Zoom
                key="primary"
                in={currentStep === 1}
                timeout={transitionDuration}
                style={{
                    transitionDelay: `${currentStep === 1 ? transitionDuration.exit : 0}ms`,
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
                        dispatch(setOpen(true))
                    }}
                >
                    <AddIcon />
                </Fab>
            </Zoom>
        </Container>
    );
}

export default AddInvoice;