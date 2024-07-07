import React from 'react'

import NavBar from '../NavBar'
import Footer from '../Footer'

const CustomizeForm = () => {
  return (
    <>
        <NavBar />

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
                <input type="checkbox" />
                <label htmlFor="">Read the terms</label>
            </div>
        </div>
        <div className='customizeFormBody'>
            <form action="" className='customizeForm'>
                <label htmlFor="">Full Name</label>
                <input type="text" />
                <label htmlFor="">Number</label>
                <input type="text" />
                <label htmlFor="">Email</label>
                <input type="text" />
                <label htmlFor="">Description of your idea/product</label>
                <textarea />
                <label htmlFor="">Images</label>
                <input type="image" />

                <button >Submit</button>
            </form>
        </div>

        <Footer/>
    </>
  )
}

export default CustomizeForm