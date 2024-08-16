import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';


/* Other Imports */


import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import Background from './assets/homeImages/bg.png';
import StarGroup from './assets/homeImages/starGroup.png';
import SilverPriceImage from './assets/homeImages/silverPrice.png';
import GoldPriceImage from './assets/homeImages/goldPrice.png';
import RateBanner from './assets/homeImages/rateBanner.png';
import LandingPageImage from './assets/homeImages/landingPageImage.png';
import ImageHome1 from './assets/homeImages/imageHome1.jpg';
import ImageHome2 from './assets/homeImages/imageHome2.jpg';
import ImageHome3 from './assets/homeImages/ImageHome3.png';
import traditionalCared from './assets/homeImages/traditionallyCared.png';
import CustomJewellery from './assets/homeImages/customJewel.png';
import StarsPanel from './assets/homeImages/starsPanel2.png'
import shopCateBg from './assets/homeImages/shopCateBg.png';
import Category1 from './assets/homeImages/category1.png';
import Category2 from './assets/homeImages/category2.png';
import Category3 from './assets/homeImages/category3.png';
import Category4 from './assets/homeImages/category4.png';
import SiteInfoImage from './assets/homeImages/siteInfoImage.png';


/* FOR MUI */


import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: 'Look for your style',
    desc: 'Explore the unique world of our jewelry collection.',
    link: `bruh`,
    imgPath: `${ImageHome1}`
  },
  {
    label: 'Custom jewellery piece',
    desc: 'Every jewelry should tell a unique. Customize it to make it special!',
    imgPath: `${ImageHome2}`,
    link: '/custom'
  },
  {
    label: 'Invest on Schemes',
    desc: `Got a piece of jewelry you'd love to have? Save now to buy later!`,
    imgPath: `${ImageHome3}`,
    link: '/chitfund'
  },
];

export default function HomePage() {
    const [goldPrice, setGoldPrice] = useState(0);
    const [silverPrice, setSilverPrice] = useState(0);
    const [error, setError] = useState(null);

    const categRef = useRef(null)
    const priceRef = useRef(null)
    const shopRef = useRef(null)

    const categScroll = () => categRef.current.scrollIntoView()
    const shopScroll = () => shopRef.current.scrollIntoView()


    useEffect(() => {
        async function fetchRates() {
            try {
                // Get today's date in YYYY-MM-DD format
                const today = new Date().toISOString().slice(0, 10);
                
                // Make the API request with the date parameter
                const response = await axios.get(`https://www.geethajewellers.in/api/gr/${today}/silver`);
                const response2 = await axios.get(`https://www.geethajewellers.in/api/gr/${today}/gold`);
                const rate1 = response2.data.rates;
                const rate2 = response.data.rates;

                setGoldPrice(rate1);
                setSilverPrice(rate2);
            } catch (error) {
                console.error("There was an error fetching the rates!", error);
                setError("Failed to fetch rates. Please try again later.");
            }
        }
        fetchRates();
    }, []);


    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = images.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };


    return (
        <>
            <NavBar categRef={categRef} priceRef={priceRef} silverPrice={silverPrice} goldPrice={goldPrice} />
            <section className='landSection'>
                <div className='leftLand'>
                    {/* <p>Welcome to Getha Jewelry</p> */}
                    <h1>Desire meets new style</h1>
                    <h4>Explore the unique world of our jewelry where, sophistication intertwines with perfection.</h4>
                    <Link onClick={categScroll}><button>மேலும் பாறஂக <FontAwesomeIcon icon={faArrowRight} /></button></Link>
                </div>
                <div className='rightLand'>
                    <img src={LandingPageImage} draggable='false' style={{ position: 'relative', left: '-50px' }} alt="Landing Page" />
                </div>
                <img src={Background} draggable='false' className='bg_1' alt="Background" />
                <img src={StarGroup} draggable='false' className='bg_2' alt="Star Group" />
            </section>

            <section className='siteInformation'>
                <img src={SiteInfoImage} alt="Side Photo" draggable='false' />
                <div className='sitemainInfo'>
                    <img src='https://images.unsplash.com/photo-1689367436442-76c859315008?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z29sZCUyMGpld2VsbGVyeXxlbnwwfHwwfHx8MA%3D%3D' />
                    <div>
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
                            <p>Customer Rating</p>
                        </div>
                    </div>
                    <img src='https://images.unsplash.com/photo-1650455221359-3aebf920bcc5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Z29sZCUyMGpld2VsbGVyeXxlbnwwfHwwfHx8MA%3D%3D' />
                </div>
            </section>

            <section className='jewelPrices' style={{ backgroundImage: `url(${RateBanner})` }} ref={priceRef}>
                <h1>Todays Price</h1>
                <div>
                    <div>
                        <img src={GoldPriceImage} draggable='false' alt="Gold Price" />
                        <div style={{ left: '10%', top: '35%' }}>
                            <h2>{goldPrice}</h2>
                            <h6>/gm</h6>
                        </div>
                    </div>
                    <div>
                        <img src={SilverPriceImage} draggable='false' alt="Silver Price" />
                        <div style={{ left: '50%', top: '35%' }}>
                            <h2>{silverPrice}</h2>
                            <h6>/gm</h6>
                        </div>
                    </div>
                </div>
            </section>

            <section className='dicoverSection' ref={categRef}>
                <h1>Discover Jewellery Collection</h1>
                <img src={StarsPanel} draggable='false' />
                <div className='discoverBottom'>
                    <div>
                        <img src={ImageHome1} alt="Image Home 1" />
                        <h2>Look for your style</h2>
                        <p>Explore the unique world of our jewelry collection.</p>
                        <Link onClick={shopScroll}><button>மேலும் பாறஂக <FontAwesomeIcon icon={faArrowRight} /></button></Link>
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

                <div className='discoverBottomMobile'>
                    <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
                        <Paper
                            square
                            elevation={0}
                            sx={{
                            display: 'flex',
                            alignItems: 'center',
                            height: 50,
                            pl: 2,
                            bgcolor: 'background.default',
                            }}
                        >
                        </Paper>
                        <AutoPlaySwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={activeStep}
                            onChangeIndex={handleStepChange}
                            enableMouseEvents
                        >
                            {images.map((step, index) => (
                            <div key={step.label}>
                                {Math.abs(activeStep - index) <= 2 ? (
                                <Box
                                    component="img"
                                    sx={{
                                    height: 255,
                                    display: 'block',
                                    maxWidth: 200,
                                    overflow: 'hidden',
                                    width: '100%',
                                    margin: '0 auto'
                                    }}
                                    src={step.imgPath}
                                    alt={step.label}
                                />
                                ) : null}
                            </div>
                            ))}
                        </AutoPlaySwipeableViews>
                        <Typography sx={{
                            textAlign:'center',
                            fontSize: '25px',
                            color: '#C18843',
                            fontFamily: 'Calmius Sans High'
                            }}>{images[activeStep].label}</Typography>
                        <Typography sx={{
                            textAlign:'center',
                            fontSize: '14px',
                            maxWidth: '250px',
                            margin: '0 auto',
                            color: '#C18843',
                            fontFamily: 'Karla',
                            fontWeight: '300',
                            marginTop: '10px'
                            }}>{images[activeStep].desc}</Typography>
                        <MobileStepper
                            steps={maxSteps}
                            position="static"
                            activeStep={activeStep}
                            sx={{
                                margin: '0 auto',
                                color: '#C18843',
                            }}
                        />
                    </Box>
                </div>
            </section>

            <section className='shopCategories' style={{ backgroundImage: `url(${shopCateBg})` }} ref={shopRef}>
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
                    <div>
                        <h1>Traditionally cared since 1976</h1>
                        <p>Explore a world of exquisite craftsmanship and timeless beauty. Eternal elegant, modern glamour, heritage treasures, you name it, we got it!</p>
                    </div>
                    <Link to='/about'>
                        <button>See More <FontAwesomeIcon icon={faArrowRight} /> </button>
                    </Link>
                </div>
            </section>

            <section className='ceotalkSection'>
                <h1>We aim to make you find your style </h1>
                <div>
                    <img src='https://media.istockphoto.com/id/1158583412/video/speaker-businessman-talking-at-webcam-making-conference-video-call.jpg?s=640x640&k=20&c=Yw2J5fFEW2wlbtUr7R_i_IQVANnas_wBtHyY-DFnnH0=' alt="CEO Talk" />
                    <div>
                        <p>Watch our CEO share valuable insights, stories, and inspirations behind our exquisite jewelry collection. In this exclusive presentation, you'll delve into the heart of our brand, exploring the journey that has shaped us into the creators of some of the most stunning and unique jewelry pieces available today. Discover the passion and craftsmanship that drives us to create unique pieces for jewelry enthusiasts like you.</p>
                        <h3>
                            "Crafting dreams into timeless treasures."
                        </h3>
                        <div>
                            <p>- Our CEO</p>
                            <Link to='/about'>
                                <span>Know More</span>
                            </Link>
                        </div>
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
