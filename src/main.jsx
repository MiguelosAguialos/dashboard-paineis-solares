import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './home/home.jsx'
import Gerenciar from './components/gerenciar/gerenciar.jsx'
import Adicionar from './components/adicionar-hospital/AdicionarHospital.jsx'  
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'  

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Home />} />
          <Route path='gerenciar' element={<Gerenciar />} />
          <Route path='adicionar' element={<Adicionar />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
