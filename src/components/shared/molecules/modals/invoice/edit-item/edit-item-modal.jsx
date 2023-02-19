import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import Grid2 from '@mui/material/Unstable_Grid2';
import CustomModal from '../../../../custom-modal/custom-modal';
import './edit-item-modal.scss';
import ItemCard from '../../../item-card/item-card';

function EditItemModal(props) {
    // const [serialNumber, setSerialNumber] = useState(null);
    // const [product, setProduct] = useState(props.product);

    /**
     * Search for the product
     * 
     * @param {Event} e - Event object
     */
    // const searchProduct = e => {
    //     fetch(`${config.API_URL}/api/products/sku/${serialNumber}`)
    //         .then(res => res.json())
    //         .then(product => {
    //             if (product && product !== {}) {
    //                 setProduct(Item(product))
    //             } else {
    //                 setProduct(null);
    //             }
    //         });
    // }

    return (
        <CustomModal className="edit-item-modal" {...props}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
                Edit Invoice Item
            </Typography>
            <Stack>
                {/* <Grid2>
                    <TextField
                        name="serial_number"
                        size="small"
                        label="Serial Number"
                        margin="normal"
                        onChange={(event) => {
                            setSerialNumber(event.target.value);
                        }}
                        value={serialNumber ?? ''}
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><QuaggaScanner onDetected={(code) => {
                                setSerialNumber(code);
                            }} /></InputAdornment>,
                        }}
                    />
                    <center><Button variant="contained" onClick={searchProduct}>Search Product</Button></center>
                </Grid2> */}

                {/* {
                    serialNumber && product ?
                        <Grid2>
                            {
                                product?.id ?
                                    <div>
                                        <ItemCard
                                            item={product}
                                        />
                                        <center>
                                            <Button
                                                variant="contained"
                                                onClick={e => {
                                                    props.handleAddProduct(product)
                                                }}>Add Product</Button>
                                        </center>
                                    </div> : <div>No product found</div>
                            }
                        </Grid2> : null
                } */}

                <Grid2>
                    <div>
                        <ItemCard
                            item={props.product}
                        />
                        {/* <center>
                            <Button
                                variant="contained"
                                onClick={e => {
                                    props.handleAddProduct(product)
                                }}>Add Product</Button>
                        </center> */}
                    </div>
                </Grid2>
            </Stack>
        </CustomModal>
    );
}

export default EditItemModal;
