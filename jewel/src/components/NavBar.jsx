import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

import Autosuggest from 'react-autosuggest';
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { IoPricetagsOutline, IoPersonOutline  } from "react-icons/io5";
import { CiHeart, CiShoppingCart, CiSearch, CiLogout  } from "react-icons/ci";

import mainLogo from '../assets/homeImages/mainLogo2.svg'
import { height, ligatures } from '@fortawesome/free-solid-svg-icons/fa0'

import {
        menuItems
    } from "./Items/menuItems";
import MenuItems from "./MenuItems";
import { UserContext } from '../UserContext';

export default function NavBar (props) {

    const isLoad = useState(false);
    const [goldPrice, setGoldPrice] = useState(0);
    const [silverPrice, setSilverPrice] = useState(0);
    const [error, setError] = useState(null);
    const [showCategoryPopup, setShowCategoryPopup] = useState(false);
    const [showWeightPopup, setShowWeightPopup] = useState(false);
    const [showPricePopup, setShowPricePopup] = useState(false);
    const [initialItems, setInitialItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [weightRangeOptions, setWeightRangeOptions] = useState([]);
    const [priceRangeOptions, setPriceRangeOptions] = useState([]);

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

    /* References */

    const categRef = props.categRef
    const priceRef = props.priceRef

    const categScroll = () => categRef.current.scrollIntoView()
    const priceScroll = () => priceRef.current.scrollIntoView()

    // Website URL

    const website_url = 'localhost:3000'; // Needs to be changed for the navigation to work

    // Other Functions
    
    useEffect(() => {
        async function fetchRates() {
            try {
                // Get today's date in YYYY-MM-DD format
                const today = new Date().toISOString().slice(0, 10);
                
                // Make the API request with the date parameter
                const response = await axios.get(`http://localhost:5000/gr/${today}/silver`);
                const response2 = await axios.get(`http://localhost:5000/gr/${today}/gold`);
                // const response3 = await axios.get(`http://localhost:5000/gr/${today}/diamond`);
                // const response4 = await axios.get(`http://localhost:5000/gr/${today}/platinum`);
                const rate1 = response.data.rates;
                const rate2 = response2.data.rates;
                // const rate3 = response3.data.rates;
                // const rate4 = response4.data.rates;
                setGoldPrice(rate1);
                setSilverPrice(rate2);
            } catch (error) {
                console.error("There was an error fetching the rates!", error);
                setError("Failed to fetch rates. Please try again later.");
            }
        }
        fetchRates();
    }, []);

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
                const response = await axios.get('http://localhost:5000/search');
                setProductNames(response.data.map(row => row.name));
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

        return inputLength === 0 ? [] : productNames.filter(name =>
            name.toLowerCase().includes(inputValue)
        );
    };

    const getSuggestionValue = suggestion => suggestion;

    const renderSuggestion = suggestion => (
        <div>
            {suggestion}
        </div>
    );

    const onChange = (event, { newValue }) => {
        setSearchValue(newValue);
    };

    const nav = useNavigate();

    const profileView = () => {
        nav('/profile');
    };

    return(
        <nav className='mainNav'>
            <div className='shopTimings'>
                <marquee behavior="" direction="">Shop open from <span>8am to 11pm</span> on weekends.&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<span className='tab'></span> <span>Gold price: </span> {goldPrice} <span>Silver price: </span> {silverPrice}</marquee>
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
                    />
                    <CiSearch />
                </div>

                <Link to='/'>
                    <img src={mainLogo} className='mainLogoWebsite' alt=""/>
                    <p>Geetha Jewellers</p>
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
    );
}
