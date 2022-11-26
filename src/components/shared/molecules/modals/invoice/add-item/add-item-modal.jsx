import { InputAdornment, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import QuaggaScanner from '../../../../atoms/quagga-scanner/quagga-scanner';
import Grid2 from '@mui/material/Unstable_Grid2';
import CustomModal from '../../../../custom-modal/custom-modal';
import './add-item-modal.scss';

class AddItemModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            serial_number: null,
        };
    }
    
    render() {
        return (
            <CustomModal className="add-item-modal" {...this.props}>
                <Typography id="transition-modal-title" variant="h6" component="h2">
                    Add Invoice Item
                </Typography>
                <Stack>
                    <Grid2>
                        <TextField
                            name="serial_number"
                            size="small"
                            label="Serial Number"
                            margin="normal"
                            value={this.state.serial_number ?? ''}
                            InputProps={{
                                endAdornment: <InputAdornment position="end"><QuaggaScanner onDetected={(code) => {
                                    this.setState({
                                        serial_number: code,
                                    });
                                } } /></InputAdornment>,
                            }}
                        />
                    </Grid2>
                </Stack>
            </CustomModal>
        );
    }
}

export default AddItemModal;
