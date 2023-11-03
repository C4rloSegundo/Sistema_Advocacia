import { Image, Space, Badge } from 'antd';
import { FaSignOutAlt } from "react-icons/fa";

function AppHeader({ handleLogout }) {
    const handleLogoutClick = () => {
      handleLogout();
    };

    return <div className="AppHeader">
        <Image width={40} src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png">
        </Image>
        <h2>Advogado</h2>
        <Space>           
            <Badge>
            <button id='logOut' onClick={handleLogoutClick}><FaSignOutAlt/></button>
            </Badge>
        </Space>
    </div>
}

export default AppHeader