import { useState } from 'react'
import './home.css'
import Menu from '../components/sideMenu'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, ModalHeader, ModalBody, Card, CardTitle, CardSubtitle, CardBody, CardText } from 'reactstrap';

function Home() {
    const [modal, setModal] = useState(true);
    const toggleModal = () => setModal(!modal);

  return (
    <>
        <div className='col p-3 d-flex flex-column'>
            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader className='text-primary' toggle={toggleModal}>Bem vindo!</ModalHeader>
                <ModalBody>
                    Este projeto tem como objetivo demonstrar, de forma prática e simples, a utilidade de um gerenciador de painéis solares para hospitais móveis. 
                    Ter um sistema para controlar os equipamentos é essencial, pois pode <strong>prever possíveis problemas</strong> e ter o <strong>melhor rendimento</strong> possível!
                </ModalBody>
            </Modal>
            <h1 className='text-primary'>DASHBOARD</h1>
            <div className='row h-100'>
                <div className='col-5 d-flex flex-column justify-content-around'>
                    <Card className='m-1 flex-fill shadow rounded'>
                        <CardBody>
                            <CardTitle tag="h5">Hospitais Ativos</CardTitle>
                            <CardSubtitle className="mb-2 text-muted" tag="h6">12 hospitais operando</CardSubtitle>
                            <img src="" alt="" />
                            <CardText>
                                jdialdjaljdawldaidsjaldjada
                            </CardText>
                        </CardBody>
                    </Card>
                    <Card className='m-1 h-25 shadow rounded'>
                        <CardBody>
                            <CardTitle tag="h5">Último acesso | Informações</CardTitle>
                            <CardSubtitle className="mb-2 text-muted" tag="h6">Hospital ...</CardSubtitle>
                            <img src="" alt="" />
                            <CardText>
                                jdialdjaljdawldaidsjaldjada
                            </CardText>
                        </CardBody>
                    </Card>
                </div>
                <div className='col d-flex flex-column'>
                    <div className='d-flex h-50 ms-2 me-2'>
                        <div className='d-flex w-75 me-1 flex-column'>
                            <Card className='flex-fill shadow rounded'>
                                <CardBody>
                                    <CardTitle tag="h5">Hospitais Ativos</CardTitle>
                                    <CardSubtitle className="mb-2 text-muted" tag="h6">12 hospitais operando</CardSubtitle>
                                </CardBody>
                            </Card>
                            <Card className='mt-1 flex-fill shadow rounded'>
                                <CardBody>
                                    <CardTitle tag="h5">Hospitais Ativos</CardTitle>
                                    <CardSubtitle className="mb-2 text-muted" tag="h6">12 hospitais operando</CardSubtitle>
                                </CardBody>
                            </Card>
                        </div>
                        <Card className='shadow rounded w-75'>
                            <CardBody>
                                <CardTitle tag="h5">Último acesso | Informações</CardTitle>
                                <CardSubtitle className="mb-2 text-muted" tag="h6">Hospital ...</CardSubtitle>
                                <img src="" alt="" />
                                <CardText>
                                    jdialdjaljdawldaidsjaldjada
                                </CardText>
                            </CardBody>
                        </Card>
                    </div>
                    <div className='h-100 flex-shrink-1'>
                        <Card className='shadow rounded h-100 m-2'>
                            <CardBody>
                                <CardTitle tag="h5">Último acesso | Informações</CardTitle>
                                <CardSubtitle className="mb-2 text-muted" tag="h6">Hospital ...</CardSubtitle>
                                <img src="" alt="" />
                                <CardText>
                                    jdialdjaljdawldaidsjaldjada
                                </CardText>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Home
