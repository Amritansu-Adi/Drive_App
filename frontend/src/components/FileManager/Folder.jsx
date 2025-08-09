import React from 'react';
import './Folder.css';

const Folder = ({ folder, onDoubleClick }) => (
    <div className="item folder-item" onDoubleClick={() => onDoubleClick(folder._id)}>
        <span className="icon folder-icon">📁</span>
        <span className="item-name">{folder.name}</span>
    </div>
);

export default Folder;