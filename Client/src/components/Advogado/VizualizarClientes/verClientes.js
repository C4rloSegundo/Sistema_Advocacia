import React from "react";
import FormDialog from "./popup";
import { FaPen } from "react-icons/fa";

export default function VerClientes(props) {
  const [open, setOpen] = React.useState(false);

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
      />

      <div className="clientes--container" >
        <table className="table" 
        style={{ border: "1px solid #f4f4f4" }}>
          <thead>
            <tr style={{ textAlign: "center", fontSize: 13 }}>
              <th scope="col">Nome completo</th>
              <th scope="col">CPF</th>
              <th scope="col">Nacionalidade</th>
              <th scope="col">Estado Civil</th>
              <th scope="col">Profissão</th>
              <th scope="col">Endereço</th>
              {/* <th scope="col">Nascimento</th> */}
              <th scope="col">Telefone</th>
              <th scope="col">Celular</th>
              <th scope="col">Email</th>
              <th scope="col">
                <FaPen onClick={() => { setOpen(true) }} />
              </th>
            </tr>
          </thead>

          <tbody>
            <tr style={{ fontSize: 12, textAlign: "center" }}>
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
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
