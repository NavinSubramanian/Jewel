import React from 'react'
import { Link } from 'react-router-dom';

const Thankyou = (props) => {
  return (props.trigger) ? (
    <div className='thankyouPopup'>
        <div>
            <h2>Yayy! Thankyou for showing up your interest.</h2>
            <p>Out team will reach you out shortly!!</p>
            <Link to='/'><button>Back Home</button></Link>
        </div>
    </div>
  ) : "";
}

export default Thankyou