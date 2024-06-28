import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const GalleryContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 40px;
`;

const Thumbnails = styled.div`
  display: flex;
  height: 100%;
  align-items: flex-start;
  flex-direction: column;
  row-gap: 20px;
  margin-top: 10px;
`;

const Thumbnail = styled.img`
  width: 75px;
  height: 75px;
  margin: 0 5px;
  cursor: pointer;
  border: ${props => props.isActive ? '2px solid #000' : '2px solid transparent'};
  opacity: ${props => props.isActive ? '1' : '0.5'};
`;

const MainImage = styled.img`
  width: 400px;
  height: 450px;
  object-fit: cover;
`;

const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[2]);

  useEffect(() => {
    if (images && images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [images]);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <GalleryContainer>
      <Thumbnails>
        {images.map((image, index) => (
          <Thumbnail
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            isActive={selectedImage === image}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </Thumbnails>
      <MainImage src={selectedImage} alt="Selected" />
    </GalleryContainer>
  );
};

export default ImageGallery;
