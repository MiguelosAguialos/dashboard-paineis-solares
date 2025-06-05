import { useState } from 'react'
import './home.css'
import Menu from '../components/sideMenu'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';

function Home() {
  return (
    <>
        <div className='row vh-100 p-0 m-0'>
            <Menu />
            <div className='col p-2'>
                <h1 className='text-primary'>DASHBOARD</h1>
                <div>
                    
                </div>
            </div>
        </div>
    </>
  )
}

export default Home
