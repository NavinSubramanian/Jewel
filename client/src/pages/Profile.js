import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { UserContext } from '../UserContext';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import ItemList from '../components/ItemList';

const Profile = () => {
    const { user } = useContext(UserContext);
    const [favourites, setFavourites] = useState([]);
    const [listItems, setListItems] = useState([]);
    const [goldPrice, setGoldPrice] = useState(0);
    const [filteredItems, setFilteredItems] = useState([]);

    useEffect(() => {
        async function fetchUserDetails() {
            try {
                const userDetailsResponse = await axios.get(`https://www.geethajewellers.in/api/user/${user.email}`);
                const userFavourites = userDetailsResponse.data.favourites || [];
                setFavourites(userFavourites);

                // Fetch details for each favourite item
                const productDetailsPromises = userFavourites.map(id =>
                    axios.get(`https://www.geethajewellers.in/api/gp/${id}`)
                );
                const products = await Promise.all(productDetailsPromises);
                setFilteredItems(products.map(response => response.data[0])); // Assuming API returns array with one item
            } catch (error) {
                console.error("There was an error fetching the user details!", error);
            }
        }

        if (user) {
            fetchUserDetails();
        }
    }, [user]);

    useEffect(() => {
        async function fetchGoldPrice() {
            try {
                const today = new Date().toISOString().slice(0, 10);
                const rateResponse = await axios.get(`https://www.geethajewellers.in/api/gr/${today}/gold`);
                const { rates } = rateResponse.data;
                setGoldPrice(rates);
            } catch (error) {
                console.error("There was an error fetching the gold price!", error);
            }
        }
        fetchGoldPrice();
    }, []);

    const bannerImg = "https://img.freepik.com/premium-photo/golden-transparent-leaves-illustration-dark-background-gold-autumn-leaves-isolated-dark-background-with-copy-space-luxury-autumn-leaves-banner-gold-black-colors_756498-1829.jpg";

    return (
        <>
            <NavBar />

            {user != null ? (
                <div className='profileMain'>
                    <div className='profileTop' style={{ backgroundImage: `url(${bannerImg}) `}}>
                    </div>
                    <div className='profileMiddle'>
                        <div className='profileAbsolute'>
                            <div>
                                <FontAwesomeIcon icon={faUser} />
                                <h3>Hello {user.name}</h3>
                                <h5 style={{ fontWeight: '400' }}>ID : {user.email}</h5>
                            </div>
                            <h4 style={{ color: 'gray' }}>Total Favourites : <span style={{ fontWeight: '400' }}>{favourites.length}</span></h4>
                        </div>
                        <div className='profileFavorites'>
                            <h2>FAVOURITES</h2>
                            <hr />
                            <div className='itemList'>
                                {filteredItems.map((item) => (
                                    <ItemList key={item.id} item={item} rate={goldPrice} />
                                ))}
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