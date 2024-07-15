import './App.css';

import { useEffect, useState } from 'react';
import { BrowserRouter,Routes,Route,Switch } from 'react-router-dom'

import HomePage from './HomePage';
import About from './About';
import Gold from './Gold';
import Page from './Page';
import Work from './Work';
import Chitfund from './Chitfund';
import Admin from './Admin'
import Price from './Price'
import Product from './Product'
import Profile from './Profile';

import SeperateItem from './components/SeperateItem'
import Enquire from './components/Enquire'
import CustomizeForm from './components/Forms/CustomizeForm';

import mainLogo from './assets/homeImages/mainLogo2.svg'

import MoonLoader from 'react-spinners/MoonLoader';

function App () {

  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    setLoading(false) // Need to change to true before publishing
    // V.V.V.I.P
    setTimeout(()=>{
      setLoading(false)
    }, 3000)
  }, [])

  return(
    <BrowserRouter>
      {loading ? 
      <div className='loaderDiv'>
        <h1>NAME</h1>
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
        <Routes>
          <Route path='/' Component={HomePage}></Route>
          <Route path='/about' Component={About}></Route>
          <Route path='/pro/:metal' Component={Gold}></Route>
          <Route path='/custom' Component={Page}></Route>
          <Route path='/custom/form' Component={CustomizeForm}></Route>
          <Route path='/work' Component={Work}></Route>
          <Route path='/single/:id/:metal' Component={SeperateItem}></Route>
          <Route path='/single/:id/:metal/enquire' Component={Enquire}></Route>
          <Route path='/chitfund' Component={Chitfund}></Route>
          <Route path='/admin' Component={Admin}></Route>
          <Route path='/admin/price' Component={Price}></Route>
          <Route path='/admin/newprod' Component={Product}></Route>
          <Route path='/profile' Component={Profile}></Route>
        </Routes>
      }
    </BrowserRouter>
  )
}

export default App;
