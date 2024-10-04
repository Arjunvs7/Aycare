import React from 'react'
import './NewsLetter.css'

const NewsLetter = () => {
  return (
    <div className='newsletter'>
        <h1>Get Exclusive offer </h1>
        <p>Subscribe to our newletter</p>
        <div> 
            <input type="email"  placeholder='your emailid'/>
            <button>Subscribe</button>
        </div>
    </div>
  )
}

export default NewsLetter