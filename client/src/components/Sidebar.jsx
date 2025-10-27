import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { logo, sun } from '../assets';
import { navlinks } from '../constants';
import { useTheme } from '../context';

const Sidebar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard');
  const { isDarkMode, toggleTheme } = useTheme();

  const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
    <div className={`w-[48px] h-[48px] rounded-[10px] ${isActive && isActive === name && 'bg-[#2c2f32]'} flex justify-center items-center ${!disabled && 'cursor-pointer' } ${styles}`} onClick={handleClick}>
      {!isActive ? (
        <img src={imgUrl} alt='fund_logo'
        className='w-1/2 h-1/2' />
      ): (
        <img src={imgUrl} alt='fund_logo'
        className={`w-1/2 h-1/2 ${isActive !== name && 'grayscale'}`} />
      )}
    </div>
  )

  return (
    <div className='flex justify-between items-center flex-col sticky top-5 h-[93vh] '>
      <Link to="/">
        <Icon styles="w-[52px] j-[52px] bg-[#2c2f32]" imgUrl={logo}/>
      </Link>

      <div className='flex-1 flex flex-col justify-between items-center sidebar-bg rounded-[20px] w-[76px] py-4 mt-12 transition-colors duration-300'>
        <div className='flex flex-col justify-center items-center gap-3'>
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if(!link.disabled) {
                  setIsActive(link.name);
                  navigate(link.link);
                }
              }}
            />
          ))}
        </div>

        <div
          className={`sidebar-bg shadow-secondary hover:bg-[#2c2f32] transition-all duration-200 cursor-pointer w-[48px] h-[48px] rounded-[10px] flex justify-center items-center ${isDarkMode ? 'opacity-100' : 'opacity-60'}`}
          onClick={toggleTheme}
          title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
        >
          <img src={sun} alt='theme toggle' className='w-1/2 h-1/2' />
        </div>
      </div>
    </div>
  )
}

export default Sidebar