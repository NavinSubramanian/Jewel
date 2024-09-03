import React from 'react'
import { Link } from 'react-router-dom'

const ItemList = ({item,rate}) => {
return (
    <Link className='itemBox' to={`/single/${item.id}/${item.metal}`}>
        <div>
            <img src={item.imagelink1} />
            <img src={item.imagelink2} />
        </div>
        <h3>{item.name.length > 20 ? `${item.name.substring(0, 18)}...` : item.name}</h3>
        <h5>{((rate*item.weight)+parseFloat(item.making_charges))}</h5>
    </Link>
  )
}

export default ItemList