import React from 'react';
import './Image.css';


const Image = ({ image, onClick, showPath }) => {
    const displayPath = showPath && image.folder && image.path
        ? `./${[...image.path.map(p => p.name), image.folder.name].join('/')}`
        : null;

    return (
        <div className="item image-item" onClick={() => onClick(image.imageUrl)}>
            <img 
                src={image.imageUrl} 
                alt={image.name} 
                className="image-thumbnail"
            />
            <span className="item-name">{image.name}</span>
            {displayPath && (
                <span className="image-path">
                    {displayPath}
                </span>
            )}
        </div>
    );
};

export default Image;