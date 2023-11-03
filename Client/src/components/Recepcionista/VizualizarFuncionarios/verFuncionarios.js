import React from "react";
import FormDialog from "./popup";
import { FaPen } from "react-icons/fa";

export default function VerFuncionarios(props) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <FormDialog
        open={open}
        setOpen={setOpen}
        nome={props.nome}
        perfil={props.perfil}
        numOAB={props.numOAB}
        email={props.email}
        senha={props.senha}
        telefone={props.telefone}
        listFuncionarios={props.listFuncionarios}
        setListFuncionarios={props.setListFuncionarios}
        id={props.id}
      />

      <div className="Funcionarios--container">
        <table className="table"
          style={{ border: "1px solid #f4f4f4" }}>
          <thead>
            <tr style={{ textAlign: "center", fontSize: 13 }}>
              <th scope="col">Id</th>
              <th scope="col">Nome completo</th>
              <th scope="col">Perfil</th>
              <th scope="col">N° OAB</th>
              <th scope="col">Email</th>
              <th scope="col">Senha</th>
              <th scope="col">Telefone</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ fontSize: 12, textAlign: "center" }}>
              <td>{props.id}</td>
              <td>{props.nome}</td>
              <td>{props.perfil}</td>
              <td>{props.numOAB}</td>
              <td>{props.email}</td>
              <td>{props.senha}</td>
              <td>{props.telefone}</td>
              <td><FaPen onClick={() => setOpen(true)} /></td>

            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
