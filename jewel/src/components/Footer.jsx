import React from "react"

import { faFacebookF, faXTwitter, faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Footer () {
    return(
        <footer>
            <div className="topFooter">
                <div className="lefttopFooter">
                    <div>
                        <h2>Your Name</h2>
                        <p>This is a demo tag needed to be replaced afterwords.</p>
                    </div>
                    <div className="footerLogos">
                        <FontAwesomeIcon icon={faFacebookF}></FontAwesomeIcon>
                        <FontAwesomeIcon icon={faXTwitter}></FontAwesomeIcon>
                        <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
                        <FontAwesomeIcon icon={faLinkedinIn}></FontAwesomeIcon>
                    </div>
                </div>
                <div className="righttopFooter">
                    <div>
                        <h4 style={{fontWeight:'600', marginBottom:'6px'}}>About us</h4>
                        <h4 style={{fontSize:'15px',fontWeight:'200'}}>Our shop</h4>
                        <h4 style={{fontSize:'15px',fontWeight:'200'}}>Services</h4>
                        <h4 style={{fontSize:'15px',fontWeight:'200'}}>Contact</h4>
                    </div>
                    <div>
                        <h4 style={{fontWeight:'600', marginBottom:'6px'}}>FAQ</h4>
                        <h4 style={{fontSize:'15px',fontWeight:'200'}}>Chit schemes</h4>
                        <h4 style={{fontSize:'15px',fontWeight:'200'}}>Custom Jewellery</h4>
                        <h4 style={{fontSize:'15px',fontWeight:'200'}}>More details</h4>
                    </div>
                    <div>
                        <h4 style={{fontWeight:'600', marginBottom:'6px'}}>Products</h4>
                        <h4 style={{fontSize:'15px',fontWeight:'200'}}>Categories</h4>
                        <h4 style={{fontSize:'15px',fontWeight:'200'}}>Men's wear</h4>
                        <h4 style={{fontSize:'15px',fontWeight:'200'}}>Women's wear</h4>
                        <h4 style={{fontSize:'15px',fontWeight:'200'}}>Material type</h4>
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