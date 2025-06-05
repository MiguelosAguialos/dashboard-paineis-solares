import { useState } from 'react'
import './gerenciar.css'
import Menu from '../components/sideMenu'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';

function Gerenciar() {
  return (
    <>
        <div className='row vh-100 p-0 m-0'>
            <Menu />
            <div className='col p-2'>
                <h1 className='text-primary'>GERENCIAR</h1>
                <div>
                    
                </div>
            </div>
        </div>
    </>
  )
}

export default Gerenciar
