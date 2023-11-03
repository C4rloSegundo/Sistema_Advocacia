import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";

export default function FormDialog(props) {
  const [values, setValues] = useState({
    dataProcesso: "",
    horaProcesso: "",
    numProcesso: "",
    vara: "",
    id_cliente: "",
    nome_cliente: "",
  });
  const [listClientes, setListClientes] = useState([]);

  const handleChangeValues = (event) => {
    const { id, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleRegisterProcesso = async (processoId) => {
    try {
      await Axios.put(`http://localhost:3001/editProcesso/${processoId}`, values);
      document.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getClientes").then((response) => {
      setListClientes(response.data);
    });
  }, []);

  useEffect(() => {
    if (props.processo) {
      setValues({
        ...props.processo,
      });
    }
  }, [props.processo]);

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
            label="Id do Cliente"
            value={values.id_cliente}
            key={values.id_cliente}
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
            value={values.dataProcesso}
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
            value={values.horaProcesso}
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
            value={values.numProcesso}
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
            value={values.vara}
            onChange={handleChangeValues}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={() =>
              handleRegisterProcesso(props.processo.id)
            }
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
