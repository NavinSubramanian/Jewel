import React, { useContext, useEffect, useState } from 'react'

import { UserContext } from '../../UserContext'
import axios from 'axios'
import Thankyou from '../Popups/Thankyou'
import NavBar from '../NavBar'
import Footer from '../Footer'

const ChitFundForm = () => {
    const [customerName, setCustomerName] = useState('')
    const [email, setEmail] = useState('')
    const [number, setNumber] = useState('')
    const [description, setDescription] = useState('')
    const { user } = useContext(UserContext);
    
    const [formFilled, setFormFilled] = useState(false)
    // This is for the user thank you popup
  
    useEffect(()=>{
      if(user != null){
        setEmail(user.email)
      }
    },[])
  
    const handleSubmit = async (event) => {
      event.preventDefault()
      try {
        // console.log(customerName+" "+email)
        await axios.post('http://localhost:5000/chitenquire', {
          customer_name: customerName,
          customer_email: email,
          customer_number: number,
          description: description,
        })
        alert('Enquiry submitted successfully!')
        window.scrollTo({
          top: 0,
          behavior: 'smooth' // This adds a smooth scroll effect
        });
        setFormFilled(true);
      } catch (error) {
        console.error('Error submitting enquiry:', error)
        alert('Failed to submit enquiry.')
      }
    }
  
    return (
        <>
            <NavBar />

            <form className='enquireFormBody' style={{margin:'50px auto'}} onSubmit={handleSubmit}>
                
                <label htmlFor="">Customer Name:</label>
                <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />

                <label htmlFor="">Number :</label>
                <input type="number" value={number} onChange={(e) => setNumber(e.target.value)} required />     
                
                {user != null ? <>
                <label htmlFor="">Email:</label>
                <input type="email" value={user.email} disabled />
                </> : <>
                <label htmlFor="">Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </>}
                
                <label htmlFor="">Description:</label>
                <textarea type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
                <button type="submit">Submit</button>
        
                <Thankyou trigger={formFilled}/>
            </form>

            <Footer />
        </>
    )
}

export default ChitFundForm