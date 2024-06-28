import React from 'react';

import Customize from './assets/onePagesImages/customize.png';

import NavBar from './components/NavBar'
import Footer from './components/Footer'

const Page = () => {
    return (
        <>
            <NavBar />
            <div className='custom_container'>
                <div className='content'>
                    <div className='image_container'>
                        <img className='customImage' src={Customize} alt='customize' />
                    </div>
                    <div className='textCustom'>
                        <h1 style={{ color: '#C18843' }}>Customize what you feel</h1>
                        <p>Explore personalized elegance with our custom jewelry services.
                            Share your ideas with us - be it a cherished memory, dream design, or creative spark.
                            Our artisans will carefully craft your unique piece, ensuring it mirrors your style.
                            With our dedication to quality, we promise more than just satisfaction; we create treasures to be cherished for generations.
                        </p>
                        <button className='custom_btn'>Get Started!</button>
                    </div>
                </div>

                <h1 className='thisIsHowWorks' style={{ marginTop: '30px', textAlign: 'center', color: '#C18843' }}>This is how it works..</h1>

                <div className='work_container'>
                    <div className='left'>
                        <div>
                            <h1 style={{ color: '#C18843' }}>1. Deisgn your Idea</h1>
                            <p style={{ width: '25rem', marginTop: '20px' }}>உங்கள் நகை வடிவமைப்பு யோசனைகளை அரத்தலாக பகிர்ந்துகொள்கிறேன்.
                                அவற்றின் விவரங்கள் மற்றும் தனிப்பயன் விவரங்கள் கீழே உள்ளன.</p>
                        </div>
                        <div>
                            <h1 style={{ color: '#C18843', marginTop: '180px' }}>3. We build your Idea</h1>
                            <p style={{ width: '25rem', marginTop: '20px' }}>ஒப்புக்கொள்ளப்பட்ட விவரக்குறிப்புகளின்படி தனிப்பயன் நகைகளை வடிவமைத்து,
                                வடிவமைப்பை எங்கள் குழு உயிர்ப்பிக்கிறது.</p>
                        </div>
                    </div>
                    <div className='right'>
                        <div>
                            <h1 style={{ color: '#C18843', marginTop: '150px' }}>2.Contact us regarding futher process</h1>
                            <p style={{ width: '25rem', marginTop: '20px' }}>The ideas you submit are evaluated by our store,உங்கள் பொருள்கள்,
                                தனிப்பயனாக்கும் பற்றிய வெளியிடல்களுக்கும் உங்களை நாங்கள் தொடர்பு கொள்ளும் முன் நாங்கள்
                                உங்களுக்கு உத்தியாக உரையாடலாகவும் செய்யும்.</p>
                        </div>
                        <div>
                            <h1 style={{ color: '#C18843', marginTop: '120px' }}>4.List the product or gift it to you</h1>
                            <p style={{ width: '25rem', marginTop: '20px' }}>முடிந்ததும், புதிய தனிப்பயன் நகைப் பொருள், பிறர் வாங்குவதற்காக எங்கள் இணையதளத்தில்
                                பட்டியலிடப்படும் அல்லது உங்களுக்கு டெலிவரி செய்யப்படும்.</p>
                        </div>
                    </div>
                </div>

                <div className='inspirationWorks'>
                    <h1 style={{textAlign: 'center' }}>Get some design inspiration from other customers</h1>
                    <div>
                        <img src='https://finercustomjewelry.com/wp-content/uploads/2021/12/1608107482514Custom_Jewelry_Design_Image_900x600.jpg' />
                        <img src='https://assets.winni.in/product/primary/2023/2/82885.jpeg?dpr=2&w=220' />
                        <img src='https://insdindia.com/wp-content/uploads/2022/12/custom-jewellery-600x450.jpg' />
                        <img src='https://silvery.co.za/wp-content/uploads/2021/08/Custom-Product-Image-1000x1000.jpg' />
                    </div>
                </div>

            </div>

            <Footer />
        </>
    )
}

export default Page;
