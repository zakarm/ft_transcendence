import React, { useState } from "react";

interface SafeImageProps {
  src: string;
  alt?: string;
}

const SafeImage: React.FC<SafeImageProps> = ({ src, alt }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleError = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <img src={src} alt={alt} onError={handleError} />
      )}
    </>
  );
};

export default SafeImage;
