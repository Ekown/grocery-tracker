// import { Html5Qrcode } from 'html5-qrcode';
import React from 'react';
import QuaggaScanner from '../../atoms/quagga-scanner/quagga-scanner';
import ItemList from '../item-list/item-list';
import './invoice-item-list.scss';

class InvoiceItemList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            camera: false,
            result: null,
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

    onDetected = result => {
        this.setState(prevState => {
            return { result: result }
        });
    }

    toggleCamera = () => {
        this.setState(prevState => {
            return { ...prevState, camera: !prevState.camera, result: null }
        });
    }

    render() {
        return (
            <div className="invoice-item-list">
                {/* We will hide these for now and use the DocScanner app for scanning barcodes until the scanner package is better
                <button onClick={this.scan}>scan lol</button>
                <button onClick={this.stopScan}>stop scan</button>
                <div id="reader" width="600px"></div> */}
                <p>{this.state.result ? this.state.result : "Scanning..."}</p>
                <button onClick={this.toggleCamera}>
                    {this.state.camera ? "Stop" : "Start"}
                </button>
                <div className="container">
                    {this.state.camera && <QuaggaScanner onDetected={this.onDetected} />}
                </div>
                <ItemList />
            </div>
        );
    }
}

export default InvoiceItemList;
