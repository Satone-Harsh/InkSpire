import React from 'react'
import "./Header.css"

const Header = () => {
  return (
    <div className='header'>
        <div className='header-title'>
        <span className='header-title-small'>Exploring Books Together</span>
        <span className='header-title-large'>InkSights</span>
        </div>
        <img
        className='header-image'
        src='https://cdn.wallpapersafari.com/77/49/lcZTH6.jpg'
        alt='inspiring-mountains'
        />
    </div>
  )
}

export default Header