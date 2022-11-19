import { Backdrop, Box, Fade, Modal } from '@mui/material';
import React from 'react';
import './custom-modal.scss';

class CustomModal extends React.Component {
    render() {
        return (
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={this.props.open}
                onClose={this.props.closeModal}
                closeAfterTransition
                disableEnforceFocus
                disableEscapeKeyDown
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
                className="custom-modal"
            >
                <Fade in={this.props.open}>
                    <Box className="custom-modal__body">
                        {this.props.children}
                    </Box>
                </Fade>
            </Modal>
        )
    }
}

export default CustomModal;