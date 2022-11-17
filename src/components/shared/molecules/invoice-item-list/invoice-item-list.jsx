// import { Html5Qrcode } from 'html5-qrcode';
import React from 'react';
import ItemList from '../item-list/item-list';
import './invoice-item-list.scss';

class InvoiceItemList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: "Not Found",
        };
    }

    componentDidUpdate(prevProps) {
    }

    // scan() {
    //     const html5QrCode = new Html5Qrcode("reader");

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
    //         // experimentalFeatures: {
    //         //     useBarCodeDetectorIfSupported: true
    //         // },
    //         rememberLastUsedCamera: true,
    //         // showTorchButtonIfSupported: true,
    //         useBarCodeDetectorIfSupported: true
    //     };

    //     const onNewScanResult = (decodedText, decodedResult) => {
    //         console.log(decodedText);
    //         console.log(decodedResult);

    //         alert(decodedText);

    //         html5QrCode.stop().then((ignore) => {
    //             // QR Code scanning is stopped.
    //             console.log('ignore', ignore);
    //         }).catch((err) => {
    //             // Stop failed, handle it.
    //         });
    //     }

    //     // Select back camera or fail with `OverconstrainedError`.
    //     html5QrCode.start({ facingMode: { exact: "environment" } }, config, onNewScanResult);
    // }

    render() {
        return (
            <div className="invoice-item-list">
                {/* We will hide these for now and use the DocScanner app for scanning barcodes until the scanner package is better
                <button onClick={this.scan}>scan lol</button>
                <div id="reader" width="600px"></div> */}
                <ItemList />
            </div>
        );
    }
}

export default InvoiceItemList;
