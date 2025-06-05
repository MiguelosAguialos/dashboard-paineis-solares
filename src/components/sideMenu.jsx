import { useState } from 'react'
import './sideMenu.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { TfiAlignLeft } from "react-icons/tfi";
import { TfiClose } from 'react-icons/tfi';
import { GoPlusCircle } from "react-icons/go";
import { TbClipboardData } from "react-icons/tb";
import { GoHome } from "react-icons/go";
import { NavLink } from 'react-router';
import { useLocation } from 'react-router';


function Menu() {
  const [visible, setVisible] = useState(true)
  const location = useLocation()

  const handleMenu = () => {
    setVisible(!visible)
  }

  const items = [
    {
        id: '1',
        icon: GoHome,
        text: 'HOME',
        location: '/'
    },
    {
        id: '2',
        icon: GoPlusCircle,
        text: 'Adicionar',
        location: '/adicionar'
    },
    {
        id: '3',
        icon: TbClipboardData,
        text: 'Gerenciar',
        location: '/gerenciar'
    }
  ]

  return (
    <>
        <div className={`sidemenu d-flex flex-column align-items-center p-4 ${visible ? 'col-1' : 'col-2'}`}>
            <TfiAlignLeft role='button' className={`sidemenu-icon ${visible ? '' : 'd-none'}`} onClick={handleMenu} size={'1.8rem'} />
            <TfiClose role='button' className={`sidemenu-icon ${visible ? 'd-none' : ''}`} onClick={handleMenu} size={'1.8rem'} />
            <div className='d-flex flex-column h-100 w-100 align-items-center mt-5'>
            {
                items.map((item, index) => (
                    <div className={`w-100 ${location.pathname == item.location && !visible ? 'border-start border-primary border-2' : ''}`}>
                        <NavLink key={item.id} to={item.location} className={`d-flex w-100 p-2 align-items-center justify-content-center link-underline link-underline-opacity-0 ${location.pathname == item.location ? '' : 'link-dark'}`}>
                            <item.icon size={'1.8rem'} />
                            <p className={`icon-text ms-2 mb-0 fw-bold ${visible ? 'd-none' : ''}`}>{item.text}</p>
                        </NavLink>
                    </div>
                ))
            }
            </div>
        </div>
    </>
  )
}

export default Menu
