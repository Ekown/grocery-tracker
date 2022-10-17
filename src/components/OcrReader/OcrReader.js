import { useState } from "react"
import { createWorker } from "tesseract.js"

// OCR Statuses
const STATUSES = {
  IDLE: "",
  FAILED: "Failed to perform OCR",
  PENDING: "Processing...",
  SUCCEEDED: "OCR processing complete",
}

function OcrReader({onReadOcrData, onRemoveClicked}) {
  const [selectedImage, setSelectedImage] = useState(null)
  const [ocrState, setOcrState] = useState(STATUSES.IDLE)
  const worker = createWorker()
  
  // Process image with OCR
  const readImageText = async() => {
    setOcrState(STATUSES.PENDING)
    try {
      await worker.load()
      // Set the language to recognize
      await worker.loadLanguage("eng")
      await worker.initialize("eng")
      const { data: { text } } = await worker.recognize(selectedImage) 
      await worker.terminate()

      onReadOcrData(text)
      setOcrState(STATUSES.SUCCEEDED)
    } catch (err) {
      setOcrState(STATUSES.FAILED)
    }
  }

  // Executed when "Use another image" is selected
  const handleRemoveClicked = () => {
    setSelectedImage(null)
    onRemoveClicked()
    setOcrState(STATUSES.IDLE)
  }

  return (
    <div>
      {selectedImage && (
        <div>
          <img src={URL.createObjectURL(selectedImage)} alt="scanned file"  />
        </div>
      )}
      <div>
        {selectedImage?
          <div className="button-container">
            <button onClick={readImageText}>Process the image with OCR</button>
            <button
              className="remove-button"
              disabled={ocrState === STATUSES.PENDING}
              onClick={handleRemoveClicked}
            >
                Use another image
            </button>
          </div>
          :
          <>
            <p>Upload an image to process</p>
            <input
              type="file"
              name="ocr-image"
              onChange={(event) => {
                setSelectedImage(event.target.files[0])
              }}
            />
            <p>Supported formats:bmp, jpg, png, pbm</p>
          </>
        }
      </div>
      <div className="status">
        {ocrState}
      </div>
      <br />
    </div>
  )  
}

export default OcrReader