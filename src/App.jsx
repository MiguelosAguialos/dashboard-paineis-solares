import { useState } from 'react'
import './App.css'
import Menu from './components/sideMenu'
import { Outlet } from 'react-router-dom' 
import dayjs from "dayjs";

import {
  generateRandomNums,
  generatePower,
  generateTemperature,
} from "./utils/dataGenerators";

function App() {
  const date = dayjs();
  const [hospitais, setHospitais] = useState([
    {
      id: 1,
      nome: "Albert Einstein 1",
      localizacao: "São Paulo - SP",
      data: generateRandomNums(7, 100, 200),
      powerGenerated: generatePower(),
      powerConsumed: generatePower(),
      status: true,
      lastDate: dayjs().subtract(10, 'days').format('YYYY-MM-DD'),
      temperature: generateTemperature(),
      batteryLevel: Math.floor(Math.random() * 80) + 20,
    },
    {
      id: 2,
      nome: "Albert Einstein 2",
      localizacao: "São Paulo - SP",
      data: generateRandomNums(7, 80, 210),
      powerGenerated: generatePower(),
      powerConsumed: generatePower(),
      status: true,
      lastDate: dayjs().subtract(5, 'days').format('YYYY-MM-DD'),
      temperature: generateTemperature(),
      batteryLevel: Math.floor(Math.random() * 80) + 20,
    },
    {
      id: 3,
      nome: "Sírio Libanês 1",
      localizacao: "São Paulo - SP",
      data: generateRandomNums(7, 120, 180),
      powerGenerated: generatePower(),
      powerConsumed: generatePower(),
      status: false,
      lastDate: dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
      temperature: generateTemperature(),
      batteryLevel: Math.floor(Math.random() * 80) + 20,
    },
    {
      id: 4,
      nome: "São Luíz 1",
      localizacao: "São Paulo - SP",
      data: generateRandomNums(7, 50, 150),
      powerGenerated: generatePower(),
      powerConsumed: generatePower(),
      status: true,
      lastDate: dayjs().subtract(90, 'days').format('YYYY-MM-DD'),
      temperature: generateTemperature(),
      batteryLevel: Math.floor(Math.random() * 80) + 20,
    },
  ]);

  return (
    <div className="app-container d-flex vh-100">
      <Menu />
      <main className="flex-grow-1 overflow-auto p-4">
        <Outlet context={{hospitais, setHospitais, date}} />
      </main>
    </div>
  )
}

export default App
