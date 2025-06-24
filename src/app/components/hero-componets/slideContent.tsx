import React from 'react';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';

interface SlideContentProps {
  title: string;
  description: string;
  imageSrc: string | StaticImageData;
  imageAlt: string;
  className?: string;
  imageWidth?: number;
  imageHeight?: number
}

const openChatbot = () => {
  window.location.hash = "#chat-obiana"; 
};

const SlideContent: React.FC<SlideContentProps> = ({
  title,
  description,
  imageSrc,
  imageAlt,
  className,
  imageWidth = 300,
  imageHeight = 200,
}) => {
  return (
    <div className={`flex flex-col pb-[40px] lg:flex-row items-center gap-10 justify-between w-full max-w-6xl mx-auto h-full text-white ${className}`}>
      <div className="min-h-[290px] sm:min-h-[210px] lg:min-h-[230px] lg:w-1/2 w-full px-2 sm:px-6 lg:text-left relative">
        <h2 className="text-3xl lg:text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base">{description}</p>
        <div className="flex flex-wrap justify-center mt-[20px] lg:justify-start gap-3 sm:gap-2 absolute bottom-0">
          <Link
            href="#chat-obiana"
            onClick={(e) => {
              e.preventDefault();
              openChatbot();
            }} 
            className="bg-white text-[#598EC2] px-3 py-2 sm:px-5 sm:py-3 rounded font-semibold transition-all duration-300 ease-in-out hover:bg-gray-200 text-sm sm:text-base"
          >
            Experimente Agora
          </Link>
          <Link
            href="#planos"
            className="border border-white text-white px-3 py-2 sm:px-5 sm:py-3 rounded font-semibold transition-all duration-300 ease-in-out hover:bg-white hover:text-[#598EC2] text-sm sm:text-base"
          >
            Ver Planos
          </Link>
        </div>
      </div>
      <div className="lg:w-1/2 w-full mt-0 mb-6 lg:mt-0 flex px-[3%] lg:justify-center">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
          className="max-w-full h-auto object-contain rounded-md"
        />
      </div>
    </div>
  );
};

export default SlideContent;
