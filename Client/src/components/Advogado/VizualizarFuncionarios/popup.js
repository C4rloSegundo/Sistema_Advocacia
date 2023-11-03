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
    perfil: props.perfil,
    numOAB: props.numOAB,
    email: props.email,
    senha: props.senha,
    telefone: props.telefone,
  });

  const handleChangeValues = (values) => {
    setEditValues((prevValues) => ({
      ...prevValues,
      [values.target.id]: values.target.value,
    }));
  };

  const handleClose = () => {
    document.location.reload();
    props.setOpen(false);
  };

  const handleEditFuncionarios = () => {
    if (editValues.perfil === "advogado") {
      Axios.put("http://localhost:3001/editAdvogados", {
        id: editValues.id,
        nome: editValues.nome,
        perfil: editValues.perfil,
        numOAB: editValues.numOAB,
        email: editValues.email,
        senha: editValues.senha,
        telefone: editValues.telefone,
      }).then(() => {
        props.setListFuncionarios(
          props.listFuncionarios.map((values) => {
            return values.id === editValues.id
              ? {
                  id: editValues.id,
                  nome: editValues.nome,
                  perfil: editValues.perfil,
                  numOAB: editValues.numOAB,
                  email: editValues.email,
                  senha: editValues.senha,
                  telefone: editValues.telefone,
                }
              : values;
          })
        );
      });
    } else if (editValues.perfil === "recepcionista") {
      Axios.put("http://localhost:3001/editRecepcionistas", {
        id: editValues.id,
        nome: editValues.nome,
        perfil: editValues.perfil,
        numOAB: editValues.numOAB,
        email: editValues.email,
        senha: editValues.senha,
        telefone: editValues.telefone,
      }).then(() => {
        props.setListFuncionarios(
          props.listFuncionarios.map((values) => {
            return values.id === editValues.id
              ? {
                  id: editValues.id,
                  nome: editValues.nome,
                  perfil: editValues.perfil,
                  numOAB: editValues.numOAB,
                  email: editValues.email,
                  senha: editValues.senha,
                  telefone: editValues.telefone,
                }
              : values;
          })
        );
      });
    }
    handleClose();
  };
  

  const handleDeleteFuncionarios = () => {
    if (editValues.perfil === "advogado") {
      Axios.delete(`http://localhost:3001/deleteAdvogados/${editValues.id}`).then(() => {
        props.setListFuncionarios(
          props.listFuncionarios.filter((value) => {
            return value.id !== editValues.id;
          })
        );
      });
    } else if (editValues.perfil === "recepcionista") {
      Axios.delete(`http://localhost:3001/deleteRecepcionistas/${editValues.id}`).then(() => {
        props.setListFuncionarios(
          props.listFuncionarios.filter((value) => {
            return value.id !== editValues.id;
          })
        );
      });
    }
    handleClose();
  };
  

  return (
    <div>
      <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
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
            label="Nome"
            defaultValue={props.nome}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="perfil"
            label="Perfil"
            defaultValue={props.perfil}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="numOAB"
            label="Numero da OAB"
            defaultValue={props.numOAB}
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
          <TextField
            autoFocus
            margin="dense"
            id="senha"
            label="Senha"
            defaultValue={props.senha}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={() => handleDeleteFuncionarios()}>
            Excluir
          </Button>
          <Button color="primary" onClick={() => handleEditFuncionarios()}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
