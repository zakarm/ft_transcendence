import React, { useState, useEffect } from 'react';

interface SafeImageProps {
    src: string;
    alt?: string;
}

const SafeImage: React.FC<SafeImageProps> = ({ src, alt }: SafeImageProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => setIsVisible(true);
        img.onerror = () => setIsVisible(false);
    }, [src]);

    return <>{isVisible && <img src={src} alt={alt} />}</>;
};

export default SafeImage;
