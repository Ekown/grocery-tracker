import { Backdrop, Box, Fade, Modal } from '@mui/material';
import React from 'react';
import './custom-modal.scss';

function CustomModal(props) {
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={props.open}
            onClose={props.closeModal}
            closeAfterTransition
            disableEnforceFocus
            disableEscapeKeyDown
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            className="custom-modal"
        >
            <Fade in={props.open}>
                <Box className="custom-modal__body">
                    {props.children}
                </Box>
            </Fade>
        </Modal>
    );
}

export default CustomModal;