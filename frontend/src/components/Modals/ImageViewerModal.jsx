import React from 'react';
import './Modal.css';

const ImageViewerModal = ({ imageUrl, onClose }) => {
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="image-viewer-backdrop" onClick={handleBackdropClick}>
            <div className="image-viewer-modal">
                <img 
                    src={imageUrl} 
                    alt="Full size view" 
                    className="image-viewer-img"
                />
            </div>
        </div>
    );
};

export default ImageViewerModal;