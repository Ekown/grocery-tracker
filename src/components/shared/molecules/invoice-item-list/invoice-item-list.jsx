// import { Html5Qrcode } from 'html5-qrcode';
import React from 'react';
// import QuaggaScanner from '../../atoms/quagga-scanner/quagga-scanner';
import ItemCard from '../../atoms/item-card/item-card';
import { List } from '@mui/material';
import './invoice-item-list.scss';

class InvoiceItemList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            camera: false,
            result: null,
            items: [
                {
                    image: "https://pgmobile.puregold.com.ph/images/4800166142325.jpg",
                    id: '11',
                    name: "Stik-O Jr. Choco",
                    size: "380G",
                    quantity: 1,
                    price: 70.75,
                    cost: 70.75,
                },
                {
                    image: "https://fishersupermarket.ph/wp-content/uploads/2020/10/4800024575258.jpg",
                    id: '22',
                    name: "Del Monte Four Seasons",
                    size: "1L",
                    quantity: 2,
                    price: 87.30,
                    cost: 2 * 87.30,
                },
                {
                    image: "http://cdn.shopify.com/s/files/1/0476/0266/3573/products/del-monte-juice-del-monte-juice-drink-pineapple-strawberry-tetra-1l-16892496314500_1024x.jpg?v=1619599627",
                    id: '33',
                    name: "Del Monte Pineapple Strawberry",
                    size: "1L",
                    quantity: 1,
                    price: 84.30,
                    cost: 1 * 84.30,
                },
                {
                    image: "https://fishersupermarket.ph/wp-content/uploads/2020/10/4800575425033.jpg",
                    id: '331',
                    name: "Krem Top Creamer",
                    size: "500G",
                    quantity: 5,
                    price: 69.10,
                    cost: 5 * 69.10,
                },
                {
                    image: "https://cdn.shopify.com/s/files/1/0485/8380/3036/products/4808887040012-530x530.jpg?v=1631673449",
                    id: '44',
                    name: "Purefoods Liver Spread",
                    size: "85G",
                    quantity: 1,
                    price: 28.50,
                    cost: 2 * 28.50,
                },
                {
                    image: "https://d2t3trus7wwxyy.cloudfront.net/catalog/product/1/0/10256579-quaker-fio-chocolate-500g_1.png",
                    id: '55',
                    name: "Quaker Instant Oats Chocolate",
                    size: "500G",
                    quantity: 2,
                    price: 104,
                    cost: 2 * 104,
                },
            ]
        };
    }

    componentDidUpdate(prevProps) {
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

    /**
     * Set scan result
     * 
     * @param {String} result - The resulting scanned text
     */
    setScanResult = result => {
        this.setState(prevState => {
            return { result: result }
        });
    }

    /**
     * Toggles the camera state
     */
    toggleCamera = () => {
        this.setState(prevState => {
            return { ...prevState, camera: !prevState.camera, result: null }
        });
    }

    /**
     * Update quantity for an item
     * 
     * @param {Number} updatedQuantity - Updated quantity value
     * @param {Number} item - Item object
     */
    updateItemQuantity = (updatedQuantity, item) => {
        this.setState(prevState => {
            let updatedItems = prevState.items;
            let foundIndex = prevState.items.findIndex(x => x.id === item.id);

            // Update the corresponding item in the items array
            updatedItems[foundIndex] = { ...prevState.items[foundIndex], quantity: updatedQuantity, cost: (updatedQuantity * item.price) };

            return {
                ...prevState,
                items: updatedItems,
            };
        });
    }

    render() {
        return (
            <div className="invoice-item-list">
                {/* We will hide these for now and use the DocScanner app for scanning barcodes until the scanner package is better
                <button onClick={this.scan}>scan lol</button>
                <button onClick={this.stopScan}>stop scan</button>
                <div id="reader" width="600px"></div> */}

                {/* <p>{this.state.result ? this.state.result : "Scanning..."}</p>
                <button onClick={this.toggleCamera}>
                    {this.state.camera ? "Stop" : "Start"}
                </button>
                {
                    this.state.camera ?
                        <div className="container">
                            <QuaggaScanner onDetected={this.setScanResult} />
                        </div>
                        : null
                } */}
                <div className="item-list-container">
                    <List className="item-list" sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {
                            this.state.items.length > 0 ?
                                this.state.items.map((item, index) => (
                                    <ItemCard
                                        key={index}
                                        item={item}
                                        handleQuantityChange={e => this.updateItemQuantity(e, item)}
                                    />
                                )) :
                                (
                                    <div>No items in the Invoice</div>
                                )
                        }
                    </List>
                </div>
                <div className="total">
                    <span className="items">
                        Total # of Items:
                        {
                            this.state.items.reduce((a, b) => {
                                return a + (b['quantity'] ?? 0);
                            }, 0)
                        }
                    </span>
                    <span className="price">
                        Total Price:
                        ₱{
                            this.state.items.reduce((a, b) => {
                                return a + (b['cost'] ?? 0);
                            }, 0).toFixed(2)
                        }
                    </span>
                </div>
            </div>
        );
    }
}

export default InvoiceItemList;
