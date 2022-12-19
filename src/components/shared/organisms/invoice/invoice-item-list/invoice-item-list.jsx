// import { Html5Qrcode } from 'html5-qrcode';
import React, { useState } from 'react';
import { List } from '@mui/material';
import './invoice-item-list.scss';
import ItemCard from '../../../molecules/item-card/item-card';
import AddItemModal from '../../../molecules/modals/invoice/add-item/add-item-modal';
import { useNonInitialEffect } from '../../../../../hooks/useNonInitialEffect';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem, updateItem } from '../../../../../reducers/itemsSlice';
import { SwipeableList, SwipeableListItem, SwipeAction, TrailingActions, Type as ListType, } from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function InvoiceItemList(props) {
    // const [showCamera, setShowCamera] = useState(false);
    // const [scanResult, setScanResult] = useState(null);
    const { items } = useSelector((state) => state.items);
    const dispatch = useDispatch();

    const testItems = [
        {
            image_url: "test",
            id: '11',
            Product: {
                name: "Stik-O Jr. Choco"
            },
            size: "380G",
            quantity: 1,
            price: 70.75,
        },
        {
            image_url: "test",
            id: '22',
            Product: {
                name: "Del Monte Four Seasons"
            },
            size: "1L",
            quantity: 2,
            price: 87.30,
        },
        {
            image_url: "test",
            id: '33',
            Product: {
                name: "Del Monte Pineapple Strawberry"
            },
            size: "1L",
            quantity: 1,
            price: 84.30,
        },
        {
            image_url: "test",
            id: '331',
            Product: {
                name: "Krem Top Creamer"
            },
            size: "500G",
            quantity: 5,
            price: 69.10,
        },
        {
            image_url: "test",
            id: '44',
            Product: {
                name: "Purefoods Liver Spread"
            },
            size: "85G",
            quantity: 1,
            price: 28.50,
        },
        {
            image_url: "test",
            id: '55',
            Product: {
                name: "Quaker Instant Oats Chocolate"
            },
            size: "500G",
            quantity: 2,
            price: 104,
        },
    ];

    // Remove this before deploying to production
    useNonInitialEffect(() => {
        if (items.length === 0) {
            testItems.forEach(item => {
                dispatch(addItem(item));
            });
        }
    }, []);

    /**
     * Deletes the item from the list and store
     * 
     * @param {String} id ID of the item to be deleted 
     */
    const deleteItem = (id) => {
        dispatch(removeItem(id));
    }

    /**
     * Trailing actions for the list items
     * 
     * @param {String} id ID of the item which the trailing action is triggered
     * @returns {ReactJSXElement}
     */
    const trailingActions = (id) => (
        <TrailingActions>
            <SwipeAction className="edit-swipe-action" onClick={() => console.info('swipe action triggered')}>
                <EditIcon />
            </SwipeAction>
            <SwipeAction
                className="delete-swipe-action"
                destructive={true}
                onClick={() => deleteItem(id)}
            >
                <DeleteIcon />
            </SwipeAction>
        </TrailingActions>
    );

    /**
     * Get the computed total cost of the items
     * 
     * @returns {Number} - Total cost of the items
     */
    const getTotalCost = () => {
        return items.reduce((a, b) => {
            return a + (b['cost'] ?? 0);
        }, 0);
    }

    /**
     * Get the computed total quantity of the items
     * 
     * @returns {Number} - Total quantity of the items
     */
    const getTotalQuantity = () => {
        return items.reduce((a, b) => {
            return a + (b['quantity'] ?? 0);
        }, 0);
    }

    const [totalCost, setTotalCost] = useState(getTotalCost());
    const [totalQuantity, setTotalQuantity] = useState(getTotalQuantity());

    useNonInitialEffect(() => {
        setTotalCost(getTotalCost());
        setTotalQuantity(getTotalQuantity());
        // eslint-disable-next-line
    }, [items]);

    /**
     * Adds the product to the list 
     * 
     * @param {Object} product The added product object from the Add Product modal
     */
    const addProduct = product => {
        dispatch(addItem(product));
    }

    /**
     * Update quantity for an item
     * 
     * @param {Number} updatedQuantity - Updated quantity value
     * @param {Number} item - Item object
     */
    const updateItemQuantity = (updatedQuantity, item) => {
        let foundIndex = items.findIndex(x => x.id === item.id);

        dispatch(updateItem({
            index: foundIndex,
            data: {
                quantity: updatedQuantity,
                cost: (updatedQuantity * item.price),
            },
        }));
    }

    // scan = () => {
    //     this.html5QrCode = new Html5Qrcode("reader");

    //     // Square QR box with edge size = 70% of the smaller edge of the viewfinder.
    //     const qrboxFunction = function (viewfinderWidth, viewfinderHeight) {
    //         let minEdgePercentage = 0.7; // 70%
    //         let minEdgeSize = Math.min(viewfinderWidth, viewfinderHeight);
    //         let qrboxSize = Math.floor(minEdgeSize * minEdgePercentage);
    //         return {
    //             width: qrboxSize,
    //             height: qrboxSize
    //         };
    //     }

    //     const config = {
    //         fps: 10,
    //         qrbox: qrboxFunction,
    //         rememberLastUsedCamera: true,
    //         showTorchButtonIfSupported: true,
    //         useBarCodeDetectorIfSupported: true,
    //         // formatsToSupport: [
    //         //     Html5QrcodeSupportedFormats.EAN_13,
    //         //     Html5QrcodeSupportedFormats.EAN_8,
    //         //     Html5QrcodeSupportedFormats.UPC_A,
    //         //     Html5QrcodeSupportedFormats.UPC_E,
    //         //     Html5QrcodeSupportedFormats.UPC_EAN_EXTENSION,
    //         // ],
    //     };

    //     const onNewScanResult = (decodedText, decodedResult) => {
    //         console.log(decodedText);
    //         console.log(decodedResult);

    //         alert(decodedText);

    //         this.stopScan();
    //     }

    //     // Select back camera or fail with `OverconstrainedError`.
    //     this.html5QrCode.start({ facingMode: { exact: "environment" } }, config, onNewScanResult);
    // }

    // stopScan = () => {
    //     this.html5QrCode.stop().then((ignore) => {
    //         this.html5QrCode.clear();
    //         // QR Code scanning is stopped.
    //         console.log('ignore', ignore);
    //     }).catch((err) => {
    //         // Stop failed, handle it.
    //     });
    // }

    return (
        <div className="invoice-item-list">
            {/* We will hide these for now and use the DocScanner app for scanning barcodes until the scanner package is better
            <button onClick={this.scan}>scan lol</button>
            <button onClick={this.stopScan}>stop scan</button>
            <div id="reader" width="600px"></div> */}
            <div className="item-list-container">
                <SwipeableList
                    className="item-list"
                    type={ListType.IOS}
                    threshold={0}
                >
                    {
                        items.length > 0 ?
                            items.map((item, index) => (
                                <SwipeableListItem
                                    key={`${item.id}.${index}`}
                                    trailingActions={trailingActions(item.id)}
                                >
                                    <ItemCard
                                        item={item}
                                        handleQuantityChange={e => updateItemQuantity(e, item)}
                                    />
                                </SwipeableListItem>
                            )) :
                            (
                                <div>No items in the Invoice</div>
                            )
                    }
                </SwipeableList>
            </div>
            <div className="total">
                <span className="items">
                    Total # of Items: {totalQuantity}
                </span>
                <span className="price">
                    Total Cost: ₱{totalCost.toFixed(2)}
                </span>
            </div>

            <AddItemModal
                open={props.open}
                closeModal={() => {
                    props.handleModalClose();
                }}
                handleAddProduct={e => {
                    props.handleModalClose();
                    addProduct(e);
                }}
            />
        </div>
    );
}

export default InvoiceItemList;
