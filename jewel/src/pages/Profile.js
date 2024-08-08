import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { UserContext } from '../UserContext';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const Profile = () => {
    const { user } = useContext(UserContext);
    const [favourites, setFavourites] = useState([]);
    const [listItems, setListItems] = useState([]);
    const [initialItems, setInitialItems] = useState([]);
    const [goldPrice, setGoldPrice] = useState(0);
    
    // useEffect(()=>{
    //     setFavourites(user.favourites)
    // },[initialItems])

    // useEffect(()=>{
    //     let temp = []
    //     initialItems.map((item)=>{
    //         let id = item.id.toString();
    //         console.log(favourites.includes(id));
    //         // if(favourites.includes(item.id)){
    //         //     temp.push(item);
    //         // }
    //     })
    //     // console.log(temp)
    // },[favourites])

    useEffect(() => {
        async function fetchData() {
            try {
                const today = new Date().toISOString().slice(0, 10);
                const [rateResponse, itemsResponse] = await Promise.all([
                    axios.get(`http://localhost:5000/gr/${today}/gold`),
                    axios.get(`http://localhost:5000/getproduct/gold`)
                ]);
                const { rates} = rateResponse.data;
                setGoldPrice(rates);
                const items = itemsResponse.data;
                setInitialItems(items);
            } catch (error) {
                console.error("There was an error fetching the data!", error);
            }
        }
        fetchData();
    }, []);
    
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
                            <h4 style={{ color: 'gray' }}>Total Favourites : <span style={{ fontWeight: '400' }}>0</span></h4>
                        </div>
                        <div className='profileFavorites'>
                            <h2>FAVOURITES</h2>
                            <hr />
                            <div className='itemList'>
                                {/* {favourites.map((id)=>{})} */}
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
