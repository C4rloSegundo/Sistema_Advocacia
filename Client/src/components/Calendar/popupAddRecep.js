import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem } from '@material-ui/core';
import Axios from 'axios';

function FormDialog({ open, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedAdvogado, setSelectedAdvogado] = useState(null);
  const [listAdvogados, setListAdvogados] = useState([]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSave = () => {
    let advogadoId = null;
    let advogadoNome = '';
  
    if (selectedAdvogado) {
      const advogado = listAdvogados.find((adv) => adv.id === selectedAdvogado);
      if (advogado) {
        advogadoId = advogado.id;
        advogadoNome = advogado.nome;
      }
    }
  
    onSave(title, description, advogadoId, advogadoNome);
    setTitle('');
    setDescription('');
    setSelectedAdvogado(null);
  };
  

  const handleSelectAdvogado = (event) => {
    setSelectedAdvogado(event.target.value);
  };

  useEffect(() => {
    Axios.get('http://localhost:3001/getAdvogados').then((response) => {
      setListAdvogados(response.data);
    });
  }, []);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Adicionar Tarefa</DialogTitle>
      <DialogContent>
        <TextField label="Título" value={title} onChange={handleTitleChange} fullWidth />
        <TextField label="Descrição" value={description} onChange={handleDescriptionChange} fullWidth multiline />
        <Select
          value={selectedAdvogado}
          onChange={handleSelectAdvogado}
          displayEmpty
          fullWidth
        >
          <MenuItem value="" disabled>
            Selecione o Advogado
          </MenuItem>
          {listAdvogados.map((advogado) => (
            <MenuItem key={advogado.id} value={advogado.id}>
              {advogado.nome}
            </MenuItem>
          ))}
        </Select>
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
