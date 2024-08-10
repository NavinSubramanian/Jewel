import React from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
    return (
        <div>
            <div className='admin-top'>
                <h1>Welcome Admin!</h1>
                <p style={{ marginLeft: '20px' }}>Efficiently manage your jewelry inventory with our admin portal: update prices instantly,
                    add new products easily with detailed information and images, and monitor inventory through a comprehensive dashboard
                    for informed decision-making and efficient operations.</p>
                <hr></hr>
            </div>

            <div className="item__layout">
                <div className="flex-item">
                    <img className="item1" src='https://talkroute.com/wp-content/uploads/2016/09/price-too-low-e1473775786685.jpg' />
                    <p className="item-body">Update Prices</p>
                    <p className="item-stat">Instantly adjust the prices of existing jewelry items, ensuring they reflect the latest
                        market trends and valuations.</p>
                    <button className='button2' style={{ backgroundColor: '#333' }}>
                        <Link style={{ color: 'white', textDecoration: 'none' }} to='/admin/price'>Enter</Link>
                    </button>
                </div>

                <div className="flex-item">
                    <img className="item1" src='https://www.toucantoco.com/hubfs/Adding%20product%20value.png#keepProtocol' />
                    <p className="item-body">Add new products</p>
                    <p className="item-stat">Easily introduce new jewelry pieces to your inventory. Enter detailed product information,
                        including names, descriptions, prices, and upload high-quality images to keep your catalog current and attractive.</p>
                    <button className='button2' style={{ backgroundColor: '#333' }}>
                        <Link style={{ color: 'white', textDecoration: 'none' }} to='/admin/newprod'>Enter</Link>
                    </button>
                </div>
            </div>





        </div >


    )
}

export default Admin