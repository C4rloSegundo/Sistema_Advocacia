import { Typography, Input, Button } from "antd";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import VerFuncionarios from "../../components/Advogado/VizualizarFuncionarios/verFuncionarios";

const { Title } = Typography;

export default function CadFuncionarios() {
  const [values, setValues] = useState({
    perfil: "recepcionista",
  });
  const [listRecepcionistas, setListRecepcionistas] = useState([]);
  const idAdvogado = window.localStorage.getItem("userId");
  const nomeAdvogado = window.localStorage.getItem("userName");

  useEffect(() => {
    fetchRecepcionistas();
  }, []);

  const fetchRecepcionistas = () => {
    Axios.get(`http://localhost:3001/getRecepcionistas?idAdvogado=${idAdvogado}`)
      .then((response) => {
        setListRecepcionistas(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRegister = () => {
    const data = {
      ...values,
      id_advogado: idAdvogado,
      nome_advogado: nomeAdvogado,
    };

    Axios.post("http://localhost:3001/registerRecepcionistasAdv", data)
      .then(() => {
        fetchRecepcionistas();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddValues = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <div className="app--container">
      <div className="register--container">
        <Title level={4} className="title-cadcliente">
          Cadastro de Clientes
        </Title>
        <div className="row">
          <div className="mb-3">
            <input
              type="text"
              name="nome"
              className="form-control"
              placeholder="Nome completo"
              onChange={(e) => handleAddValues("nome", e.target.value)}
            />
          </div>
        </div>
        <div>

          <div>
          <Input value={values.perfil} disabled />
          </div>
          
          <div className="row g-3">            
            <div className="col-sm">
              <input
                type="text"
                name="email"
                className="form-control"
                placeholder="Email"
                onChange={(e) => handleAddValues("email", e.target.value)}
              />
            </div>
            <div className="col-sm">
              <input
                type="text"
                name="senha"
                className="form-control"
                placeholder="Senha"
                onChange={(e) => handleAddValues("senha", e.target.value)}
              />
            </div>
            <div className="col-sm">
              <input
                type="text"
                name="telefone"
                className="form-control"
                placeholder="Telefone"
                onChange={(e) => handleAddValues("telefone", e.target.value)}
              />
            </div>
          </div>
        </div>
        {/* Botão Cadastrar */}
        <div className="d-grid gap-2 col-3 mx-auto"
          style={{ marginTop: 20 }}>
          <button
            type="submit"
            onClick={handleRegister}
            className="btn btn-primary"
            style={{fontWeight: 500}}
          >
            Cadastrar
          </button>
        </div>
      </div>

      {/* Listar recepcionistas */}
      <Title
        level={4}
        style={{
          marginTop: 20,
          backgroundColor: "rgba(22, 119, 255, 0.4)",
          color: "#ffffff",
          padding: 5,
          borderRadius: 5,
          textAlign: "center",
        }}
      >
        Funcionários
      </Title>

      {listRecepcionistas.map((value) => (
        <VerFuncionarios
          listFuncionarios={listRecepcionistas}
          setListFuncionarios={setListRecepcionistas}
          key={value.id}
          id={value.id}
          nome={value.nome}
          perfil={value.perfil}
          numOAB={value.numOAB}
          email={value.email}
          senha={value.senha}
          telefone={value.telefone}
        />
      ))}

    </div>
  );
}
