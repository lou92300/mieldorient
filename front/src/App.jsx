import { useState } from 'react'
import Header from "./containers/Header"
import Router from './Router'
import Footer from "./containers/Footer"


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>

      <Router/>
      
      <Footer/>
    </>
  )
}

export default App
