import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";


export default function FormDialog(props) {
  const [values, SetValues] = useState();
  const [listProcesso, SetListProcesso] = useState([]);
  const [listClientes, setListClientes] = useState([]);

  
  const handleChangeValues = (event) => {
    const { id, value } = event.target;
    SetValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };
  

  

  const handleClose = () => {
    props.setOpen(false);
  };

  

  const handleRegisterProcesso = (id_cliente, nome_cliente) => {

    document.location.reload();
    
    
    Axios.post("http://localhost:3001/registerProcesso", {
      dataProcesso: values.dataProcesso,
      horaProcesso: values.horaProcesso,
      numProcesso: values.numProcesso,
      vara : values.vara,
      id_cliente: id_cliente,
      nome_cliente : nome_cliente
    })
  };
  useEffect(() => {
    Axios.get("http://localhost:3001/getClientes").then((response) => {
      setListClientes(response.data);
    });
  },[]);

  


  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Salvar Processos</DialogTitle>
        <DialogContent>
          <TextField
            disabled
            margin="dense"
            id="id_cliente"
            name="id_cliente"
            label={props.nome}
            value={props.id}
            key={props.id}
            onChange={handleChangeValues}
            type="text"
            fullWidth
          />
          
          <TextField
            autoFocus
            margin="dense"
            id="dataProcesso"
            label="Data do Processo"
            name="dataProcesso"
            type="date"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="horaProcesso"
            label="Hora Do Processo"
            name="horaProcesso"
            type="time"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="numProcesso"
            label="Número do Processo"
            name="numProcesso"
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="vara"
            label="Vara"
            name="vara"
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
           
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={() => handleRegisterProcesso(props.id, props.nome)}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}