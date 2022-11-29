import { Button, InputAdornment, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import config from "../../../../../../config/config";
import QuaggaScanner from '../../../../atoms/quagga-scanner/quagga-scanner';
import Grid2 from '@mui/material/Unstable_Grid2';
import CustomModal from '../../../../custom-modal/custom-modal';
import './add-item-modal.scss';
import ItemCard from '../../../item-card/item-card';

class AddItemModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            serial_number: null,
            product: null,
        };
    }

    /**
     * Search for the product
     * 
     * @param {Event} e - Event object
     */
    searchProduct = e => {
        fetch(`${config.API_URL}/api/products/sku/${this.state.serial_number}`)
            .then(res => res.json())
            .then(product => {
                if (product && product !== {}) {
                    this.setState({ product: product });
                } else {
                    this.setState({ product: null });
                }
            });
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
                            onChange={(event) => {
                                this.setState({
                                    serial_number: event.target.value
                                });
                            }}
                            value={this.state.serial_number ?? ''}
                            InputProps={{
                                endAdornment: <InputAdornment position="end"><QuaggaScanner onDetected={(code) => {
                                    this.setState({
                                        serial_number: code,
                                    });
                                }} /></InputAdornment>,
                            }}
                        />
                        <center><Button variant="contained" onClick={this.searchProduct}>Search Product</Button></center>
                    </Grid2>

                    {
                        this.state.serial_number && this.state.product ?
                            <Grid2>
                                {
                                    this.state.product?.id ?
                                        <div>
                                            <ItemCard
                                                item={{
                                                    image: this.state.product.image_url,
                                                    id: this.state.product.id,
                                                    name: this.state.product.Product.name,
                                                    size: this.state.product.size,
                                                    quantity: 1,
                                                    // price: 70.75,
                                                    // cost: 70.75,
                                                }}
                                            />
                                            <center>
                                                <Button
                                                    variant="contained"
                                                    onClick={e => {
                                                        this.props.handleAddProduct(this.state.product)
                                                    }}>Add Product</Button>
                                            </center>
                                        </div> : <div>No product found</div>
                                }
                            </Grid2> : null
                    }
                </Stack>
            </CustomModal>
        );
    }
}

export default AddItemModal;
