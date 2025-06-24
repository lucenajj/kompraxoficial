import React from 'react';

interface ButtonProps {
  onClick: (value: string) => void;
  text: string;
  className?: string;
  color?: string;
}

const ButtonOption: React.FC<ButtonProps> = ({ onClick, text, color, className }) => {
  return (
    <button
      onClick={() => onClick(text)}
      className={`w-[210px] mb-2 py-[15px] text-[#292929] border-2 ${color} px-3 
                  text-left bg-white font-semibold text-[16px] rounded-md shadow-md
                  transition-all duration-300 ease-in-out transform
                  hover:bg-[#598EC2] hover:text-white hover:border-[#4b7cbf]
                  hover:shadow-lg hover:scale-105 hover:brightness-110
                  active:scale-95 active:shadow-sm
                  focus:ring-4 focus:ring-[#598EC2]/50 
                  ${className}`}
    >
      {text}
    </button>
  );
};

export default ButtonOption;
