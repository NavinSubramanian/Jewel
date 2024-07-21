import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { AiOutlineExclamationCircle } from "react-icons/ai";
import { IoPricetagsOutline, IoPersonOutline  } from "react-icons/io5";
import { CiHeart, CiShoppingCart, CiSearch  } from "react-icons/ci";

import mainLogo from '../assets/homeImages/mainLogo2.svg'
import { height } from '@fortawesome/free-solid-svg-icons/fa0'

import {
    menuItems
} from "./Items/menuItems";
import MenuItems from "./MenuItems";
import axios from 'axios';

export default function NavBar (props) {

    const isLoad = useState(false);
    const [goldPrice, setGoldPrice] = useState(0);
    const [silverPrice, setSilverPrice] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchRates() {
            try {
                // Get today's date in YYYY-MM-DD format
                const today = new Date().toISOString().slice(0, 10);
                
                // Make the API request with the date parameter
                const response = await axios.get(`http://localhost:5000/gr/${today}/silver`);
                const response2 = await axios.get(`http://localhost:5000/gr/${today}/gold`);
              //   const response3 = await axios.get(`http://localhost:5000/gr/${today}/diamond`);
              //   const response4 = await axios.get(`http://localhost:5000/gr/${today}/platinum`);
                const rate1 = response.data.rates;
                const rate2 = response2.data.rates;
              //   const rate3 = response3.data.rates;
              //   const rate4 = response4.data.rates;
                setGoldPrice(rate1);
                setSilverPrice(rate2);
            } catch (error) {
                console.error("There was an error fetching the rates!", error);
                setError("Failed to fetch rates. Please try again later.");
            }
        }
        fetchRates();
    }, []);

    const nav = useNavigate()

    const profileView = () => {
        nav('/profile')
    }
    
    return(
        <nav className='mainNav'>
            <div className='shopTimings'>
                <marquee behavior="" direction="">Shop open from <span>8am to 11pm</span> on weekends <span>Gold price: </span> {goldPrice} <span>Silver price: </span> {silverPrice}</marquee>
            </div>
            <div className='bottomNav'>
                <Link to='/'><img src={mainLogo} className='mainLogoWebsite' alt=""/></Link>

                <div className='searchInputWeb'>
                    <input type="text" placeholder='Search for the needed jewellery...' />
                    <CiSearch />
                </div>

                <div className='navIcons'>
                    <div onClick={()=>{nav('#categories')}}>
                        <CiShoppingCart style={{fontSize:'25px'}} />
                        <h4>Shop</h4>
                    </div>
                    <div onClick={()=>{nav('#prices')}}>
                        <IoPricetagsOutline style={{fontSize:'20px'}} />
                        <h4>Prices</h4>
                    </div>
                    <div>
                        <IoPersonOutline style={{fontSize:'22px'}} />
                        <h4>Acount</h4>
                    </div>
                    <div onClick={()=>{nav('/profile')}}>
                        <CiHeart style={{fontSize:'25px'}} />
                        <h4>WishList</h4>
                    </div>
                    <div  onClick={()=>{nav('/about')}}>
                        <AiOutlineExclamationCircle style={{fontSize:'22px'}} />
                        <h4>About</h4>
                    </div>
                </div>

            </div>
            <div className='bigMenuNav'>
                <ul>
                    <li>Gold</li>
                    <li>Silver</li>
                    <li>Platinum</li>
                    <li>Coins</li>
                    <li>Customize</li>
                    <li>Chit</li>
                    <li>Join us</li>
                </ul>
            </div>
        </nav>
    )
}
