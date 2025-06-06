import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Button, Alert } from "reactstrap";
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

function AdicionarHospital({ onAdd }) {
  const [success, setSuccess] = useState(false);
  const {hospitais, setHospitais, date} = useOutletContext()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nome: "",
      localizacao: "",
      status: true,
      capacidade: "",
      consumo: "",
      bateria: 50,
      temperatura: "",
      dataInstalacao: "",
    },
  });

  const onSubmit = (data) => {
    let hospitalData = {
      ...data,
      id: hospitais.reduce((max, item) => item.id > max.id ? item : max, hospitais[0])[`id`]+1,
      powerGenerated: data.capacidade === null ? 0 : Number(data.capacidade),
      powerConsumed: data.consumo === null ? 1 : Number(data.consumo),
      batteryLevel: Number(data.bateria),
      temperature: data.temperatura === null ? 0 : Number(data.temperatura),
      data: [],
      lastDate: data.dataInstalacao
    };

    setHospitais([...hospitais, hospitalData])
    console.log(hospitais)

    // nome: "São Luíz 1",
    //   localizacao: "São Paulo - SP",
    //   data: generateRandomNums(7, 50, 150),
    //   powerGenerated: generatePower(),
    //   powerConsumed: generatePower(),
    //   status: true,
    //   lastDate: date.get("date"),
    //   temperature: generateTemperature(),
    //   batteryLevel: Math.floor(Math.random() * 80) + 20,

    if (onAdd) {
      onAdd(hospitalData);
    }
    setSuccess(true);
    reset();
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <h2>Adicionar Novo Hospital</h2>

      {success && (
        <Alert color="success" toggle={() => setSuccess(false)}>
          Hospital adicionado com sucesso!
        </Alert>
      )}

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
          {isSubmitting ? "Adicionando..." : "Adicionar Hospital"}
        </Button>
      </form>
    </div>
  );
}

export default AdicionarHospital;
