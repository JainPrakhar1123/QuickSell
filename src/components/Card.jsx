import React from 'react'
import "./card.css"
import profileImage from "./prakhar_wordpress2-removebg-preview.png";

export const Card = ({id, title, tag}) => {
  return (
    <div className='upc'>
      <div className='profile'>
        <div className="profile-down">
        <div >{id}</div>
          <img src = {profileImage} alt="" />
        </div>
      </div>
      
      <div className="title">{title}</div>
      <div className="feature">
        <div className='switch'>
        <button> ! </button>
        </div>
        <div className='req'>
          <div className='dot'></div>
          <div>{tag}</div>
        </div>
      </div>
    </div>
  )
}
