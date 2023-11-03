import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";


export default function FormDialog(props) {
  const [editValues, setEditValues] = useState({
    id: props.id,
    nome: props.nome,
    cpf: props.cpf,
    nacionalidade: props.nacionalidade,
    estadoCivil: props.estadoCivil,
    profissao: props.profissao,
    endereco: props.endereco,
    dataNascimento: props.dataNascimento,
    telefone: props.telefone,
    celular: props.celular,
    email: props.email,
  });

  const handleChangeValues = (values) => {
    setEditValues((prevValues) => ({
      ...prevValues,
      [values.target.id]: values.target.value,
    }));
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleEditCliente = () => {
    Axios.put("http://localhost:3001/editClientes", {
      id: editValues.id,
      nome: editValues.nome,
      cpf: editValues.cpf,
      nacionalidade: editValues.nacionalidade,
      estadoCivil: editValues.estadoCivil,
      profissao: editValues.profissao,
      endereco: editValues.endereco,
      dataNascimento: editValues.dataNascimento,
      telefone: editValues.telefone,
      celular: editValues.celular,
      email: editValues.email,

    }).then(()=>{
      props.setListClientes(
        props.listClientes.map((values)=>{
          return values.id === editValues.id
          ?{
            id: editValues.id,
            nome: editValues.nome,
            cpf: editValues.cpf,
            nacionalidade: editValues.nacionalidade,
            estadoCivil: editValues.estadoCivil,
            profissao: editValues.profissao,
            endereco: editValues.endereco,
            dataNascimento: editValues.dataNascimento,
            telefone: editValues.telefone,
            celular: editValues.celular,
            email: editValues.email,
          }
          :values;
        })
      )
    })
    handleClose();
  };

  const handleDeleteCliente = () => {
    Axios.delete(`http://localhost:3001/deleteClientes/${editValues.id}`).then(() => {
      props.setListClientes(
        props.listClientes.filter((value) => {
          return value.id !== editValues.id;
        })
      );
    });
    handleClose();
  };


  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Editar</DialogTitle>
        <DialogContent>
          <TextField
            disabled
            margin="dense"
            id="id"
            label="id"
            defaultValue={props.id}
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="nome"
            label="Nome do cliente"
            defaultValue={props.nome}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="cpf"
            label="CPF"
            defaultValue={props.cpf}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="nacionalidade"
            label="Nacionalidade"
            defaultValue={props.nacionalidade}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
           <TextField
            autoFocus
            margin="dense"
            id="estadoCivil"
            label="Estado Civil"
            defaultValue={props.estadoCivil}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
           <TextField
            autoFocus
            margin="dense"
            id="profissao"
            label="Profissão"
            defaultValue={props.profissao}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
           <TextField
            autoFocus
            margin="dense"
            id="endereco"
            label="Endereço"
            defaultValue={props.endereco}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
           <TextField
            autoFocus
            margin="dense"
            id="dataNascimento"
            label="Data de nascimento"
            defaultValue={props.dataNascimento}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
           <TextField
            autoFocus
            margin="dense"
            id="telefone"
            label="Telefone"
            defaultValue={props.telefone}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
           <TextField
            autoFocus
            margin="dense"
            id="celular"
            label="Celular"
            defaultValue={props.celular}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
           <TextField
            autoFocus
            margin="dense"
            id="email"
            label="E-mail"
            defaultValue={props.email}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={() => handleDeleteCliente()}>
            Excluir
          </Button>
          <Button color="primary" onClick={() => handleEditCliente()}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}