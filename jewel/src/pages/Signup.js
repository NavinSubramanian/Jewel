import React from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import '../App.css'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <>
        <NavBar />
        <div className='mainLoginContainer'>
            <div class="left-side-signup"></div>
        
            <div class="right-side">
                <form>
                    <div class="btn-group">
                        <button class="btn">
                            <img class="logo" src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/d1c98974-c62d-4071-8bd2-ab859fc5f4e9" alt="" />
                            <span>Sign in with Google</span>
                        </button>
                        <button class="btn">
                            <img class="logo" src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/59c1561b-8152-4d05-b617-0680a7629a0e" alt="" />
                            <span>Sign in with Apple</span>
                        </button>
                    </div>

                    <div class="or">OR</div>

                    <label for="email">Email</label>
                    <input type="text" placeholder="Enter Email" name="email" required />

                    <label for="password">Password</label>
                    <input
                    type="password"
                    placeholder="Enter Password"
                    name="password"
                    required />

                    <button type="submit" class="login-btn">Log in</button>
                    <div class="links">
                        <Link to="/login">Already have an account? Login</Link>
                    </div>
                </form>
                </div>
            </div>
        <Footer />
    </>
  )
}

export default Signup