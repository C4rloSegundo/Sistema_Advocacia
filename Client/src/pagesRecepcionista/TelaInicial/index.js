import { Space, Card, Statistic } from "antd";
import Calendar from "../../components/Calendar/CalendarRecep";
import React, { useState, useEffect } from "react";
import { FaUser, FaUserTie, FaFolderOpen } from "react-icons/fa";
import axios from "axios";

function TelaInicial() {
    const [clientesCount, setClientesCount] = useState(0);
    const [advogadosCount, setAdvogadosCount] = useState(0);
    const [processosCount, setProcessosCount] = useState(0);

    useEffect(() => {
        const fetchClientesCount = async () => {
            try {
                const response = await axios.get("http://localhost:3001/getClientes");
                setClientesCount(response.data.length);
            } catch (error) {
                console.log("Sem clientes cadastrados");
                setClientesCount(0);
            }
        };

        const fetchAdvogadosCount = async () => {
            try {
                const response = await axios.get("http://localhost:3001/getAdvogados");
                setAdvogadosCount(response.data.length);
            } catch (error) {
                console.log("Sem advogados cadastrados");
                setAdvogadosCount(0);
            }
        };

        const fetchProcessosCount = async () => {
            try {
                const response = await axios.get("http://localhost:3001/getProcessos");
                setProcessosCount(response.data.length);
            } catch (error) {
                console.log("Sem processos cadastrados ou em andamento");
                setProcessosCount(0);
            }
        };

        fetchClientesCount();
        fetchAdvogadosCount();
        fetchProcessosCount();
    }, []);

    return (
        <div >
            <div className="cards-container">
            <Space direction="horizontal">
                <TelaInicialCard
                    icon={
                        <FaUser 
                            
                        />
                    }
                    title={"Clientes"}
                    value={clientesCount}
                />

                <TelaInicialCard
                    icon={                       
                        <FaUserTie
                            
                        />
                    }
                    title={"Advogados"}
                    value={advogadosCount}
                />

                <TelaInicialCard
                    icon={
                        <FaFolderOpen
                            
                        />
                    }
                    title={"Processos"}
                    value={processosCount}
                />

            </Space>
            </div>           
            
            <Calendar />
        </div>
    );
}

function TelaInicialCard({ title, value, icon }) {
    return (
        <Card style={{ backgroundColor: "rgba(22, 119, 255, 0.6)", width: 180, margin: 40 }}>
            <Space direction="horizontal"
            style={{ color: "#ffffff", fontSize: 22, marginRight: 20}}>
                {icon}
                
            </Space>
            <Space><Statistic style={{color: "#ffffff"}} title={title} value={value} /></Space>
        </Card>
    );
}

export default TelaInicial;
