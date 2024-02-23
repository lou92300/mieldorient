import { useState } from 'react'
import Header from "./containers/Header"
import Router from './Router'
import Footer from "./containers/Footer"


function App() {


  return (
    <>
      <Header/>

      <Router/>
      
      <Footer/>
    </>
  )
}

export default App
