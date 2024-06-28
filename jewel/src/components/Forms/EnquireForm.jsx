import React, { useState } from 'react'
import axios from 'axios'

const EnquireForm = ({ id }) => {
  const [customerName, setCustomerName] = useState('')
  const [email, setEmail] = useState('')
  const [description, setDescription] = useState('')

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
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <button type="submit">Submit</button>
    </form>
  )
}

export default EnquireForm
