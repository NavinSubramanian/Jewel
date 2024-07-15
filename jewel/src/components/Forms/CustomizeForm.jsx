import React, { useState } from 'react'

import NavBar from '../NavBar'
import Footer from '../Footer'

import axios from 'axios';
import Thankyou from '../Popups/Thankyou';

const CustomizeForm = () => {

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        number: '',
        email: '',
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
            <h1>Please Read the instructions before filling</h1>
            <ol>
                <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex expedita voluptatum officiis. Vitae quis itaque quibusdam. Repellat, repellendus. Adipisci labore tempore recusandae similique. Ut quibusdam dignissimos harum neque, vero eius.</li>
                <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex expedita voluptatum officiis. Vitae quis itaque quibusdam. Repellat, repellendus. Adipisci labore tempore recusandae similique. Ut quibusdam dignissimos harum neque, vero eius.</li>
                <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex expedita voluptatum officiis. Vitae quis itaque quibusdam. Repellat, repellendus. Adipisci labore tempore recusandae similique. Ut quibusdam dignissimos harum neque, vero eius.</li>
                <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex expedita voluptatum officiis. Vitae quis itaque quibusdam. Repellat, repellendus. Adipisci labore tempore recusandae similique. Ut quibusdam dignissimos harum neque, vero eius.</li>
                <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex expedita voluptatum officiis. Vitae quis itaque quibusdam. Repellat, repellendus. Adipisci labore tempore recusandae similique. Ut quibusdam dignissimos harum neque, vero eius.</li>
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

                    <label htmlFor="email">Email</label>
                    <input type="text" name='email' value={formData.email} onChange={handleInputChange} />

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