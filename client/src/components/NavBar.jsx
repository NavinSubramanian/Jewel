import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Autosuggest from 'react-autosuggest';
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { IoPricetagsOutline, IoPersonOutline  } from "react-icons/io5";
import { CiHeart, CiShoppingCart, CiSearch, CiLogout  } from "react-icons/ci";

import mainLogo from '../assets/homeImages/mainLogo3.png'
import { height, ligatures } from '@fortawesome/free-solid-svg-icons/fa0'

import {
        menuItems
    } from "./Items/menuItems";
import MenuItems from "./MenuItems";
import { UserContext } from '../UserContext';

export default function NavBar (props) {

    const isLoad = useState(false);
    const [goldPrice, setGoldPrice] = useState(0);
    const [error, setError] = useState(null);
    const [showCategoryPopup, setShowCategoryPopup] = useState(false);
    const [showWeightPopup, setShowWeightPopup] = useState(false);
    const [showPricePopup, setShowPricePopup] = useState(false);
    const [initialItems, setInitialItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [weightRangeOptions, setWeightRangeOptions] = useState([]);
    const [priceRangeOptions, setPriceRangeOptions] = useState([]);

    const [goldJewelTypes, setGoldJewelTypes] = useState({});
    const [silverJewelTypes, setSilverJewelTypes] = useState({});
    const [platinumJewelTypes, setPlatinumJewelTypes] = useState({});

    const [categories, setCategories] = useState({});
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedWeightRanges, setSelectedWeightRanges] = useState([]);
    const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
    
    const [suggestions, setSuggestions] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [productNames, setProductNames] = useState([]);

    const { user } = useContext(UserContext);
    const { logoutUser } = useContext(UserContext);

    const [isMenuOpen, setIsMenuOpen] = useState(false);


    // Website URL

    const website_url = 'https://www.geethajewellers.in/'; // Needs to be changed for the navigation to work


    /* References */

    const categRef = props.categRef
    const priceRef = props.priceRef

    const categScroll = () => {
        if(window.location.href == website_url){
            categRef.current.scrollIntoView();
        }else{
            nav('/')
        }
    }
    const priceScroll = () => {
        if(window.location.href == website_url){
            priceRef.current.scrollIntoView();
        }else{
            nav('/')
        }
    }

    // Other Functions

    useEffect(() => {
        async function fetchJewelTypes(metal) {
            try {
                const response = await axios.get(`https://www.geethajewellers.in/api/gf/${metal}`);
                const jewelTypes = response.data.reduce((acc, item) => {
                    if (!acc[item.category]) {
                        acc[item.category] = [];
                    }
                    acc[item.category].push(item.type);
                    return acc;
                }, {});
                switch(metal) {
                    case 'gold':
                        setGoldJewelTypes(jewelTypes);
                        break;
                    case 'silver':
                        setSilverJewelTypes(jewelTypes);
                        break;
                    case 'platinum':
                        setPlatinumJewelTypes(jewelTypes);
                        break;
                    default:
                        break;
                }
            } catch (error) {
                console.error("There was an error fetching the jewel types!", error);
                setError("Failed to fetch jewel types. Please try again later.");
            }
        }

        fetchJewelTypes('gold');
        fetchJewelTypes('silver');
        fetchJewelTypes('platinum');
    }, []);

    useEffect(() => {
        async function fetchData() {
            try {
                const [rateResponse, itemsResponse] = await Promise.all([
                    axios.get(`https://www.geethajewellers.in/api/getproduct/gold`)
                ]);
                setGoldPrice(props.goldPrice);
                const items = itemsResponse.data;
                setInitialItems(items);
                setFilteredItems(items);
                extractCategories(items);
                // generateRangeOptions(items, rates);
            } catch (error) {
                console.error("There was an error fetching the data!", error);
                setError("Failed to fetch data. Please try again later.");
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchProductNames() {
            try {
                const response = await axios.get('https://www.geethajewellers.in/api/search');
                setProductNames(response.data.map(row => row));
            } catch (error) {
                console.error("There was an error fetching the product names!", error);
                setError("Failed to fetch product names. Please try again later.");
            }
        }
        fetchProductNames();
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const logoutFunction = () => {
        toast.success("Logout Sucessfull", {
            autoClose: 2000,
        });
        logoutUser()
    }

    const extractCategories = (items) => {
        const categories = {};
        items.forEach(item => {
            if (!categories[item.category]) {
                categories[item.category] = new Set();
            }
            categories[item.category].add(item.type);
        });
        for (let category in categories) {
            categories[category] = Array.from(categories[category]);
        }
        setCategories(categories);
    };

    const onSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(getSuggestions(value));
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : productNames.filter(item =>
            item.name.toLowerCase().includes(inputValue)
        );
    };

    const getSuggestionValue = suggestion => suggestion.name;

    const renderSuggestion = suggestion => (
        <div>
            {suggestion.name}
        </div>
    );

    const onChange = (event, { newValue }) => {
        setSearchValue(newValue);
    };

    const onSuggestionSelected = (event, { suggestion }) => {
        const { id, metal } = suggestion;
        nav(`/single/${id}/${metal}`);
    };

    const nav = useNavigate();

    const profileView = () => {
        nav('/profile');
    };

    return(
        <nav className='mainNav'>
            <div className='shopTimings'>
                <marquee behavior="" direction="">Shop open from <span>8am to 11pm</span> on weekends.&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<span className='tab'></span> <span>Gold price: </span> {props.goldPrice} <span>Silver price: </span> {props.silverPrice}</marquee>
            </div>
            <div className='bottomNav'>
                <div className='searchInputWeb'>
                    <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={onSuggestionsClearRequested}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={{
                            placeholder: 'Search for the needed jewellery...',
                            value: searchValue,
                            onChange: onChange
                        }}
                        onSuggestionSelected={onSuggestionSelected}
                    />
                    <CiSearch />
                </div>

                <Link to='/'>
                    <img src={mainLogo} className='mainLogoWebsite' alt=""/>
                </Link>

                <div className='navIcons'>
                    <div onClick={categScroll}>
                        <CiShoppingCart style={{ fontSize: '25px' }} />
                        <h4>Shop</h4>
                    </div>
                    <div onClick={priceScroll}>
                        <IoPricetagsOutline style={{ fontSize: '20px' }} />
                        <h4>Prices</h4>
                    </div>
                    {user == null ? <>
                            <div onClick={()=>{nav('/login')}}>
                            <IoPersonOutline style={{fontSize:'22px'}} />
                            <h4>Acount</h4>
                            </div>
                        </> : <>
                            <div onClick={logoutFunction}>
                                <CiLogout style={{fontSize:'22px'}} />
                                <h4>Logout</h4>
                            </div>
                        </>
                    }
                    <div onClick={() => { nav('/profile'); }}>
                        <CiHeart style={{ fontSize: '25px' }} />
                        <h4>WishList</h4>
                    </div>
                    <div onClick={() => { nav('/about'); }}>
                        <AiOutlineExclamationCircle style={{ fontSize: '22px' }} />
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
                    <li className="navbar-dropdown">
                        <a>Gold</a>
                        <div className="dropdown">
                            {Object.keys(goldJewelTypes).map(category => (
                                <div key={category}>
                                    <h4>{category}</h4>
                                    {goldJewelTypes[category].map(type => (
                                        <Link to={`/pro/gold/${type}`} key={type}>{type}</Link>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </li>
                    <li className="navbar-dropdown">
                        <a>Silver</a>
                        <div className="dropdown">
                            {Object.keys(silverJewelTypes).map(category => (
                                <div key={category}>
                                    <h4>{category}</h4>
                                    {silverJewelTypes[category].map(type => (
                                        <Link to={`/pro/silver/${type}`} key={type}>{type}</Link>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </li>
                    <li className="navbar-dropdown">
                        <a>Platinum</a>
                        <div className="dropdown">
                            {Object.keys(platinumJewelTypes).map(category => (
                                <div key={category}>
                                    <h4>{category}</h4>
                                    {platinumJewelTypes[category].map(type => (
                                        <a href="#" key={type}>{type}</a>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </li>
                    <li className="navbar-dropdown">
                        <a>Coins</a>
                        <div className="dropdown">
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
                                <a href="#">4</a>
                                <a href="#">8</a>
                                <a href="#">16</a>
                                <a href="#">32</a>
                                <a href="#">40</a>
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
                <div className='navIconsMobile'>
                    <div onClick={categScroll}>
                        <CiShoppingCart style={{ fontSize: '25px' }} />
                        <h4>Shop</h4>
                    </div>
                    <div onClick={priceScroll}>
                        <IoPricetagsOutline style={{ fontSize: '20px' }} />
                        <h4>Prices</h4>
                    </div>
                    {user == null ? <>
                            <div onClick={()=>{nav('/login')}}>
                            <IoPersonOutline style={{fontSize:'22px'}} />
                            <h4>Acount</h4>
                            </div>
                        </> : <>
                            <div onClick={logoutFunction}>
                                <CiLogout style={{fontSize:'22px'}} />
                                <h4>Logout</h4>
                            </div>
                        </>
                    }
                    <div onClick={() => { nav('/profile'); }}>
                        <CiHeart style={{ fontSize: '25px' }} />
                        <h4>WishList</h4>
                    </div>
                    <div onClick={() => { nav('/about'); }}>
                        <AiOutlineExclamationCircle style={{ fontSize: '22px' }} />
                        <h4>About</h4>
                    </div>
                </div>
            </div>
        </nav>
    );
}
