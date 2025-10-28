import React from 'react';
import { CustomButtonProps } from '../types';

const CustomButton: React.FC<CustomButtonProps> = ({ btnType = "button", title, styles = "", handleClick }) => {
  return (
    <button
      type={btnType}
      className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] ${styles}`}
      onClick={handleClick}
    >
      {title}
    </button>
  )
}

export default CustomButton