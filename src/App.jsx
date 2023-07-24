import React from 'react'
import Header from './components/Header'
import './components/style.css'

import {Route, Routes} from 'react-router-dom'
import CardsDetails from './components/CardsDetails';
import Cards from './components/Cards';
const App = () => {
  return (
    <>
      <Header/>
      <Routes>
        <Route exact path='/' element={<Cards />}/>
        <Route path='/cart/:id' element={<CardsDetails />}/>
      </Routes>
    </>
  )
}

export default App