import React from 'react'
import { Routes ,Route} from 'react-router-dom'
import Article from './pages/Article'


export default function Router() {
  return (
  <Routes>
    <Route path="article" element={<Article/>} />
  </Routes>
  )
}
