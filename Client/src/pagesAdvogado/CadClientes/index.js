import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Upload } from "antd";
import VerClientes from "../../components/Advogado/VizualizarClientes/verClientes";


export default function CadClientes() {
  const [values, setValues] = useState({});
  const [listClientes, setListClientes] = useState([]);
  const [listAdvogados, setListAdvogados] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);
  //pegar o id e o nome de quem ta logado 
  const idAdvogado = window.localStorage.getItem("userId");
  const nomeAdvogado = window.localStorage.getItem("userName");

  const handleFileUpload = (file) => {
    setUploadedFile(file);
    setValues((prevValues) => ({
      ...prevValues,
      arquivo: file,
    }));
  };

  const handleRegisterClientes = () => {
    const formData = new FormData();
    formData.append("nome", values.nome);
    formData.append("cpf", values.cpf);
    formData.append("nacionalidade", values.nacionalidade);
    formData.append("estadoCivil", values.estadoCivil);
    formData.append("profissao", values.profissao);
    formData.append("endereco", values.endereco);
    formData.append("dataNascimento", values.dataNascimento);
    formData.append("telefone", values.telefone);
    formData.append("celular", values.celular);
    formData.append("email", values.email);
    formData.append("id_advogado", idAdvogado);
    formData.append("nome_advogado", nomeAdvogado);
    formData.append("arquivo", uploadedFile);

    Axios.post("http://localhost:3001/registerClientes", formData).then(() => {
      Axios.post("http://localhost:3001/searchClientes", {
        nome: values.nome,
        cpf: values.cpf,
        nacionalidade: values.nacionalidade,
        estadoCivil: values.estadoCivil,
        profissao: values.profissao,
        endereco: values.endereco,
        dataNascimento: values.dataNascimento,
        telefone: values.telefone,
        celular: values.celular,
        email: values.email,
      }).then((response) => {
        if (response.data[0]) {
          setListClientes([
            ...listClientes,
            {
              id: response.data[0].id,
              nome: values.nome,
              cpf: values.cpf,
              nacionalidade: values.nacionalidade,
              estadoCivil: values.estadoCivil,
              profissao: values.profissao,
              endereco: values.endereco,
              dataNascimento: values.dataNascimento,
              telefone: values.telefone,
              celular: values.celular,
              email: values.email,
            },
          ]);
        }
      });
    });
  };

  useEffect(() => {
    //usar isso para agenda
    Axios.get(`http://localhost:3001/getClientesAdv?idAdvogado=${idAdvogado}`)
      .then((response) => {
        setListClientes(response.data);
      });
    Axios.get("http://localhost:3001/getAdvogados").then((response) => {
      setListAdvogados(response.data);
    });
  }, []);

  const handleAddValues = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <div className="app--container cadastro-box">
      <div className="register--container cadcliente">
      <h4 className="title-cadcliente">
          Cadastro de Clientes
        </h4>       
        <div className="row g-3 cadcliente-row1">
          <div className="col-sm-7">
            <input
              type="text"
              name="nome"
              className="form-control register--input"
              placeholder="Nome completo"
              onChange={handleAddValues}

            />
          </div>
          <div className="col-sm">
            <input
              type="text"
              name="cpf"
              className="form-control register--input"
              placeholder="CPF"
              onChange={handleAddValues}
            />
          </div>
          <div className="col-sm">
            <input
              type="text"
              name="nacionalidade"
              className="form-control register--input"
              placeholder="Nacionalidade"
              onChange={handleAddValues}
            />
          </div>
        </div>

        <div className="row g-3 cadcliente-row1">
          <div className="col-sm">
            <input
              type="text"
              name="estadoCivil"
              className="form-control"
              placeholder="Estado civil"
              onChange={handleAddValues}
            />
          </div>
          <div className="col-sm">
            <input
              type="text"
              name="profissao"
              className="form-control"
              placeholder="Profissão"
              onChange={handleAddValues}
            />
          </div>
          <div className="col-sm">
            <input
              type="text"
              name="endereco"
              className="form-control"
              placeholder="Endereço"
              onChange={handleAddValues}
            />
          </div>
        </div>

        <div className="row g-3 cadcliente-row1">
          <div className="col-sm">
            <input
              type="date"
              name="dataNascimento"
              placeholder="Data de nascimento"
              className="register--input form-control"
              onChange={handleAddValues}
            />
          </div>
          <div className="col-sm">
            <input
              type="phone"
              name="telefone"
              placeholder="Telefone"
              className="register--input form-control"
              onChange={handleAddValues}
            />
          </div>
          <div className="col-sm">
            <input
              type="phone"
              name="celular"
              placeholder="Celular"
              className="register--input form-control"
              onChange={handleAddValues}
            />
          </div>
          <div className="col-sm">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="register--input form-control"
              onChange={handleAddValues}
            />
          </div>
        </div>

        <div className="row g-3 cadcliente-row1">
          <div className="col-auto">
            <Upload
              name="arquivo"
              accept=".pdf,.doc,.docx,.jpg,.png"
              beforeUpload={() => false}
              onChange={(info) => handleFileUpload(info.file)}
            >
              <button className="cadcliente--button btn btn-primary">
                Anexar Documento
              </button>
            </Upload>
          </div>
          
        </div>
        <div className="d-grid gap-2 col-3 mx-auto">
            <button
              type="submit"
              className="btn btn-primary botãocliente"
              onClick={() =>
                handleRegisterClientes(idAdvogado, nomeAdvogado)
              }
            >
              Cadastrar
            </button>
          </div>
      </div>

      <h4 style={{ 
        marginTop: 15, 
        backgroundColor: "rgba(22, 119, 255, 0.4)",
        color: "#ffffff",
        padding: 5,
        borderRadius: 5, 
        textAlign: "center" }}>Clientes</h4>

      {/* listar os clientes */}
      {listClientes.map((value) => (
        <VerClientes
          listClientes={listClientes}
          setListClientes={setListClientes}
          key={value.id}
          id={value.id}
          nome={value.nome}
          cpf={value.cpf}
          nacionalidade={value.nacionalidade}
          estadoCivil={value.estadoCivil}
          profissao={value.profissao}
          endereco={value.endereco}
          dataNascimento={value.dataNascimento}
          telefone={value.telefone}
          celular={value.celular}
          email={value.email}
        />
      ))}
    </div>
  );
}
