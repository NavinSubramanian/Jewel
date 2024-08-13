import './App.css';

import { useEffect, useState } from 'react';
import { BrowserRouter,Routes,Route,Switch } from 'react-router-dom'

import HomePage from './HomePage';
import Admin from './Admin'
import Price from './Price'

import About from './pages/About';
import Product from './pages/Product';
import Custom from './pages/Custom';
import Work from './pages/Work';
import Chitfund from './pages/Chitfund';
import Profile from './pages/Profile';

import SeperateItem from './components/SeperateItem'
import Enquire from './components/Enquire'
import CustomizeForm from './components/Forms/CustomizeForm';
import ChitFundForm from './components/Forms/ChitFundForm';

import mainLogo from './assets/homeImages/mainLogo2.svg'

import MoonLoader from 'react-spinners/MoonLoader';

import ScrollToTop from './logic/ScrollToTop';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Searched from './pages/Searched';

import { UserProvider } from './UserContext';
import AddProduct from './AddProduct';

function App () {

  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    setLoading(true) // Need to change to true before publishing
    // V.V.V.I.P
    setTimeout(()=>{
      setLoading(false)
    }, 2000)
  }, [])

  return(
    <UserProvider>
      <BrowserRouter>
        {loading ? 
          <div className='loaderDiv'>
            <h1>GEETHA JEWELLERS</h1>
            <MoonLoader
              color={'#C18843'}
              loading={loading}
              size={90}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            <img src={mainLogo}/>
            <p>Since 1988</p>
          </div>
        :
          <>
            <ScrollToTop />

            <Routes>
              <Route path='/' Component={HomePage}></Route>
              <Route path='/about' Component={About}></Route>
              <Route path='/pro/:metal' Component={Product}></Route>
              <Route path='/pro/:metal/:type' Component={Product} />
              <Route path='/custom' Component={Custom}></Route>
              <Route path='/custom/form' Component={CustomizeForm}></Route>
              <Route path='/work' Component={Work}></Route>
              <Route path='/single/:id/:metal' Component={SeperateItem}></Route>
              <Route path='/search/:name' Component={Searched}></Route>

              <Route path='/single/:id/:metal/enquire' Component={Enquire}></Route>
              <Route path='/chitfund' Component={Chitfund}></Route>
              <Route path='/chitfund/enquire' Component={ChitFundForm}></Route>

              <Route path='/admin' Component={Admin}></Route>
              <Route path='/admin/price' Component={Price}></Route>
              <Route path='/admin/newprod' Component={AddProduct}></Route>

              <Route path='/profile' Component={Profile}></Route>
              <Route path='/login' Component={Login}></Route>
              <Route path='/signup' Component={Signup}></Route>
            </Routes>
          </>
        }
      </BrowserRouter>
    </UserProvider>

  )
}

export default App;
