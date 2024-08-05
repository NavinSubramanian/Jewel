// import React from 'react'

// import NavBar from '../components/NavBar'

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faUser } from '@fortawesome/free-solid-svg-icons'
// import Footer from '../components/Footer'

// const Profile = () => {

//     const bannerImg = "https://img.freepik.com/premium-photo/golden-transparent-leaves-illustration-dark-background-gold-autumn-leaves-isolated-dark-background-with-copy-space-luxury-autumn-leaves-banner-gold-black-colors_756498-1829.jpg"

//   return (
//     <>
//         <NavBar />
//         <div className='profileMain'>
//             <div className='profileTop' style={{backgroundImage:`url(${bannerImg})`}}>
//             </div>
//             <div className='profileMiddle'>
//                 <div className='profileAbsolute'>
//                     <div>
//                         <FontAwesomeIcon icon={faUser} />
//                         <h3 style={{}}>Hello User</h3>
//                         <h5 style={{fontWeight:'400'}}>ID : </h5>
//                         {/* ^^^ For if there was a login feature */}
//                     </div>
//                     <h4 style={{color:'gray'}}>Total Favourites : <span style={{fontWeight:'400'}}>10</span></h4>
//                 </div>
//                 <div className='profileFavorites'>
//                     <h2>FAVOURITES</h2>
//                     <hr />
//                     <div className='itemList'>
                        
//                     </div>
//                 </div>
//             </div>
//         </div>

//         <Footer />
//     </>
//   )
// }

// export default Profile
import React, { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import NavBar from '../components/NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Footer from '../components/Footer';

const Profile = () => {
    const { user } = useContext(UserContext);
    const [favourites, setFavourites] = useState([])
    useContext(()=>{
        if(user != null){

        }
    },[])
    
    const bannerImg = "https://img.freepik.com/premium-photo/golden-transparent-leaves-illustration-dark-background-gold-autumn-leaves-isolated-dark-background-with-copy-space-luxury-autumn-leaves-banner-gold-black-colors_756498-1829.jpg";

    return (
        <>
            <NavBar />

            {user != null ? (
                <div className='profileMain'>
                    <div className='profileTop' style={{ backgroundImage: `url(${bannerImg})` }}>
                    </div>
                    <div className='profileMiddle'>
                        <div className='profileAbsolute'>
                            <div>
                                <FontAwesomeIcon icon={faUser} />
                                <h3 style={{}}>Hello {user ? user.name : "User"}</h3>
                                <h5 style={{ fontWeight: '400' }}>ID : {user ? user.email : "N/A"}</h5>
                            </div>
                            <h4 style={{ color: 'gray' }}>Total Favourites : <span style={{ fontWeight: '400' }}>{user.favourites.length}</span></h4>
                        </div>
                        <div className='profileFavorites'>
                            <h2>FAVOURITES</h2>
                            <hr />
                            <div className='itemList'>
                                {/* Add logic to display user's favorite items if available */}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='emptyProfile'>
                    <img src='https://elegantjewelersli.com/assets/images/empty-wishlist.png' draggable='false' />
                    <h1>Your Wishlist is Empty</h1>
                    <h3>Please <span style={{fontWeight:'600'}}>Signin</span> to Save your items!</h3>
                </div>
            )}
            <Footer />
        </>
    );
}

export default Profile;
