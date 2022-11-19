import { Typography } from '@mui/material';
import React from 'react';
import CustomModal from '../../../../custom-modal/custom-modal';
import './add-item-modal.scss';

class AddItemModal extends React.Component {
    render() {
        return (
            <CustomModal className="add-item-modal" {...this.props}>
                <Typography id="transition-modal-title" variant="h6" component="h2">
                    Add Invoice Item
                </Typography>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                    This is where the form for the add invoice item will be
                </Typography>
            </CustomModal>
        );
    }
}

export default AddItemModal;
