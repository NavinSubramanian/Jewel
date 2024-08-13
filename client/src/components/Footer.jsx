import React from "react"

import { faFacebookF, faXTwitter, faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Link, useNavigate } from "react-router-dom"

export default function Footer () {

    const nav = useNavigate();

    return(
        <footer>
            <div className="topFooter">
                <div className="lefttopFooter">
                    <div>
                        <h2>Geetha Jewellers</h2>
                        <p>passionate about crafting timeless jewelry that honors life's special moments.</p>
                    </div>
                    <div className="footerLogos">
                        <a href="https://www.google.com" target="_blank"><FontAwesomeIcon icon={faFacebookF}></FontAwesomeIcon></a>
                        <a href="https://www.google.com" target="_blank"><FontAwesomeIcon icon={faXTwitter}></FontAwesomeIcon></a>
                        <a href="https://www.instagram.com/geethajewellers/" target="_blank"><FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon></a>
                        <a href="https://www.google.com" target="_blank"><FontAwesomeIcon icon={faLinkedinIn}></FontAwesomeIcon></a>
                    </div>
                </div>
                <div className="righttopFooter">
                    <div>
                        <h4 style={{fontWeight:'600', marginBottom:'6px'}}>About us</h4>
                        <h4 style={{fontSize:'15px',fontWeight:'200'}} onClick={()=>nav('/about')}>Our shop</h4>
                        <h4 style={{fontSize:'15px',fontWeight:'200'}} onClick={()=>nav('/about')}>Services</h4>
                        <h4 style={{fontSize:'15px',fontWeight:'200'}} onClick={()=>nav('/about')}>Contact</h4>
                    </div>
                    <div>
                        <h4 style={{fontWeight:'600', marginBottom:'6px'}}>FAQ</h4>
                        <h4 style={{fontSize:'15px',fontWeight:'200'}} onClick={()=>nav('/chitfund')}>Chit schemes</h4>
                        <h4 style={{fontSize:'15px',fontWeight:'200'}} onClick={()=>nav('/custom')}>Custom Jewellery</h4>
                        <h4 style={{fontSize:'15px',fontWeight:'200'}} onClick={()=>nav('/about')}>More details</h4>
                    </div>
                    <div>
                        <h4 style={{fontWeight:'600', marginBottom:'6px'}}>Products</h4>
                        <h4 style={{fontSize:'15px',fontWeight:'200'}} onClick={()=>nav('/')}>Categories</h4>
                        <h4 style={{fontSize:'15px',fontWeight:'200'}} onClick={()=>nav('/pro/gold')}>Gold Jewellery</h4>
                        <h4 style={{fontSize:'15px',fontWeight:'200'}} onClick={()=>nav('/pro/silver')}>Silver Jewellery</h4>
                        <h4 style={{fontSize:'15px',fontWeight:'200'}} onClick={()=>nav('/pro/platinum')}>Platinum Jewellery</h4>
                    </div>
                </div>
            </div>
            <hr />
            <div className="bottomFooter">
                <h4>@copyright</h4>
                <div>
                    <h4>Privacy Policy</h4>
                    <span> . </span>
                    <h4>Terms Of Use</h4>
                    <span> . </span>
                    <h4>Sitemap</h4>
                    <span> . </span>
                    <h4>Cookies</h4>
                    <span> . </span>
                </div>
            </div>
        </footer>
    )
}