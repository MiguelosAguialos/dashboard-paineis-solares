import { useState } from 'react'
import './home.css'
import Menu from '../components/sideMenu'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

function Home() {
    const [modal, setModal] = useState(true);
    const toggleModal = () => setModal(!modal);

  return (
    <>
        <div className='col p-2'>
            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader className='text-primary' toggle={toggleModal}>Bem vindo!</ModalHeader>
                <ModalBody>
                    Este projeto tem como objetivo demonstrar, de forma prática e simples, a utilidade de um gerenciador de painéis solares para hospitais móveis. 
                    Ter um sistema para controlar os equipamentos é essencial, pois pode <strong>prever possíveis problemas</strong> e ter o <strong>melhor rendimento</strong> possível!
                </ModalBody>
            </Modal>
            <h1 className='text-primary'>DASHBOARD</h1>
            <div>
            </div>
        </div>
    </>
  )
}

export default Home
