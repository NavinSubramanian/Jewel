import React, { useEffect, useState } from 'react'

import NavBar from './NavBar'
import Footer from './Footer'
import EnquireForm from './Forms/EnquireForm'

import { useParams } from 'react-router-dom'

import axios from 'axios'

const Enquire = () => {

  const [details, setDetails] = useState({})
  const [rate, setRate] = useState()

  const [openForm, setOpenForm] = useState(false)

  let {id,metal} = useParams() 
  // id can be used to save user with item
  // can also be used to fetch the product detail again for showcasing
  
  useEffect(() => {
    async function fetchRates() {
      try {
        const today = new Date().toISOString().slice(0, 10)
        const response = await axios.get(`https://jewelbackend.vercel.app/gr/${today}/${metal}`)
        const response2 = await axios.get(`https://jewelbackend.vercel.app/gp/${id}`)
        setRate(response.data.gold_rate)
        setDetails(response2.data[0])
      } catch (err) {
        alert("please try agaiin some time later")
      }
    }
    fetchRates()
  }, [])

  // useEffect(()=>{
  //   console.log(rate)
  // },[rate])

  return (
    <>
      <NavBar />  

      <div className='productInquiry'>
        <h1>Product Inquiry</h1>
        <hr />
        <div>
          <img src={`${details.imagelink1}`} alt="" />
          <div>
            <div>
              <p>{details.name}</p>
            </div>
            <p>Price : {rate}</p>
            <p>Type : {details.type}</p>
            <p>Item ID : {details.id}</p>
            <p>Gram : {details.weight}</p>
          </div>
        </div>
      </div>  

      <div className='enquirePageBody'>
        <h1>My Information</h1>
        <hr />
        <EnquireForm id={id} metal={metal}/>      
      </div>  

      <Footer />
    </>
  )
}

export default Enquire