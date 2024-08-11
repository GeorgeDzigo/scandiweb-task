import React, { useState } from 'react';
import './ImageGallery.css';

interface ImageGalleryProps {
    images: { id: string; url: string }[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handlePrevClick = () => {
        setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
    };

    const handleNextClick = () => {
        setSelectedIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
    };

    return (
        <div className="image-gallery">
            <div className="thumbnail-list">
                {images.map((image, index) => (
                    <img
                        key={image.id}
                        src={image.url}
                        alt={`Thumbnail ${image.id}`}
                        className={selectedIndex === index ? 'thumbnail selected' : 'thumbnail'}
                        onClick={() => setSelectedIndex(index)}
                    />
                ))}
            </div>
            <div className="main-image-container">
                <button className="arrow left-arrow" onClick={handlePrevClick}>&#10094;</button>
                <img src={images[selectedIndex].url} alt="Selected" className="main-image" />
                <button className="arrow right-arrow" onClick={handleNextClick}>&#10095;</button>
            </div>
        </div>
    );
};

export default ImageGallery;
