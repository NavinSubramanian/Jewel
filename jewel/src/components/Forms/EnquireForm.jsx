import React, { useState } from 'react'
import axios from 'axios'

import Thankyou from '../Popups/Thankyou'

const EnquireForm = ({ id,metal }) => {
  const [customerName, setCustomerName] = useState('')
  const [email, setEmail] = useState('')
  const [description, setDescription] = useState('')
  
  const [formFilled, setFormFilled] = useState(false)
  // This is for the user thank you popup

  // Need to have metal passed to the database
  // VIP

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.post('http://localhost:5000/enquire', {
        product_id: id,
        customer_name: customerName,
        customer_email: email,
        description: description
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
    <form className='enquireFormBody' onSubmit={handleSubmit}>
      <label htmlFor="">Product ID:</label>
      <input type="text" disabled value={id} />
      <label htmlFor="">Customer Name:</label>
      <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
      <label htmlFor="">Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <label htmlFor="">Description:</label>
      <textarea type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <button type="submit">Submit</button>

      <Thankyou trigger={formFilled}/>
    </form>
  )
}

export default EnquireForm
