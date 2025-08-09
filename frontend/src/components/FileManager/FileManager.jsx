import React, { useState, useEffect } from 'react';
import axiosInstance from '../../services/axiosInstance';
import Folder from './Folder';
import Image from './Image';
import CreateFolderModal from '../Modals/CreateFolderModal';
import UploadImageModal from '../Modals/UploadImageModal';
import ImageViewerModal from '../Modals/ImageViewerModal';
import Loading from '../Loading/Loading';
import './FileManager.css';
// import { toast } from 'react-toastify';

const FileManager = ({ token, setToken }) => {
    const [folders, setFolders] = useState([]);
    const [images, setImages] = useState([]);
    const [currentFolder, setCurrentFolder] = useState(null);
    const [path, setPath] = useState([{ _id: null, name: 'Root' }]);
    // const [breadcrumbs, setBreadcrumbs] = useState([]);
    const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
    const [showUploadImageModal, setShowUploadImageModal] = useState(false);
    const [searchResults, setSearchResults] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);

    const [viewingImage, setViewingImage] = useState(null);
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState('');

    // Ensure only one modal is open at a time
    const openCreateFolderModal = () => {
        setShowUploadImageModal(false);
        setViewingImage(null);
        setShowCreateFolderModal(true);
        // closeAllModals();
        // setTimeout(() => setShowCreateFolderModal(true), 100);
    };

    const openUploadImageModal = () => {
        setShowCreateFolderModal(false);
        setViewingImage(null);
        setShowUploadImageModal(true);
    };

    const closeAllModals = () => {

        setShowCreateFolderModal(false);
        setShowUploadImageModal(false);
        setViewingImage(null);
        // setSearchResults(null);
    };

    const openImageViewer = (imageUrl) => {
        setShowCreateFolderModal(false);
        setShowUploadImageModal(false);
        setViewingImage(imageUrl);
        // document.body.style.overflow = 'hidden';
    };

    const fetchData = async (folderId) => {
        setLoading(true);
        try {
            const { data } = await axiosInstance.get(`/folders?parent=${folderId || 'null'}`);
            setFolders(data.folders);
            setImages(data.images);
            setSearchResults(null);
            setSearchQuery('');
            // setError('');
        } catch (error) {
            console.error('Error fetching data', error);
            // setError('Failed to load data');
            // toast.error('Failed to load folders and images');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(currentFolder);
    }, [currentFolder]);
    // useEffect(() => {
    //     if (token) {
    //         fetchData(currentFolder);
    //     }
    // }, [currentFolder, token]);

    const handleFolderDoubleClick = (folderId) => {
        const folder = folders.find(f => f._id === folderId);
        setPath([...path, folder]);
        setCurrentFolder(folderId);
        // closeAllModals();
    };

    const handleBreadcrumbClick = (index) => {
        const newPath = path.slice(0, index + 1);
        const newCurrentFolderId = newPath[newPath.length - 1]._id;
        setPath(newPath);
        setCurrentFolder(newCurrentFolderId);
        setLoading(true);
        fetchData(newCurrentFolderId);
        // setSearchResults(null);
    };


    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery) {
            fetchData(currentFolder);
            return;
        }
        // if (searchQuery.length < 3) return;
        try {
            const { data } = await axiosInstance.get(`/images/search?q=${searchQuery}`);
            setSearchResults(data);
            // setSearchResults({folders: [], images: data});
        } catch (error) {
            console.error('Error searching images', error);
            // setSearchResults([]);
        }
    };

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    return (
        <div className="file-manager">
            <div className="file-manager-container">
                {/* Header with title */}
                <header className="main-header">
                    <h1 className="drive-title">My Drive</h1>
                </header>

                {/* Search bar and action buttons */}
                <div className="action-bar">
                    <form onSubmit={handleSearch} className="search-section">
                        <input 
                            className="search-input" 
                            type="text" 
                            placeholder="Search images..." 
                            value={searchQuery} 
                            onChange={(e) => setSearchQuery(e.target.value)} 
                        />
                        <button className="search-btn" type="submit">
                            Search
                        </button>
                    </form>
                    
                    <button 
                        onClick={handleLogout} 
                        className="logout-btn"
                    >
                        Logout
                    </button>
                </div>

                {/* Action buttons row */}
                <div className="function-bar">
                    <button 
                        onClick={openCreateFolderModal} 
                        className="function-btn create-folder-btn"
                    >
                        Make Folder
                    </button>
                    <button 
                        onClick={openUploadImageModal} 
                        className="function-btn upload-btn"
                    >
                        Upload Image
                    </button>
                </div>

                {/* Path breadcrumb */}
                <div className="path-section">
                    <span className="path-label">Path:</span>
                    <div className="breadcrumb">
                        {path.map((p, i) => (
                            <span 
                                key={p._id} 
                                onClick={() => handleBreadcrumbClick(i)}
                                className="breadcrumb-item"
                            >
                                {i === 0 ? 'Root' : ` / ${p.name}`}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Folders and images grid */}
                <div className="content-section">
                    <h3 className="section-title">Folders</h3>
                    <div className="content-grid">
                        {loading ? (
                            <Loading message="Loading directory..." />
                        ) : searchResults ? (
                            <>
                                <div className="search-results">
                                    <h3 className="search-header">Search Results for "{searchQuery}"</h3>
                                    <div className="search-grid">
                                        {searchResults.map(image => 
                                            <Image 
                                                key={image._id} 
                                                image={image} 
                                                onClick={openImageViewer} 
                                                showPath={true} 
                                            />
                                        )}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="folders-section">
                                    {folders.map(folder => 
                                        <Folder 
                                            key={folder._id} 
                                            folder={folder} 
                                            onDoubleClick={handleFolderDoubleClick} 
                                        />
                                    )}
                                </div>
                                <div className="images-section">
                                    {images.map(image => 
                                        <Image 
                                            key={image._id} 
                                            image={image} 
                                            onClick={openImageViewer} 
                                            showPath={false} 
                                        />
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Modals */}
            {showCreateFolderModal && 
                <CreateFolderModal 
                    currentFolder={currentFolder}
                    onClose={closeAllModals}
                    onFolderCreated={(newFolder) => {
                        setFolders([...folders, newFolder]);
                        closeAllModals();
                    }}
                />
            }
            {showUploadImageModal && 
                <UploadImageModal 
                    currentFolder={currentFolder}
                    onClose={closeAllModals}
                    onImageUploaded={(newImage) => {
                        setImages([...images, newImage]);
                        closeAllModals();
                    }}
                />
            }
            {viewingImage && 
                <ImageViewerModal 
                    imageUrl={viewingImage}
                    onClose={closeAllModals}
                />
            }
        </div>
    );
};

export default FileManager;