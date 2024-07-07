import React from 'react'

const Thankyou = (props) => {
  return (props.trigger) ? (
    <div className='thankyouPopup'>
        <div>
            <h2>Yayy! Thankyou for showing up your interest.</h2>
            <p>Out team will reach you out shortly!!</p>
            <button>Back Home</button>
        </div>
    </div>
  ) : "";
}

export default Thankyou