import React from 'react'
import { useParams } from 'react-router-dom'

import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import ItemList from '../components/ItemList'

import searchImage from '../assets/onePagesImages/searchedImage.jpeg'

const Searched = () => {
    let {name} = useParams()

  return (
    <>
        <NavBar />
        <div className='searchedContainer'>
            <img src={searchImage} />
            <h4>Showing Results For : {name}</h4>
            <section className='prod_display'>
                {/* {filteredItems.map((item) => (
                    <ItemList key={item.id} item={item} rate={goldPrice} />
                ))} */}
            </section>
        </div>
        <Footer />
    </>
  )
}

export default Searched