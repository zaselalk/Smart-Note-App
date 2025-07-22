import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './screens/Home'
import { BrowserRouter, Route, Routes } from 'react-router'
import NewNote from './screens/NewNote'

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <Routes>

      <Route index element={<Home/>} />
      <Route path='new-note' element={<NewNote/>} />

    </Routes>
  </BrowserRouter>
)