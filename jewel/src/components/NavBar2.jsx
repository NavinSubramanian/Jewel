import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { faMagnifyingGlass,faHeart,faBagShopping, } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import mainLogo from '../assets/homeImages/mainLogo2.svg'
import { height } from '@fortawesome/free-solid-svg-icons/fa0'
import axios from 'axios'
import {
    menuItems
} from "./Items/menuItems";
import MenuItems from "./MenuItems";
import { useEffect } from 'react'

export default function NavBar2 (props) {

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
                <marquee behavior="" direction="">Shop open from <span>8am to 11pm</span> on weekends <span>Gold price: {goldPrice}</span> <span>Silver price: {silverPrice}</span></marquee>
            </div>
            <div className='bottomNav'>
                <div className='navSections'>
                    <ul className = "menus" > {
                        menuItems.map((menu, index) => {
                            const depthLevel = 0;
                            return <MenuItems items = {
                                menu
                            }
                            key = {
                                index
                            }
                            depthLevel = {
                                depthLevel
                            }
                            />;
                        })
                    }
                    </ul>
                </div>
                <Link to='/'><img className='mainLogoWebsite' src={mainLogo} alt="" style={{}} /></Link>
                <div className='navIcons'>
                    <FontAwesomeIcon icon={faHeart} style={{cursor:'pointer'}} onClick={profileView}></FontAwesomeIcon>
                </div>
            </div>
        </nav>
    )
}
