import { FaHome, FaUserPlus, FaUserTie, FaFolderOpen } from "react-icons/fa";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

function SideMenu() {
    const navigate = useNavigate();
  
    const handleMenuClick = (item) => {
      navigate(item.key);
    };

    const menuItems = [
      { key: "/TelaInicial", icon: <FaHome />, label: "Tela inicial" },
      { key: "/CadClientes", icon: <FaUserPlus />, label: "Clientes" },
      { key: "/CadFuncionarios", icon: <FaUserTie />, label: "Funcionários" },
      { key: "/CadProcessos", icon: <FaFolderOpen />, label: "Processos" },
    ];
  
    return (
      <div className="SideMenu">
        <Menu onClick={handleMenuClick} items={menuItems} />
      </div>
    );
  }

export default SideMenu;
