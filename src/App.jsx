import { useState } from 'react'
import './App.css'
import Menu from './components/sideMenu'
import { Outlet } from 'react-router-dom' 

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app-container d-flex vh-100">
      <Menu />
      <main className="flex-grow-1 overflow-auto p-4">
        <Outlet />
      </main>
    </div>
  )
}

export default App
