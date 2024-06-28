import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { faMagnifyingGlass,faHeart,faBagShopping } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import mainLogo from '../assets/homeImages/mainLogo.png'
import { height } from '@fortawesome/free-solid-svg-icons/fa0'

import {
    menuItems
} from "./Items/menuItems";
import MenuItems from "./MenuItems";

export default function NavBar (props) {

    const isLoad = useState(false);
    
    return(
        <nav className='mainNav'>
            <div className='shopTimings'>
                <marquee behavior="" direction="">Shop open from <span>8am to 11pm</span> on weekends</marquee>
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
                <Link to='/'><img src={mainLogo} alt="" style={{height:'70px',width:'190px', marginRight:'60px'}} /></Link>
                <div className='navIcons'>
                    <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faBagShopping}></FontAwesomeIcon>
                </div>
            </div>
        </nav>
    )
}
