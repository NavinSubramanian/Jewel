import React, { useEffect, useState } from 'react'
import '../logic/imageSwitch'
import ImageGallery from './ImageGallery'
import { Link, useNavigate, useParams } from 'react-router-dom'
import NavBar from './NavBar'
import Footer from './Footer'
import axios from 'axios'

const SeperateItem = () => {
  let { id,metal } = useParams()
  const [details, setDetails] = useState({})
  const [rate, setRate] = useState()
  
  useEffect(() => {
    async function fetchRates() {
      try {
        const today = new Date().toISOString().slice(0, 10)
        const response = await axios.get(`http://localhost:5000/gr/${today}/${metal}`)
        const response2 = await axios.get(`http://localhost:5000/gp/${id}`)
        setRate(response.data.gold_rate)
        setDetails(response2.data[0])
      } catch (err) {
        alert("please try agaiin some time later")
      }
    }
    fetchRates()
  }, [])

  const images = [details.imagelink1, details.imagelink2, details.imagelink3, details.imagelink4].filter(Boolean)
  let nav = useNavigate()

  const enquireForm = () => {
    nav(`/single/${id}/${metal}/enquire`)
  }

  return (
    <>
      <NavBar />

      <div className='pageNavigation'>
        <Link to='/'>HOME</Link>
        <span>/</span>
        <Link to='/gold'>GOLD</Link>
        <span>/</span>
        <Link to='/'>CHAINS</Link>
        <span>/</span>
        <Link to='/'>Sample Item</Link>
      </div>
      
      <div className="gallery-container" style={{marginBottom:'50px'}}>
        {images.length > 0 && <ImageGallery images={images} />}
        <div className="product-info">
          <div>
            <h3>{details.name}</h3>
          </div>
          <h4 className="price"><span style={{fontSize:'25px'}}>₹</span>{(details.weight*rate)+parseFloat(details.making_charges)}</h4>
          <p>{details.description}</p>
          <div className="actionsItem">
            <button onClick={enquireForm}>Enquire</button>
            <button>Add to Favourites</button>
          </div>
          <div className="details">
            <h4>DETAILS</h4>
            <p>Gram rate: {rate}</p>
            <p>Sizes: {details.size}</p>
            <p>Weight: {details.weight}</p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default SeperateItem
