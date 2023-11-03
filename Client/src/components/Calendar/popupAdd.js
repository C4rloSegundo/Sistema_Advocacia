import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';


function FormDialog({ open, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');


  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSave = () => {
    onSave(title, description);
    setTitle('');
    setDescription('');
  };



  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Adicionar Tarefa</DialogTitle>
      <DialogContent>
        <TextField
          label="Título"
          value={title}
          onChange={handleTitleChange}
          fullWidth
        />
        <TextField
          label="Descrição"
          value={description}
          onChange={handleDescriptionChange}
          fullWidth
          multiline
        />

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleSave} color="primary">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FormDialog;
