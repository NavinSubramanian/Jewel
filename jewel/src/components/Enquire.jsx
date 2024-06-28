import React from 'react'

import NavBar from './NavBar'
import Footer from './Footer'
import EnquireForm from './Forms/EnquireForm'

import { useParams } from 'react-router-dom'

const Enquire = () => {

  let {id} = useParams() 
  console.log(id)// can be used to save user with item
  // can also be used to fetch the product detail again for showcasing

  return (
    <>
      <NavBar />   
      
      <div className='enquirePageBody'>
        <EnquireForm id={id}/>      
      </div>  

      <Footer />
    </>
  )
}

export default Enquire