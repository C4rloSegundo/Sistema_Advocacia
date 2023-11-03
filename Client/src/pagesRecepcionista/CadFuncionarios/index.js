import { Select } from "antd";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import VerFuncionarios from "../../components/Recepcionista/VizualizarFuncionarios/verFuncionarios";

const { Option } = Select;

export default function CadFuncionarios() {
  const [values, setValues] = useState();
  const [listFuncionarios, setListFuncionarios] = useState([]);
  const [listAdvogados, setListAdvogados] = useState([]);
  const [listRecepcionistas, setListRecepcionistas] = useState([]);

  useEffect(() => {
    fetchFuncionarios();
  }, []);

  const fetchFuncionarios = () => {
    Axios.get("http://localhost:3001/getFuncionarios")
      .then((response) => {
        setListFuncionarios(response.data);
        filterFuncionarios(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filterFuncionarios = (funcionarios) => {
    const advogados = funcionarios.filter(
      (funcionario) => funcionario.perfil === "advogado"
    );
    const recepcionistas = funcionarios.filter(
      (funcionario) => funcionario.perfil === "recepcionista"
    );

    setListAdvogados(advogados);
    setListRecepcionistas(recepcionistas);
  };

  const handleRegister = () => {
    if (values.perfil === "advogado") {
      handleRegisterAdvogados();
    } else if (values.perfil === "recepcionista") {
      handleRegisterRecepcionistas();
    }
  };

  const handleRegisterAdvogados = () => {
    document.location.reload();
    Axios.post("http://localhost:3001/registerAdvogados", values)
      .then(() => {
        fetchFuncionarios();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRegisterRecepcionistas = () => {
    document.location.reload();
    Axios.post("http://localhost:3001/registerRecepcionistas", values)
      .then(() => {
        fetchFuncionarios();
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
        <h4 className="title-cadfuncionario">Cadastro de Funcionários</h4>

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

        <div className="row g-3 cadcliente-row1">
          <Select
            placeholder="Selecione o Perfil"
            className="register--input"
            onChange={(value) => handleAddValues("perfil", value)}
          >
            <Option value="">Selecione o perfil</Option>
            <Option value="advogado">Advogado</Option>
            <Option value="recepcionista">Recepcionista</Option>
          </Select>
        </div>

        <div>
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

            <div className="col-sm">
              {values?.perfil === "advogado" && (
                <input
                  type="text"
                  name="numOAB"
                  placeholder="Número da OAB"
                  className="form-control"
                  onChange={(e) => handleAddValues("numOAB", e.target.value)}
                />
              )}
            </div>
          </div>
        </div>

        {/* Botão Cadastrar */}
        <div className="d-grid gap-2 col-3 mx-auto">
          <button
            className="btn btn-primary botao-cadastrar"
            type="Subimit"
            onClick={handleRegister}
          >
            Cadastrar
          </button>
        </div>
      </div>

      {/* Listar advogados */}
      <h4
        style={{
          marginTop: 15,
          backgroundColor: "rgba(22, 119, 255, 0.4)",
          color: "#ffffff",
          padding: 5,
          borderRadius: 5,
          textAlign: "center",
        }}
      >
        Advogados
      </h4>
      {listAdvogados.map((value) => (
        <VerFuncionarios
          listFuncionarios={listFuncionarios}
          setListFuncionarios={setListFuncionarios}
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

      {/* Listar recepcionistas */}
      <h4
        style={{
          marginTop: 15,
          backgroundColor: "rgba(22, 119, 255, 0.4)",
          color: "#ffffff",
          padding: 5,
          borderRadius: 5,
          textAlign: "center",
        }}
      >
        Recepcionistas
      </h4>
      
      {listRecepcionistas.map((value) => (
        <VerFuncionarios
          listFuncionarios={listFuncionarios}
          setListFuncionarios={setListFuncionarios}
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
