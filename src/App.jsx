import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Menu from './components/sideMenu'
import { Outlet } from 'react-router'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='row vh-100 p-0 m-0'>
        <Menu />
        <Outlet />
      </div>
    </>
  )
}

export default App
