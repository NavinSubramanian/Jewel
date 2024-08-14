import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';

import NavBar from '../NavBar'
import Footer from '../Footer'
import Thankyou from '../Popups/Thankyou';
import { UserContext } from '../../UserContext';

const CustomizeForm = () => {

    const [showForm, setShowForm] = useState(false);
    const { user } = useContext(UserContext);

    const [formData, setFormData] = useState({
        fullName: '',
        number: '',
        email: user ? user.email : '',
        description: '',
        file: null,
    });


    const [formFilled, setFormFilled] = useState(false)
    // For the Thank You popup state

    const handleCheckboxChange = (event) => {
        setShowForm(event.target.checked);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (event) => {
        setFormData({
            ...formData,
            file: event.target.files[0],
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData();
        data.append('fullName', formData.fullName);
        data.append('number', formData.number);
        data.append('email', formData.email);
        data.append('description', formData.description);
        data.append('file', formData.file);

        try {
            await axios.post('http://localhost:5000/enquire', data);
            // alert('Enquiry submitted successfully');
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // This adds a smooth scroll effect
            });
            setFormFilled(true);
        } catch (error) {
            console.error('There was an error submitting the form:', error);
            alert('Failed to submit enquiry');
        }
    };
    

  return (
    <>
        <NavBar />

        <Thankyou trigger={formFilled}/>

        <div className='instructionsCustomize'>
            <h1>Terms and Conditions</h1>
            <ol>
                <li><h4>All designs submitted must be original and not infringe on any third-party rights. <br /></h4>
                உங்கள் வடிவமைப்புகள் முழுமையாக ஒப்புக்கொள்ளப்படும் வரை, எங்கள் தளத்தில் தொகுக்கப்பட்ட பிற பிற நகை தயாரிப்புகளை ஒத்திருக்கக்கூடும்.</li>
                <li><h4>Accurate contact information (phone number and email) must be provided to facilitate communication. <br /></h4>
                சரியான தொடர்பு தகவல்களை (தொலைபேசி எண் மற்றும் மின்னஞ்சல்) வழங்க வேண்டும்.</li>
                <li><h4>Our team will review your design and contact you for further details if necessary.<br /></h4>
                உங்கள் வடிவமைப்பை எங்கள் குழு மதிப்பீடு செய்து, தேவையான விவரங்களுக்கு உங்களை தொடர்பு கொள்வோம்.</li>
                <li><h4>We will begin crafting the custom jewelry only after final approval of the design.<br /></h4>
                வடிவமைப்பின் இறுதி ஒப்புதலின் பிறகு மட்டுமே தனிப்பயன் நகை வடிவமைக்கப்படும்.</li>
                <li><h4>The time required to complete the custom jewelry will vary based on the complexity of the design.<br /></h4>
                வடிவமைப்பின் சிக்கலுக்கேற்ப தனிப்பயன் நகைகளை முடிக்க தேவையான நேரம் மாறுபடும்.</li>
                <li><h4>A deposit may be required before the commencement of the customization process.<br /></h4>
                தனிப்பயன் நகை வடிவமைப்பின் தொடக்கத்திற்கு முன் ஒரு வைப்பு கட்டணம் அவசியமாக இருக்கலாம்.</li>
                <li><h4>Upon completion, the custom jewelry can either be listed on our website for others to purchase or delivered directly to you.<br /></h4>
                முடிந்ததும், தனிப்பயன் நகைப் பொருள் எங்கள் இணையதளத்தில் பட்டியலிடப்படும் அல்லது நேரடியாக உங்களுக்கு டெலிவரி செய்யப்படும்.</li>
                <li><h4>Cancellation of custom orders must be made within 24 hours of submission.<br /></h4>
                தனிப்பயன் ஆணைகளை ரத்து செய்வது சமர்ப்பிப்பு செய்த 24 மணி நேரத்திற்குள் செய்யப்பட வேண்டும்.</li>
            </ol>
            <div>
                <input id='customForm' onChange={handleCheckboxChange} type="checkbox" />
                <label htmlFor="customForm">I have read the terms</label>
            </div>
        </div>
        {showForm && (
            <div className='customizeFormBody'>
                <form onSubmit={handleSubmit} className='customizeForm'>
                    <label htmlFor="fullName">Full Name</label>
                    <input type="text" name='fullName' value={formData.fullName} onChange={handleInputChange} />

                    <label htmlFor="number">Number</label>
                    <input type="text" name='number' value={formData.number} onChange={handleInputChange} />

                    {user != null ? <>
                        <label htmlFor="">Email:</label>
                        <input type="email" value={user.email} disabled />
                    </> : <>
                        <label htmlFor="email">Email</label>
                        <input type="text" name='email' value={formData.email} onChange={handleInputChange} />
                    </>}
                    

                    <label htmlFor="description">Description of your idea/product</label>
                    <textarea name='description' value={formData.description} onChange={handleInputChange} />

                    <label htmlFor="">Image</label>
                    <input type="file" name="file" accept="image/*,.pdf" onChange={handleFileChange} />

                    <button >Submit</button>
                </form>
            </div>
        )}

        <Footer/>
    </>
  )
}

export default CustomizeForm