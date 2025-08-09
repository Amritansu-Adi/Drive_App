import React, { useState } from 'react';
import axiosInstance from '../../services/axiosInstance';
import './Modal.css';
// import { useCallback } from 'react';

const UploadImageModal = ({ currentFolder, onImageUploaded, onClose }) => {
    const [name, setName] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    // const [preview, setPreview] = useState(null);
    // const [uploadProgress, setUploadProgress] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!file) {
            setMessage('Please select an image file');
            setMessageType('error');
            return;
        }
        
        // if (!file.type.startsWith('image/')) {
        //     setMessage('Please select a valid image file');
        //     setMessageType('error');
        //     return;
        // }
        
        setLoading(true);
        setMessage('');
        // setUploadProgress(0);
        
        const formData = new FormData();
        formData.append('name', name);
        formData.append('folderId', currentFolder);
        formData.append('image', file);
        // formData.append('folder', currentFolder || '');
        
        try {
            const { data } = await axiosInstance.post('/images/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
                // onUploadProgress: (progressEvent) => {
                //     const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                //     setUploadProgress(percentCompleted);
                // }
            });
            setMessage('Image uploaded successfully!');
            setMessageType('success');
            setTimeout(() => {
                onImageUploaded(data);
            }, 500);
        } catch (error) {
            console.error('Error uploading image', error);
            setMessage(error.response?.data?.msg || 'Failed to upload image');
            setMessageType('error');
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            if (!name) {
                const fileName = selectedFile.name.split('.').slice(0, -1).join('.');
                setName(fileName);
            }
        }
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <div className="modal">
                <h3>Upload Image</h3>
                
                {message && (
                    <div className={`modal-message ${messageType === 'error' ? 'modal-error' : 'modal-success'}`}>
                        {message}
                    </div>
                )}
                
                <form onSubmit={handleSubmit}>
                    <div className="modal-form-group">
                        <label htmlFor="image-name">Image Name</label>
                        <input 
                            id="image-name"
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            placeholder="Enter image name" 
                            required 
                        />
                    </div>
                    
                    <div className="modal-form-group">
                        <label htmlFor="image-file">Select Image</label>
                        <input 
                            id="image-file"
                            type="file" 
                            onChange={handleFileChange} 
                            accept="image/*"
                            required 
                        />
                    </div>
                    
                    <button 
                        className="modal-submit-btn" 
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Uploading...' : 'Upload Image'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UploadImageModal;