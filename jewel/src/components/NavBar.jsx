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

    const website_url = 'localhost:3000'; // Needs to be changed for the navigation to work

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

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    
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
                    <div onClick={()=>{window.location.hash = 'categories'}}>
                        <CiShoppingCart style={{fontSize:'25px'}} />
                        <h4>Shop</h4>
                    </div>
                    <div onClick={()=>{nav('#prices')}}>
                        <IoPricetagsOutline style={{fontSize:'20px'}} />
                        <h4>Prices</h4>
                    </div>
                    <div onClick={()=>{nav('/login')}}>
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
                <div className='hamburger-menu' onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

            </div>
            <div className={`bigMenuNav ${isMenuOpen ? 'open' : ''}`}>
                <ul className='navbar-links'>
                    <li class="navbar-dropdown">
                        <a>Gold</a>
                        <div class="dropdown">
                            <div>
                                <h4>Men</h4>
                                <a href="#">Kada</a>
                                <a href="#">Chain</a>
                                <a href="#">Bracelet</a>
                                <a href="#">Watche</a>
                            </div>
                            <div>
                                <h4>Women</h4>
                                <a href="#">Haram</a>
                                <a href="#">Earing</a>
                                <a href="#">Mangal Sutra</a>
                                <a href="#">Mattal</a>
                                <a href="#">Nosepin</a>
                                <a href="#">Netthichutti</a>
                                <a href="#">Necklace</a>
                                <a href="#">Pendants</a>
                                <a href="#">Brooches</a>
                            </div>
                            <div>
                                <h4>Kids</h4>
                                <a href="#">Cufflinks</a>
                                <a href="#">Tiara</a>
                                <a href="#">Bangle</a>
                                <a href="#">Hipchain</a>
                            </div>
                        </div>
                    </li>
                    <li class="navbar-dropdown">
                        <a>Silver</a>
                        <div class="dropdown">
                            <div>
                                <h4>Men</h4>
                                <a href="#">Kada</a>
                                <a href="#">Chain</a>
                                <a href="#">Bracelet</a>
                                <a href="#">Watche</a>
                            </div>
                            <div>
                                <h4>Women</h4>
                                <a href="#">Haram</a>
                                <a href="#">Earing</a>
                                <a href="#">Mangal Sutra</a>
                                <a href="#">Mattal</a>
                                <a href="#">Nosepin</a>
                                <a href="#">Netthichutti</a>
                                <a href="#">Necklace</a>
                                <a href="#">Pendants</a>
                                <a href="#">Brooches</a>
                            </div>
                            <div>
                                <h4>Kids</h4>
                                <a href="#">Cufflinks</a>
                                <a href="#">Tiara</a>
                                <a href="#">Bangle</a>
                                <a href="#">Hipchain</a>
                            </div>
                        </div>
                    </li>
                    <li class="navbar-dropdown">
                        <a>Platinum</a>
                        <div class="dropdown">
                            <div>
                                <h4>Men</h4>
                                <a href="#">Kada</a>
                                <a href="#">Chain</a>
                                <a href="#">Bracelet</a>
                                <a href="#">Watche</a>
                            </div>
                            <div>
                                <h4>Women</h4>
                                <a href="#">Haram</a>
                                <a href="#">Earing</a>
                                <a href="#">Mangal Sutra</a>
                                <a href="#">Mattal</a>
                                <a href="#">Nosepin</a>
                                <a href="#">Netthichutti</a>
                                <a href="#">Necklace</a>
                                <a href="#">Pendants</a>
                                <a href="#">Brooches</a>
                            </div>
                        </div>
                    </li>
                    <li class="navbar-dropdown">
                        <a>Coins</a>
                        <div class="dropdown">
                            <div>
                                <h4>Gold</h4>
                                <a href="#">1</a>
                                <a href="#">2</a>
                                <a href="#">4</a>
                                <a href="#">8</a>
                                <a href="#">16</a>
                                <a href="#">32</a>
                                <a href="#">40</a>
                            </div>
                            <div>
                                <h4>Silver</h4>
                                <a href="#">1</a>
                                <a href="#">2</a>
                                <a href="#">5</a>
                                <a href="#">10</a>
                                <a href="#">20</a>
                                <a href="#">50</a>
                                <a href="#">100</a>
                            </div>
                        </div>
                    </li>
                    <li class="navbar-dropdown">
                        <a href="/custom">Customize</a>
                    </li>
                    <li class="navbar-dropdown">
                        <a href="/chitfund">Chit</a>
                    </li>
                    <li class="navbar-dropdown">
                        <a href="/work">Join us</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
