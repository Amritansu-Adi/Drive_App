import React, { useState } from 'react';
import axiosInstance from '../../services/axiosInstance';
import './Modal.css';
// import { useEffect } from 'react';

const CreateFolderModal = ({ currentFolder, onFolderCreated, onClose }) => {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    // const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        
        // if (!name.trim()) {
        //     setMessage('Folder name is required');
        //     setMessageType('error');
        //     setLoading(false);
        //     return;
        // }
        
        try {
            const { data } = await axiosInstance.post('/folders', { 
                name, 
                parentFolder: currentFolder 
                // parent: currentFolder || null
            });
            setMessage('Folder created successfully!');
            setMessageType('success');
            setTimeout(() => {
                onFolderCreated(data);
                // onClose();
            }, 500);
        } catch (error) {
            console.error('Error creating folder', error);
            setMessage(error.response?.data?.msg || 'Failed to create folder');
            // setMessage(error.response?.data?.message || error.message || 'Something went wrong');
            setMessageType('error');
            setLoading(false);
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
                <h3>Create New Folder</h3>
                
                {message && (
                    <div className={`modal-message ${messageType === 'error' ? 'modal-error' : 'modal-success'}`}>
                        {message}
                    </div>
                )}
                
                <form onSubmit={handleSubmit}>
                    <div className="modal-form-group">
                        <label htmlFor="folder-name">Folder Name</label>
                        <input 
                            id="folder-name"
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            placeholder="Enter folder name" 
                            required 
                        />
                    </div>
                    
                    <button 
                        className="modal-submit-btn" 
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Creating...' : 'Create Folder'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateFolderModal;