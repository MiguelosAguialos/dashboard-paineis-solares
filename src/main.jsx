import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './home/home.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Gerenciar from './gerenciar/Gerenciar.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Home />}></Route>
          <Route path='gerenciar' element={<Gerenciar />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
