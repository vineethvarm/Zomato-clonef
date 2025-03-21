import React from 'react'
import LandingPage from './SupplierDashboard/pages/LandingPage'
import { Routes, Route } from 'react-router-dom'

import "./App.css"
import NotFound from './SupplierDashboard/components/NotFound'


const App = () => {
  return (
      <div>
       <Routes>
        <Route path='/' element={<LandingPage />}/>
        <Route path='/*' element ={<NotFound/>}/>
       </Routes>
    </div>
    )    
}

export default App
