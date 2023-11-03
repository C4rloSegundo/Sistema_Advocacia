import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';



function TaskDialog({ open, onClose, onDelete, onSave, props }) {
  const [title, setTitle] = useState(props.event ? props.event.title  : '');
  const [description, setDescription] = useState(props.event ? props.event.extendedProps.descricao : '');
  
  useEffect(() => {
    if (props.event) {
      setTitle(props.event.title);
      setDescription(props.event.extendedProps.descricao);
    }
  }, [props.event]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSave = () => {
    onSave(title, description);
    onClose();
  };

  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Ver Tarefa</DialogTitle>
      <DialogContent>
        <TextField label="Título" value={title} onChange={handleTitleChange} fullWidth />
        <TextField label="Descrição" value={description} onChange={handleDescriptionChange} fullWidth multiline />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleDelete} color="primary">
          Excluir
        </Button>
        <Button onClick={handleSave} color="primary">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TaskDialog;

