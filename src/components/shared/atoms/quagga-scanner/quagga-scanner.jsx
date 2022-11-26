import React, { useEffect, useState } from "react";
import config from "./config.json";
import Quagga from "quagga";
import './quagga-scanner.scss';
import { Button } from "@mui/material";
import DocumentScannerOutlinedIcon from '@mui/icons-material/DocumentScannerOutlined';
import CustomModal from "../../custom-modal/custom-modal";

const QuaggaScanner = props => {
    const { onDetected } = props;
    const [showScanner, setShowScanner] = useState(false);

    useEffect(() => {
        if (!showScanner) {
            return;
        }

        setTimeout(() => {
            Quagga.init(config, err => {
                if (err) {
                    console.log(err, "error msg");
                }
                Quagga.start();
                return () => {
                    Quagga.stop()
                }
            });

            //detecting boxes on stream
            Quagga.onProcessed(result => {
                var drawingCtx = Quagga.canvas.ctx.overlay,
                    drawingCanvas = Quagga.canvas.dom.overlay;

                if (result) {
                    if (result.boxes) {
                        drawingCtx.clearRect(
                            0,
                            0,
                            Number(drawingCanvas.getAttribute("width")),
                            Number(drawingCanvas.getAttribute("height"))
                        );
                        result.boxes
                            .filter(function (box) {
                                return box !== result.box;
                            })
                            .forEach(function (box) {
                                Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                                    color: "green",
                                    lineWidth: 2
                                });
                            });
                    }

                    if (result.box) {
                        Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
                            color: "#00F",
                            lineWidth: 2
                        });
                    }

                    if (result.codeResult && result.codeResult.code) {
                        Quagga.ImageDebug.drawPath(
                            result.line,
                            { x: "x", y: "y" },
                            drawingCtx,
                            { color: "red", lineWidth: 3 }
                        );
                    }
                } else {
                    drawingCtx.clearRect(
                        0,
                        0,
                        Number(drawingCanvas.getAttribute("width")),
                        Number(drawingCanvas.getAttribute("height"))
                    );
                }
            });

            Quagga.onDetected(detected);
        }, 50);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showScanner]);

    const detected = result => {
        setShowScanner(false);
        onDetected(result.codeResult.code);
    };

    const handleScannerClick = (e) => {
        setShowScanner(!showScanner);
    }

    return (
        // If you do not specify a target,
        // QuaggaJS would look for an element that matches
        // the CSS selector #interactive.viewport
        <div className="quagga-scanner">
            <Button
                className="scan-button"
                aria-label="scan button"
                onClick={handleScannerClick}
            ><DocumentScannerOutlinedIcon className="scan-button__icon" /></Button>
            <CustomModal
                open={showScanner}
                closeModal={() => {
                    setShowScanner(false);
                }}
            ><div id="interactive" className="viewport" />
            </CustomModal>
        </div>
    );
};

export default QuaggaScanner;