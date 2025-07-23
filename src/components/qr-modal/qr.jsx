import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./qr.css";
import PropTypes from "prop-types";

const QRModal = ({ isVisible, toggleModal }) => {
  const googlePlayLink = "https://play.google.com/store/apps/details?id=su.client798c.taxi_emer&hl=ru";
  const appStoreLink = "https://apps.apple.com/az/app/emer/id6744454234";

  const [isGoogle, setIsGoogle] = useState(true);
  const [isSwitching, setIsSwitching] = useState(false);

  const handleToggleQRCode = () => {
    setIsSwitching(true);
    setTimeout(() => {
      setIsGoogle(!isGoogle);
      setIsSwitching(false);
    }, 300); // Длительность анимации совпадает с CSS
  };

  return (
    isVisible && (
      <div className="qr-modal-overlay visible" onClick={toggleModal}>
        <div className="qr-modal visible" onClick={(e) => e.stopPropagation()}>
          <span className="qr-close" onClick={toggleModal}></span>

          <div className={`qr-code-wrapper ${isSwitching ? 'switching' : ''}`}>
            <QRCodeCanvas
              value={isGoogle ? googlePlayLink : appStoreLink}
              size={200}
              bgColor="#ffffff"
              fgColor="#000000"
            />
          </div>

          <div className="modal-text">
            <button className="store-button" onClick={handleToggleQRCode}>
              {isGoogle ? "App Store" : "Play Market"}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

QRModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default QRModal;
