import { useState } from 'react'
import './home.css'
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar, Chart }            from 'react-chartjs-2'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalHeader, ModalBody, Card, CardTitle, CardSubtitle, CardBody, CardText } from 'reactstrap';
import { Line } from 'react-chartjs-2';
import dayjs from 'dayjs';

function Home() {

    let qtdAlertas = 0

    const startHospitals = [
        {
            nome: "Albert Einstein 1",
            data: generateRandomNums(7, 100, 200),
            powerGenerated: generatePower(),
            powerConsumed: generatePower(),
        },
        {
            nome: "Albert Einstein 2",
            data: generateRandomNums(7, 80, 210),
            powerGenerated: generatePower(),
            powerConsumed: generatePower(),
        },
        {
            nome: "Sírio Libanês 1",
            data: generateRandomNums(7, 120, 180),
            powerGenerated: generatePower(),
            powerConsumed: generatePower(),
        },
        {
            nome: "São Luíz 1",
            data: generateRandomNums(7, 50, 150),
            powerGenerated: generatePower(),
            powerConsumed: generatePower(),
        }
    ]

    const [modal, setModal] = useState(true);
    const toggleModal = () => setModal(!modal);
    const dataRange = 7;
    let num = 0;

    const date = dayjs()

    const labels1 = []
    while(num < dataRange){
        labels1.push(`${date.subtract(dataRange-num, "days").get("date")}/${date.subtract(dataRange-num, "days").get("month")+1}`)
        num++
    }
    
    const data1 = {
        labels: labels1,
        datasets: startHospitals.map(item => ({
            label: item['nome'],
            data: item['data'],
            fill: false,
            borderColor: generateColor(),
            tension: 0.1,
        }))
    }

    const data2 = {
        labels: startHospitals.map(item => (item['nome'])),
        datasets: [
            {
                label: startHospitals.map(item => (item['nome'])),
                data: startHospitals.map(item => (item['powerGenerated'])),
                backgroundColor: startHospitals.map(item => (generateColor()))
            }
        ]
    }

    qtdAlertas = startHospitals.filter((item) => item.powerConsumed > item.powerGenerated).length

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
                            <CardSubtitle className="mb-2 text-muted" tag="h6">4 hospitais operando (Histórico)</CardSubtitle>
                            <Line data={data1}/>
                            <CardText className='text-center mt-2'>
                                Evolução da geração de energia (em kWh) por cada hospital móvel ao longo da última semana. O gráfico mostra a produção individual de cada unidade, permitindo identificar padrões de desempenho e possíveis quedas de eficiência.
                            </CardText>
                        </CardBody>
                    </Card>
                    <Card className='m-1 h-50 shadow rounded'>
                        <CardBody>
                            <CardTitle tag="h5">Hospitais Ativos</CardTitle>
                            <CardSubtitle className="mb-2 text-muted" tag="h6">Energia gerada na última hora:</CardSubtitle>
                        </CardBody>
                    </Card>
                </div>
                <div className='col d-flex flex-column'>
                    <div className='d-flex h-50 ms-2 me-2'>
                        <div className='d-flex w-75 me-1 flex-column'>
                            <Card className='flex-fill shadow rounded'>
                                <CardBody>
                                    <CardTitle tag="h5">Energia média gerada</CardTitle>
                                    <CardSubtitle className="mb-2 text-muted" tag="h6">Energia média sendo gerada por hora:</CardSubtitle>
                                    <CardText className='fw-bold'>{startHospitals.reduce((soma, item) => soma + item.powerGenerated, 0)} kW / h</CardText>
                                </CardBody>
                            </Card>
                            <Card className='mt-1 flex-fill shadow rounded'>
                                <CardBody>
                                    <CardTitle tag="h5">Energia média consumida</CardTitle>
                                    <CardSubtitle className="mb-2 text-muted" tag="h6">Energia média consumida por hora:</CardSubtitle>
                                    <CardText className='fw-bold'>{startHospitals.reduce((soma, item) => soma + item.powerConsumed, 0)} kW / h</CardText>
                                </CardBody>
                            </Card>
                        </div>
                        <Card className='card-scroll shadow rounded w-75'>
                            <CardBody>
                                <div className='card-title'>
                                    <CardTitle className='text-danger' tag="h5">Alertas Principais</CardTitle>
                                    <CardSubtitle className="mb-2 text-warning" tag="h6">{qtdAlertas} alertas..</CardSubtitle>
                                </div>
                                <CardText className='text-scroll'>
                                    {startHospitals.map((item) => (
                                        <p className={item.powerConsumed > item.powerGenerated ? `` : `d-none`}>Hospital <strong>{item.nome}</strong> está consumindo mais energia do que produzindo!</p>
                                    ))}
                                </CardText>
                            </CardBody>
                        </Card>
                    </div>
                    <div className='h-100'>
                        <Card className='shadow rounded h-100 m-2'>
                            <CardBody className='h-100 d-flex flex-column'>
                                <CardTitle tag="h5">Geração de energia na última hora</CardTitle>
                                <CardSubtitle className="mb-2 text-muted" tag="h6">Todos os hospitais ativos..</CardSubtitle>
                                <div className='h-100'>
                                    <Bar className='img-fluid' data={data2} options={{indexAxis: `y`}} />
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

function generateRandomNums(qtd, min, max) {
    let numeros = [];
    for (let i = 0; i < qtd; i++) {
        let numero = Math.floor(Math.random() * (max - min + 1)) + min;
        numeros.push(numero);
    }
    return numeros;
}

function generateColor() {
    let cor = "#";
    let caracteres = "0123456789ABCDEF";

    do {
        cor = "#";
        for (let i = 0; i < 6; i++) {
            cor += caracteres[Math.floor(Math.random() * 16)];
        }
    } while (cor >= "#DDDDDD");

    return cor;
}

function generatePower() {
    const horaAtual = new Date().getHours();
    let potencia;

    if (horaAtual >= 6 && horaAtual < 10) {
        // Manhã - Produção moderada
        potencia = Math.floor(Math.random() * (300 - 100 + 1)) + 100;
    } else if (horaAtual >= 10 && horaAtual < 16) {
        // Meio-dia - Produção máxima
        potencia = Math.floor(Math.random() * (800 - 400 + 1)) + 400;
    } else if (horaAtual >= 16 && horaAtual < 19) {
        // Tarde - Produção começa a diminuir
        potencia = Math.floor(Math.random() * (400 - 100 + 1)) + 100;
    } else {
        // Noite - Quase sem produção (exceto painéis com bateria)
        potencia = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
    }

    return potencia
}

export default Home
