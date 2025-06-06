import React, { useState } from "react";
import dayjs from "dayjs";
import { Line } from "react-chartjs-2";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

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
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardTitle,
  CardSubtitle,
  CardBody,
  CardText,
  Button,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  generateRandomNums,
  generateColor,
  generatePower,
  generateTemperature,
} from "../../utils/dataGenerators";
import { useOutletContext } from "react-router";

const schema = yup.object().shape({
  nome: yup.string().trim().required("Nome do hospital é obrigatório."),
  localizacao: yup.string().trim().required("Localização é obrigatória."),
  status: yup.boolean(),
  capacidade: yup
    .number()
    .typeError("Capacidade deve ser um número.")
    .positive("Capacidade deve ser positiva.")
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value)),
  consumo: yup
    .number()
    .typeError("Consumo deve ser um número.")
    .positive("Consumo deve ser positivo.")
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value)),
  bateria: yup
    .number()
    .required()
    .min(0, "Bateria deve estar entre 0 e 100.")
    .max(100, "Bateria deve estar entre 0 e 100."),
  temperatura: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .min(-50, "Temperatura deve estar entre -50 e 100.")
    .max(100, "Temperatura deve estar entre -50 e 100."),
  dataInstalacao: yup.string().required("Data de instalação é obrigatória."),
});

function Gerenciar() {
  const {hospitais, setHospitais, date} = useOutletContext()
  const [selectedHospital, setSelectedHospital] = useState(hospitais[0])
  const [preSelectedHospital, setPreSelectedHospital] = useState(selectedHospital)
  const [modal, setModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const toggle = () => setModal(!modal);

  const handlePreSelectHospital = (hospital) => {
    setPreSelectedHospital(hospital)
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nome: selectedHospital['nome'],
      localizacao: selectedHospital['localizacao'],
      status: selectedHospital['status'],
      capacidade: "",
      consumo: "",
      bateria: selectedHospital['batteryLevel'],
      temperatura: selectedHospital['temperature'],
      dataInstalacao: selectedHospital['lastDate'],
    },
  });

  const saveSelectedHospital = () => {
    setSelectedHospital(preSelectedHospital)
    console.log(preSelectedHospital)
    reset({
      nome: preSelectedHospital['nome'],
      localizacao: preSelectedHospital['localizacao'],
      status: preSelectedHospital['status'],
      capacidade: "",
      consumo: "",
      bateria: preSelectedHospital['batteryLevel'],
      temperatura: preSelectedHospital['temperature'],
      dataInstalacao: preSelectedHospital['lastDate'],
    })
    toggle()
  }

  const onSubmit = (data) => {
    let hospitalData = {
      nome: data.nome,
      localizacao: data.localizacao,
      status: data.status,
      dataInstalacao: selectedHospital['lastDate'],
      powerGenerated: data.capacidade === null ? 0 : Number(data.capacidade),
      powerConsumed: data.consumo === null ? 1 : Number(data.consumo),
      batteryLevel: Number(data.bateria),
      temperature: data.temperatura === null ? 0 : Number(data.temperatura),
      data: [],
      lastDate: data.dataInstalacao
    };

    setHospitais(hospitais.map(item => item.id == selectedHospital.id ? hospitalData : item))
    // nome: "São Luíz 1",
    //   localizacao: "São Paulo - SP",
    //   data: generateRandomNums(7, 50, 150),
    //   powerGenerated: generatePower(),
    //   powerConsumed: generatePower(),
    //   status: true,
    //   lastDate: date.get("date"),
    //   temperature: generateTemperature(),
    //   batteryLevel: Math.floor(Math.random() * 80) + 20,
    setSuccess(true);
  };

  return (
    <>
      <div className="col p-3 d-flex flex-column align-items-center">
        {success && (
            <Alert color="success" style={{position: 'fixed', top: 10, zIndex: '999'}} toggle={() => setSuccess(false)}>
              Atualização salva com sucesso!
            </Alert>
          )}
        <div className="d-flex w-100 justify-content-between">
          <h1 className="text-primary">GERENCIAR</h1>
          <Button className="" onClick={toggle} color="danger">Trocar Hospital</Button>
          <Modal isOpen={modal} toggle={toggle} centered>
            <ModalHeader toggle={toggle}>Escolha um Hospital</ModalHeader>
            <ModalBody>
              <ListGroup>
                {hospitais.map((item) => (
                  <ListGroupItem onClick={() => handlePreSelectHospital(item)} className={`${item['nome'] == preSelectedHospital['nome'] ? `active` : ``}`} style={{cursor: 'pointer'}} action >
                    {item.nome}
                  </ListGroupItem>
                ))}
              </ListGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={saveSelectedHospital}>
                Editar
              </Button>
              <Button color="danger" onClick={toggle}>
                Cancelar
              </Button>
            </ModalFooter>
          </Modal>
        </div>
          <Card className="mt-2 w-50">
            <CardBody>
              <CardTitle tag="h5">{selectedHospital['nome']}</CardTitle>
                <CardSubtitle className="mb-1 text-info" tag="h6">
                  Após concluir as alterações, clique em salvar
                </CardSubtitle>
                <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column gap-3" noValidate>
                  <input
                    type="text"
                    {...register("nome")}
                    className={`form-control ${errors.nome ? "is-invalid" : ""}`}
                    placeholder="Nome do Hospital"
                  />
                  {errors.nome && <div className="invalid-feedback">{errors.nome.message}</div>}

                  <input
                    type="text"
                    {...register("localizacao")}
                    className={`form-control ${errors.localizacao ? "is-invalid" : ""}`}
                    placeholder="Localização"
                  />
                  {errors.localizacao && <div className="invalid-feedback">{errors.localizacao.message}</div>}

                  <div className="form-check form-switch">
                    <input
                      type="checkbox"
                      {...register("status")}
                      className="form-check-input"
                      id="statusCheck"
                    />
                    <label htmlFor="statusCheck" className="form-check-label">
                      Status Ativo
                    </label>
                  </div>

                  <input
                    type="number"
                    {...register("capacidade")}
                    className={`form-control ${errors.capacidade ? "is-invalid" : ""}`}
                    placeholder="Capacidade (kW) - opcional"
                    min="0"
                    step="any"
                  />
                  {errors.capacidade && <div className="invalid-feedback">{errors.capacidade.message}</div>}

                  <input
                    type="number"
                    {...register("consumo")}
                    className={`form-control ${errors.consumo ? "is-invalid" : ""}`}
                    placeholder="Consumo médio (kW) - opcional"
                    min="0"
                    step="any"
                  />
                  {errors.consumo && <div className="invalid-feedback">{errors.consumo.message}</div>}

                  <label htmlFor="bateriaRange" className="form-label">
                    Nível da bateria (%): {watch("bateria")}
                  </label>
                  <input
                    type="range"
                    {...register("bateria")}
                    id="bateriaRange"
                    min="0"
                    max="100"
                    className={`form-range ${errors.bateria ? "is-invalid" : ""}`}
                  />
                  {errors.bateria && <div className="invalid-feedback">{errors.bateria.message}</div>}

                  <input
                    type="number"
                    {...register("temperatura")}
                    className={`form-control ${errors.temperatura ? "is-invalid" : ""}`}
                    placeholder="Temperatura do sistema (°C) - opcional"
                    min="-50"
                    max="100"
                    step="any"
                  />
                  {errors.temperatura && <div className="invalid-feedback">{errors.temperatura.message}</div>}

                  <label htmlFor="dataInstalacao" className="form-label">
                    Data de Instalação
                  </label>
                  <input
                    type="date"
                    {...register("dataInstalacao")}
                    id="dataInstalacao"
                    className={`form-control ${errors.dataInstalacao ? "is-invalid" : ""}`}
                  />
                  {errors.dataInstalacao && (
                    <div className="invalid-feedback">{errors.dataInstalacao.message}</div>
                  )}

                  <Button color="primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Adicionando..." : "Salvar"}
                  </Button>
                </form>
            </CardBody>
          </Card>
      </div>
    </>
  );
}

export default Gerenciar;
