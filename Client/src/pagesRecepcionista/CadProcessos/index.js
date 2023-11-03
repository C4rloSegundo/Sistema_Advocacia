import { Input } from "antd";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import VerClientesProcessos from "../../components/Recepcionista/VizualizarProcessos/verClientesProcesso";
const { Search } = Input;

function CadProcessos() {
  const [listClientes, setListClientes] = useState([]);
  const [filteredClientes, setFilteredClientes] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (value) => {
    setSearchValue(value);
    filterClientes(value);
  };

  const filterClientes = (search) => {
    const filtered = listClientes.filter((cliente) => {
      return (
        cliente.nome.toLowerCase().includes(search.toLowerCase()) ||
        cliente.cpf.includes(search)
      );
    });
    setFilteredClientes(filtered);
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getClientes").then((response) => {
      setListClientes(response.data);
      setFilteredClientes(response.data);
    });
  }, []);

  return (
    <div>
<h4 className="title-cadprocesso">
          Cadastro de Processos
        </h4>

      <Search        
        placeholder="Pesquisar por cliente"
        allowClear
        enterButton="Pesquisar"
        size="large"
        onSearch={handleSearch}
      />

      {filteredClientes.map((value) => (
        <VerClientesProcessos
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
          nome_advogado={value.nome_advogado}
        />
      ))}
    </div>
  );
}

export default CadProcessos;
