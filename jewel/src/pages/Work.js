import React from 'react'

import w from '../assets/onePagesImages/work.png'
import w1 from '../assets/onePagesImages/w1.png'
import work from '../assets/onePagesImages/job.png'

import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

const Work = () => {
    return (
        <>
            <NavBar />

            <h1 className='maintitleWork' style={{ textAlign: 'center' }}>Work With Us</h1>

            <div className='workTextTop' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                <p style={{ textAlign: 'center', maxWidth: '800px', marginTop: '20px' }}>
                    To innovate, collaborate, and grow in a dynamic and inclusive environment.
                    Enjoy comprehensive benefits, diverse opportunities, and a culture that values your professional development.
                    Apply now and be part of our passionate team!
                </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img style={{ marginTop: '50px', width: '40%' }} src={w} alt='work' />
            </div>

            <div>
                <h1 className='whyWorkWith' style={{ textAlign: 'center', marginTop: '60px' }}>Why work with us</h1>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <p style={{ backgroundColor: '#C18843', width: '10%', height: '3px', marginTop: '8px', marginBottom: '20px' }}></p>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img style={{ marginTop: '50px', width: '60%' }} src={w1} alt='w1' />
            </div>

            <div className='working_container'>
                <div className='left_content'>
                    <h1>Featured opportunities</h1>

                    <div style={{ marginTop: '60px' }}>
                        <p style={{ color: '#C18843', fontSize: '25px' }}>QUALITY ANALYST</p>
                        <p style={{ marginTop: '10px', marginBottom: '15px', fontFamily: '15px' }}>On site</p>
                        <hr style={{ width: '60%' }} />
                    </div>

                    <div>
                        <p style={{ color: '#C18843', fontSize: '25px', marginTop: '30px' }}>STOCK CHECKER</p>
                        <p style={{ marginTop: '10px', marginBottom: '15px', fontFamily: '15px' }}>On site</p>
                        <hr style={{ width: '60%' }} />
                    </div>

                    <div>
                        <p style={{ color: '#C18843', fontSize: '25px', marginTop: '30px' }}>DELIVERY AGENT</p>
                        <p style={{ marginTop: '10px', marginBottom: '15px', fontFamily: '15px' }}>Remote</p>
                        <hr style={{ width: '60%' }} />
                    </div>

                    <div>
                        <button style={{ backgroundColor: '#C18843', border: 'none', color: 'white', height: '40px', width: '30%', marginTop: '50px', borderRadius: '8px' }}>Contact +91 98745 61230</button>
                        <p style={{fontWeight:300,marginTop:'5px'}}>* For more info</p>
                    </div>




                </div>
                <div className='right_content'>
                    <img src={work} alt='work' />
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Work