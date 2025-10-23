
import React from 'react';
import { UnsplashImage } from '../types';

interface ImageCardProps {
  image: UnsplashImage;
}

const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  return (
    <div className="group relative overflow-hidden rounded-lg shadow-lg">
      <img
        src={image.urls.small}
        alt={image.alt_description || 'Unsplash Image'}
        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300">
        <div className="absolute bottom-0 left-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-white text-sm">
            Photo by{' '}
            <a
              href={image.user.portfolio_url ? `${image.user.portfolio_url}?utm_source=api_test&utm_medium=referral` : image.links.html}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline"
            >
              {image.user.name}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
