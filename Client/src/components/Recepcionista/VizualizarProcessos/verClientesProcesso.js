import React, { useState, useEffect } from "react";
import { Button, Input, Modal, message } from "antd";
import Axios from "axios";
import FormDialog from "./popup.js";
import EditProcessoDialog from "./editProcessoPopup.js";
import { FaFolderPlus, FaEye, FaFileMedical, FaPaperclip } from "react-icons/fa";
import gerarPdf from "../../../pagesRecepcionista/CadProcuracoes/gerarPdf.jsx";


export default function VerClientesProcessos(props) {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [processos, setProcessos] = useState([]);
  const [processosCliente, setProcessosCliente] = useState([]);
  const [mostrarProcessos, setMostrarProcessos] = useState(false);
  const [processoSelecionado, setProcessoSelecionado] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const pegarProcessos = async () => {
      try {
        const response = await Axios.get("http://localhost:3001/getProcesso");
        setProcessos(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    pegarProcessos();
  }, []);

  useEffect(() => {
    const filtrarProcessosCliente = () => {
      const clienteProcessos = processos.filter(
        (processo) => processo.id_cliente === props.id
      );
      setProcessosCliente(clienteProcessos);
    };

    filtrarProcessosCliente();
  }, [processos, props.id]);

  const handleVerProcessos = () => {
    setMostrarProcessos(true);
  };

  const handleEditProcesso = (processo) => {
    setProcessoSelecionado(processo);
    setEditOpen(true);
  };

  const handleDeleteProcesso = async (processoId) => {
    try {
      await Axios.delete(`http://localhost:3001/deleteProcesso/${processoId}`);
      // Atualize a lista de processos
      const response = await Axios.get("http://localhost:3001/getProcesso");
      setProcessos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setMostrarProcessos(false);
    setProcessoSelecionado(null);
  };

  const handleProcessoEdit = async (processo) => {
    try {
      await Axios.put("http://localhost:3001/editProcesso", processo);
      // Atualize a lista de processos
      const response = await Axios.get("http://localhost:3001/getProcesso");
      setProcessos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
  
      const response = await Axios.post(
        `http://localhost:3001/uploadProcuracao/${props.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      if (response.status === 200) {
        message.success("Procuração salva com sucesso");
      } else {
        message.error("Erro ao salvar a procuração");
      }
    } catch (error) {
      console.error(error);
      message.error("Erro ao salvar a procuração");
    } finally {
      // Limpar o estado do arquivo selecionado e fechar o pop-up
      setSelectedFile(null);
      setShowUploadModal(false);
    }
  };
  

  return (
    <>
      <FormDialog
        open={open}
        setOpen={setOpen}
        nome={props.nome}
        cpf={props.cpf}
        nacionalidade={props.nacionalidade}
        estadoCivil={props.estadoCivil}
        profissao={props.profissao}
        endereco={props.endereco}
        dataNascimento={props.dataNascimento}
        telefone={props.telefone}
        celular={props.celular}
        email={props.email}
        listClientes={props.listClientes}
        setListClientes={props.setListClientes}
        id={props.id}
        nome_advogado={props.nome_advogado}
      />

      <EditProcessoDialog
        open={editOpen}
        setOpen={setEditOpen}
        processo={processoSelecionado}
        handleProcessoEdit={handleProcessoEdit}
      />

      <div className="clientes--container" style={{marginTop: 30}}>
      <table className="table"
      style={{border:"1px solid #f4f4f4"}}>
        <thead>
        <tr style={{textAlign:"center", fontSize: 13}}>                           
            <th scope="col">Nome completo</th>
            <th scope="col">CPF</th>
            <th scope="col">Nacionalidade</th>
            <th scope="col">Estado Civil</th>
            <th scope="col">Profissão</th>
            <th scope="col">Endereço</th>
            {/*<th scope="col">Nascimento</th>*/}
            <th scope="col">Telefone</th>
            <th scope="col">Celular</th>
            <th scope="col">Email</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr style={{fontSize:12, textAlign:"center"}}>
            
            <td>{props.nome}</td>
            <td>{props.cpf}</td>
            <td>{props.nacionalidade}</td>
            <td>{props.estadoCivil}</td>
            <td>{props.profissao}</td>
            <td>{props.endereco}</td>
            {/* <td>{props.dataNascimento}</td> */}
            <td>{props.telefone}</td>
            <td>{props.celular}</td>
            <td>{props.email}</td>
            <td><FaFolderPlus onClick={() => setOpen(true)}
            style={{fontSize:16}}/>

            <FaEye onClick={handleVerProcessos}
            style={{fontSize: 16}}
            /></td>
            <td><FaFileMedical onClick={() => gerarPdf(props)} 
            style={{fontSize: 16}}/>

            <FaPaperclip onClick={() => setShowUploadModal(true)}
            style={{fontSize: 16}}/></td>
                       
          </tr>
        </tbody>
      </table>

        
        <Modal
          title="Anexar Procuração"
          open={showUploadModal}
          onCancel={() => setShowUploadModal(false)}
          footer={[
            <Button key="cancel" onClick={() => setShowUploadModal(false)}>
              Cancelar
            </Button>,
          ]}
        >
          <Input
            type="file"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
          <Button
            key="upload"
            type="primary"
            onClick={handleFileUpload}
            disabled={!selectedFile}
          >
            Enviar
          </Button>
        </Modal>

        <Modal
          title="Processos"
          open={mostrarProcessos}
          onCancel={handleCloseModal}
          footer={null}
        >
          {processosCliente.map((processo) => (
            <div key={processo.id}>
              <p>
                Processo: {processo.numProcesso}, Vara: {processo.vara},
                Data do Processo: {processo.dataProcesso}, Hora do Processo:{" "}
                {processo.horaProcesso}
              </p>
              <Button onClick={() => handleEditProcesso(processo)}>
                Editar
              </Button>
              <Button
                onClick={() => handleDeleteProcesso(processo.id)}
                danger
              >
                Excluir
              </Button>
            </div>
          ))}
        </Modal>
      </div>
    </>
  );
}
