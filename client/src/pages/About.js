import React from 'react'

import About1 from '../assets/onePagesImages/about1.png';
import About2 from '../assets/onePagesImages/about2.png';
import About3 from '../assets/onePagesImages/about3.png';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

import { faPhone,faMailReply,faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { faInstagram } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const About = () => {
    return (
        <>
            <NavBar />

            <div className="about_container1">
                <div className="textAbout">
                    <h1 style={{ marginTop: '30px' }}>ABOUT US</h1>
                    <h2>About Us : Get to know more about our company</h2>
                    <p>At Geetha Jewellers, we uphold the values of integrity, creativity, and customer satisfaction. We are passionate about crafting timeless jewelry that honors life's special moments. Our mission is to deliver the finest quality pieces by merging traditional techniques with modern elegance, ensuring that each creation is a symbol of beauty and lasting value.</p>
                </div>
                <div className="image_container">
                    <img className="about" src={About1} alt="about1" />
                </div>
            </div>

            <div className='about_container2'>
                <div>
                    <img className='about2' src={About2} alt='' />
                </div>
                <div className='about2p'>
                    <h1 style={{ marginTop: '30px' }}>History of our Company</h1>
                    <p style={{ marginTop: '10px', maxWidth: '600px' }}>In 1998, Vivekkanna founded Geetha Jewellers with a vision for unparalleled craftsmanship and a dedication to quality. What began as a modest family enterprise has since evolved into a renowned name in the jewelry world, celebrated for its distinctive designs and outstanding customer service. <br /><br /><br />Our diverse clientele includes both trend-savvy individuals seeking contemporary designs and traditionalists who appreciate classic elegance. We strive to meet the needs of every customer, creating pieces that resonate with both modern tastes and timeless sensibilities.</p>
                </div>
            </div>

            <div className='about_container3' style={{ marginTop: '50px' }}>
                <div className='servicesTextLeft'>
                    <h1>
                    We Provide Awesome Services
                    </h1>
                    <p>Experience the extraordinary with our services. We don't just meet expectations—we exceed them. Discover a world where quality, reliability, and innovation come together to create truly awesome solutions for all your needs.</p>
                </div>
                <img src={About3} alt='' draggable="false" />
            </div>

            <div className='about_container4'>
                <h1>Contact Information</h1>
                <div>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15633.401969369806!2d78.6023982!3d11.5983419!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bab9d95c8274f95%3A0xc6b891123e0cba21!2sGeetha%20Jewellers!5e0!3m2!1sen!2sin!4v1723094660028!5m2!1sen!2sin" width="500" height="350" style={{border:'0'}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    <div>
                        <div>
                            <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>
                            <p>+91 73971 84803</p>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faMailReply}></FontAwesomeIcon>
                            <p>abc@gmail.com</p>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
                            <p>geethajewellers</p>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon>
                            <p>No 20, Geetha jewellers, <br />
                                Bazar street Ranipetai, <br />
                                near taluk office, <br />
                                Attur - 636102.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>

    )
}

export default About