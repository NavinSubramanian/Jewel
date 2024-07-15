import React from 'react'

import NavBar from '../components/NavBar'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const Profile = () => {

    const bannerImg = "https://img.freepik.com/premium-photo/golden-transparent-leaves-illustration-dark-background-gold-autumn-leaves-isolated-dark-background-with-copy-space-luxury-autumn-leaves-banner-gold-black-colors_756498-1829.jpg"

  return (
    <>
        <NavBar />
        <div className='profileMain'>
            <div className='profileTop' style={{backgroundImage:`url(${bannerImg})`}}>
                <h1>Hello Adam!</h1>
                <p>Your training information is updated here.<br />Upcoming and previous exam dates are listed here.</p>
                <div className='profileAbsolute'>
                    <div>
                        <FontAwesomeIcon icon={faUser} />
                        <h3 style={{}}>Hello User</h3>
                        {/* <h5 style={{fontWeight:'400',color:'gray'}}>ID : </h5> */}
                        {/* ^^^ For if there was a login feature */}
                    </div>
                    <h4 style={{color:'gray'}}>Attended Test : <span style={{fontWeight:'400'}}>10</span></h4>
                </div>
            </div>
            <div className='profileMiddle'>
                <h2>Favourites</h2>
                
            </div>
        </div>
    </>
  )
}

export default Profile