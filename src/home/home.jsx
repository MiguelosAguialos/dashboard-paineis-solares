import React, { useState } from "react";
import dayjs from "dayjs";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import {
  Modal,
  ModalHeader,
  ModalBody,
  Card,
  CardTitle,
  CardSubtitle,
  CardBody,
  CardText,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  generateRandomNums,
  generateColor,
  generatePower,
  generateTemperature,
} from "../utils/dataGenerators";
import { useOutletContext } from "react-router";

function Home() {
  const date = dayjs();
  const [modal, setModal] = useState(true);
  const toggleModal = () => setModal(!modal);

  const {hospitais, setHospitais} = useOutletContext();

  const temperaturaMedia =
    hospitais.reduce((soma, h) => soma + (h.temperature ?? 0), 0) /
    hospitais.length;

  let tempStatusTexto = "Normal";
  let tempStatusClasse = "text-success";
  if (temperaturaMedia > 50) {
    tempStatusTexto = "Crítico";
    tempStatusClasse = "text-danger";
  } else if (temperaturaMedia > 40) {
    tempStatusTexto = "Atenção";
    tempStatusClasse = "text-warning";
  }

  const dataRange = 7;
  const labels1 = [];
  for (let i = 0; i < dataRange; i++) {
    const day = date.subtract(dataRange - i, "days");
    labels1.push(`${day.get("date")}/${day.get("month") + 1}`);
  }

  const data1 = {
    labels: labels1,
    datasets: hospitais.map((item) => ({
      label: item.nome,
      data: item.data,
      fill: false,
      borderColor: generateColor(),
      tension: 0.1,
    })),
  };

  const activeHospitals = hospitais.filter((item) => item.status);

  const qtdAlertas =
    hospitais.filter((item) => item.powerConsumed > item.powerGenerated)
      .length + hospitais.filter((item) => !item.status).length;

  return (
    <>
      <div className="col p-3 d-flex flex-column">
        <Modal isOpen={modal} toggle={toggleModal}>
          <ModalHeader className="text-primary" toggle={toggleModal}>
            Bem vindo!
          </ModalHeader>
          <ModalBody>
            Este projeto tem como objetivo demonstrar, de forma prática e
            simples, a utilidade de um gerenciador de painéis solares para
            hospitais móveis. Ter um sistema para controlar os equipamentos é
            essencial, pois pode <strong>prever possíveis problemas</strong> e
            ter o <strong>melhor rendimento</strong> possível!
          </ModalBody>
        </Modal>

        <h1 className="text-primary">DASHBOARD</h1>

        <div className="row" style={{ height: "100%" }}>
          {/* Coluna esquerda */}
          <div className="col-5 d-flex flex-column" style={{ gap: "1rem" }}>
            <Card className="shadow rounded" style={{ minHeight: "360px", marginBottom: "1rem" }}>
              <CardBody>
                <CardTitle tag="h5">Hospitais Ativos</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  {hospitais.length} hospitais operando (Histórico)
                </CardSubtitle>
                <Line data={data1} key={JSON.stringify(data1)} />
                <CardText className="text-center mt-2">
                  Evolução da geração de energia (em kWh) por cada hospital móvel ao longo da última semana.
                  O gráfico mostra a produção individual de cada unidade, permitindo identificar padrões de desempenho e possíveis quedas de eficiência.
                </CardText>
              </CardBody>
            </Card>

            <Card className="shadow rounded" style={{ marginBottom: "1rem" }}>
              <CardBody>
                <CardTitle tag="h5">Resumo Operacional dos Hospitais</CardTitle>
                <CardSubtitle className="mb-1 text-muted" tag="h6">
                  Indicadores de desempenho e atualização
                </CardSubtitle>

                {/* Temperatura média */}
                <p className={`mb-1 fw-bold ${tempStatusClasse}`}>
                  🌡️ Temperatura média atual: {temperaturaMedia.toFixed(1)}°C - {tempStatusTexto}
                </p>

                {/* Bateria média */}
                {(() => {
                  const batteryAvg =
                    hospitais.reduce((soma, h) => soma + (h.batteryLevel ?? 80), 0) / hospitais.length;

                  let batteryClass = "text-success";
                  if (batteryAvg < 40) batteryClass = "text-danger";
                  else if (batteryAvg < 60) batteryClass = "text-warning";

                  return (
                    <p className={`mb-1 fw-bold ${batteryClass}`}>
                      🔋 Nível médio das baterias: {batteryAvg.toFixed(1)}%
                    </p>
                  );
                })()}

                {/* Eficiência média */}
                {(() => {
                  const efficiencyAvg =
                    (hospitais.reduce((soma, h) => soma + h.powerGenerated / h.powerConsumed, 0) /
                      hospitais.length) * 100;

                  let efficiencyClass = "text-success";
                  if (efficiencyAvg < 80) efficiencyClass = "text-warning";
                  if (efficiencyAvg < 60) efficiencyClass = "text-danger";

                  return (
                    <p className={`mb-1 fw-bold ${efficiencyClass}`}>
                      ⚡ Eficiência média dos painéis: {efficiencyAvg.toFixed(1)}%
                    </p>
                  );
                })()}

                {/* Latência média */}
                {(() => {
                  const latencyAvg =
                    hospitais.reduce((soma, h) => soma + (date.get("date") - h.lastDate), 0) /
                    hospitais.length;

                  let latencyClass = "text-success";
                  if (latencyAvg > 1) latencyClass = "text-warning";
                  if (latencyAvg > 2) latencyClass = "text-danger";

                  return (
                    <p className={`mb-0 fw-bold ${latencyClass}`}>
                      ⏱️ Latência média de dados: {latencyAvg.toFixed(1)} dia(s)
                    </p>
                  );
                })()}
              </CardBody>
            </Card>
          </div>

          {/* Coluna direita */}
          <div className="col d-flex flex-column" style={{ gap: "1rem" }}>
            <div className="d-flex" style={{ gap: "1rem" }}>
              <div className="d-flex flex-column w-75" style={{ gap: "1rem" }}>
                <Card className="shadow rounded" style={{ minHeight: "160px", marginBottom: "1rem" }}>
                  <CardBody>
                    <CardTitle tag="h5">Energia média gerada</CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                      Energia média sendo gerada por hora:
                    </CardSubtitle>
                    <CardText className="fw-bold">
                      {activeHospitals.reduce((soma, item) => soma + item.powerGenerated, 0)} kW / h
                    </CardText>
                  </CardBody>
                </Card>

                <Card className="shadow rounded" style={{ minHeight: "160px", marginBottom: "1rem" }}>
                  <CardBody>
                    <CardTitle tag="h5">Energia média consumida</CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                      Energia média consumida por hora:
                    </CardSubtitle>
                    <CardText className="fw-bold">
                      {activeHospitals.reduce((soma, item) => soma + item.powerConsumed, 0)} kW / h
                    </CardText>
                  </CardBody>
                </Card>
              </div>

              <Card className="card-scroll shadow rounded w-75" style={{ minHeight: "320px", marginBottom: "1rem" }}>
                <CardBody>
                  <CardTitle className="text-danger" tag="h5">
                    Alertas Principais
                  </CardTitle>
                  <CardSubtitle className="mb-2 text-warning" tag="h6">
                    {qtdAlertas} alertas..
                  </CardSubtitle>
                  <CardText className="text-scroll">
                    {hospitais.filter(item => item.status).map((item) =>
                      item.powerConsumed > item.powerGenerated ? (
                        <div key={`alert-consume-${item.nome}`}>
                          Hospital <strong>{item.nome}</strong> está consumindo mais energia do que produzindo!
                        </div>
                      ) : null
                    )}
                    {hospitais.map((item) =>
                      !item.status ? (
                        <div key={`alert-status-${item.nome}`} className="text-danger fw-bold">
                          Painel solar do Hospital <strong>{item.nome}</strong> está inativo!
                        </div>
                      ) : null
                    )}
                  </CardText>
                </CardBody>
              </Card>
            </div>

            <Card className="shadow rounded" style={{ minHeight: "320px", marginBottom: "1rem" }}>
              <CardBody className="d-flex flex-column p-5">
                <CardTitle className="text-center" tag="h5">
                  Status Operacional dos Hospitais
                </CardTitle>
                <CardSubtitle className="mb-2 text-muted text-center" tag="h6">
                  Acompanhe o status atualizado das unidades
                </CardSubtitle>
                <div className="table-responsive">
                  <table className="table table-hover align-middle text-center">
                    <thead className="table-light">
                      <tr>
                        <th>Hospital</th>
                        <th>Localização</th>
                        <th>Status Operacional</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hospitais.map((hospital) => {
                        const statusCritico = !hospital.status;
                        const statusEnergia = hospital.powerConsumed > hospital.powerGenerated;

                        let statusTexto = "Operando normalmente";
                        let statusClasse = "text-success";

                        if (statusEnergia && !statusCritico) {
                          statusTexto = "Atenção";
                          statusClasse = "text-warning";
                        } else if (statusCritico) {
                          statusTexto = "Crítico";
                          statusClasse = "text-danger";
                        }

                        return (
                          <tr key={hospital.nome}>
                            <td>{hospital.nome}</td>
                            <td>{hospital.localizacao}</td>
                            <td className={statusClasse}>{statusTexto}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardBody>
            </Card>

          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
