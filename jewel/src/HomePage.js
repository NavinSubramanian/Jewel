import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import Background from './assets/homeImages/bg.png';
import StarGroup from './assets/homeImages/starGroup.png';
import SidePhoto from './assets/homeImages/sidePhoto.jpg';
import SilverPriceImage from './assets/homeImages/silverPrice.png';
import GoldPriceImage from './assets/homeImages/goldPrice.png';
import RateBanner from './assets/homeImages/rateBanner.png';
import LandingPageImage from './assets/homeImages/landingPageImage.png';
import ImageHome1 from './assets/homeImages/imageHome1.jpg';
import ImageHome2 from './assets/homeImages/imageHome2.jpg';
import ImageHome3 from './assets/homeImages/ImageHome3.png';
import traditionalCared from './assets/homeImages/traditionallyCared.png';
import CustomJewellery from './assets/homeImages/customJewel.png';
import CeoBackground from './assets/homeImages/ceobackground.png';
import StarsPanel from './assets/homeImages/starsPanel2.png'
import shopCateBg from './assets/homeImages/shopCateBg.png';
import Category1 from './assets/homeImages/category1.png';
import Category2 from './assets/homeImages/category2.png';
import Category3 from './assets/homeImages/category3.png';
import Category4 from './assets/homeImages/category4.png';
import NavBar2 from './components/NavBar2';

export default function HomePage() {
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


    return (
        <>
            <NavBar />
            <section className='landSection'>
                <div className='leftLand'>
                    <h1>Desire meets new style</h1>
                    <h4>Explore the unique world of our jewelry where, sophistication intertwines with perfection.</h4>
                    <Link to=''><button>மேலும் பாறஂக <FontAwesomeIcon icon={faArrowRight} /></button></Link>
                </div>
                <div className='rightLand'>
                    <img src={LandingPageImage} draggable='false' style={{ position: 'relative', left: '-50px' }} alt="Landing Page" />
                </div>
                <img src={Background} draggable='false' className='bg_1' alt="Background" />
                <img src={StarGroup} draggable='false' className='bg_2' alt="Star Group" />
            </section>

            <section className='siteInformation'>
                <img src={SidePhoto} alt="Side Photo" draggable='false' />
                <div className='sitemainInfo'>
                    <div>
                        <h1>5K+</h1>
                        <p>Product Available</p>
                    </div>
                    <div>
                        <h1>2K+</h1>
                        <p>Product Reviews</p>
                    </div>
                    <div>
                        <h1>4.5</h1>
                        <p>Customer Reviews</p>
                    </div>
                </div>
            </section>

            <section className='jewelPrices' style={{ backgroundImage: `url(${RateBanner})` }} id='prices'>
                <h1>Todays Price</h1>
                <div>
                    <div>
                        <img src={GoldPriceImage} draggable='false' alt="Gold Price" />
                        <div style={{ left: '20%', top: '35%' }}>
                            <h2>{goldPrice}</h2>
                            <h6>gm</h6>
                        </div>
                    </div>
                    <div>
                        <img src={SilverPriceImage} draggable='false' alt="Silver Price" />
                        <div style={{ left: '60%', top: '35%' }}>
                            <h2>{silverPrice}</h2>
                            <h6>gm</h6>
                        </div>
                    </div>
                </div>
            </section>

            <section className='dicoverSection' id='collections'>
                <h1>Discover Jewellery Collection</h1>
                <img src={StarsPanel} draggable='false' />
                <div className='discoverBottom'>
                    <div>
                        <img src={ImageHome1} alt="Image Home 1" />
                        <h2>Look for your style</h2>
                        <p>Explore the unique world of our jewelry collection.</p>
                        <Link to=''><button>மேலும் பாறஂக <FontAwesomeIcon icon={faArrowRight} /></button></Link>
                    </div>
                    <div>
                        <img src={ImageHome2} alt="Image Home 2" />
                        <h2>Custom jewellery piece</h2>
                        <p>Every jewelry should tell a unique. Customize it to make it special!</p>
                        <Link to='/custom'><button>மேலும் பாறஂக <FontAwesomeIcon icon={faArrowRight} /></button></Link>
                    </div>
                    <div>
                        <img src={ImageHome3} alt="Image Home 3" />
                        <h2>Invest on Schemes</h2>
                        <p>Got a piece of jewelry you'd love to have? Save now to buy later!</p>
                        <Link to='/chitfund'><button>மேலும் பாறஂக <FontAwesomeIcon icon={faArrowRight} /></button></Link>
                    </div>
                </div>
            </section>

            <section className='shopCategories' style={{ backgroundImage: `url(${shopCateBg})` }}>
                <h1>Shop By Categories</h1>
                <h4>நாங்கள் வழங்குவதில் ஈடுபடுங்கள்.</h4>
                <div>
                    <Link to='/pro/gold'>
                        <div>
                            <img src={Category1} alt="Category 1" />
                            <h2>Gold</h2>
                        </div>
                    </Link>
                    <Link to='/pro/silver'>
                        <div>
                            <img src={Category2} alt="Category 2" />
                            <h2>Silver</h2>
                        </div>
                    </Link>
                    <Link to='/pro/platinum'>
                        <div>
                            <img src={Category3} alt="Category 3" />
                            <h2>Platinum</h2>
                        </div>
                    </Link>
                    <Link to='/pro/coins'>
                        <div>
                            <img src={Category4} alt="Category 4" />
                            <h2>Coins</h2>
                        </div>
                    </Link>
                </div>
            </section>

            <section className='traditionalCared'>
                <div className='traditionalImage'>
                    <img src={traditionalCared} draggable='false' alt="Traditional Cared" />
                </div>
                <div className='traditionalBottom'>
                    <h1>Traditionally cared since 1976</h1>
                    <p>Explore a world of exquisite craftsmanship and timeless beauty. Eternal elegant, modern glamour, heritage treasures, you name it, we got it!</p>
                    <Link to='/about'>
                        <button>See More <FontAwesomeIcon icon={faArrowRight} /> </button>
                    </Link>
                </div>
            </section>

            <section className='ceotalkSection'>
                <h1>We aim to make you find your style </h1>
                <div>
                    <img src='' alt="CEO Talk" />
                    <div>
                        <p>Watch our CEO share valuable insights, stories, and inspirations behind our exquisite jewelry collection. Discover the passion and craftsmanship that drives us to create unique pieces for jewelry enthusiasts like you.</p>
                        <Link>
                            <button>Explore Now</button>
                        </Link>
                        <img src={CeoBackground} draggable='false' alt="CEO Background" />
                    </div>
                </div>
            </section>

            <section className='cusomJewellery'>
                <div className='cutomJewelImage'>
                    <img src={CustomJewellery} draggable='false' alt="Custom Jewellery" />
                </div>
                <div className='customBottom'>
                    <h1>Custom Jewellery Piece</h1>
                    <p>Turn your design idea into an actual product in just a few clicks</p>
                    <Link to='/custom'>
                        <button>Start Now </button>
                    </Link>
                    <h5><span>*</span>Please do note that we do not take any Copyright claim on your idea.</h5>
                </div>
            </section>

            <Footer />
        </>
    );
}
