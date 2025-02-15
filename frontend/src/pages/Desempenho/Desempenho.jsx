import React from 'react';
import Title from '../../components/Title';
import { FaGrinWink, FaSadTear, FaMeh } from "react-icons/fa";
import axios from 'axios';
const API = process.env.REACT_APP_API_URL;


const Desempenho = () => {
    const [valores, setValores] = React.useState({
        quantidadeTarefas: 0,
        pontuacaoTotal: 0,
        desempenho: "",
    });
    const [ver, setVer] = React.useState(false);
    const handleDesempenho = async () => {
        try {
            const token = JSON.parse(localStorage.getItem('user')).token;
            const response = await axios.get(`${API}/desempenho`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setValores(response.data);
            setVer(true);
            console.log("Dados recebidos:", response.data);
    
            return response.data; 
        } catch (error) {
            console.error("Erro ao buscar desempenho:", error);
            return null;
        }
    };

    const getDesempenhoInfo = () => {
        switch (valores.desempenho) {
            case "BOM":
                return { icon: <FaGrinWink className="text-4xl" />, color: "bg-green-100", textColor: "text-green-500" };
            case "REGULAR":
                return { icon: <FaMeh className="text-4xl" />, color: "bg-yellow-100", textColor: "text-yellow-500" };
            case "RUIM":
                return { icon: <FaSadTear className="text-4xl" />, color: "bg-red-100", textColor: "text-red-500" };
            default:
                return { icon: <FaMeh className="text-4xl" />, color: "bg-gray-100", textColor: "text-gray-500" };
        }
    };

    const { icon, color, textColor } = getDesempenhoInfo();

    return (
        <div className='h-full overflow-y-auto p-4'>
            <Title text={"Desempenho"} />
            <div className='flex justify-center mb-6'>
                <h3 className='text-2xl font-semibold text-gray-800'>Veja como está seu desempenho</h3>
            </div>
            <div className='flex justify-center mb-6'>
                <button onClick={handleDesempenho} className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300'>
                    Mostrar meu desempenho
                </button>
            </div>
            {valores.pontuacaoTotal > 0 && (
                <div className='bg-white rounded-lg shadow-lg p-6'>
                    <div className='text-center mb-6'>
                        {valores.quantidadeTarefas > 0 ? (
                            <p className='text-lg font-semibold text-gray-800'>
                                Tarefas em atraso: <span className='text-red-500'>{valores.quantidadeTarefas}</span>
                            </p>
                        ) : (
                            <p className='text-lg font-semibold text-gray-800'>Você não possui tarefas em atraso</p>
                        )}
                    </div>

                    <div className='flex justify-center mb-6'>
                        <div className={`${textColor} ${color} rounded-lg p-4 shadow-md text-center`}>
                            <p className='text-sm font-semibold'>Sua pontuação</p>
                            <p className='text-2xl font-bold'>{valores.pontuacaoTotal}</p>
                        </div>
                    </div>

                    <div className='flex justify-center'>
                        <div className={`${color} rounded-full w-20 h-20 flex items-center justify-center`}>
                            {icon}
                        </div>
                    </div>

                    <div className='text-center mt-4'>
                        <p className={`text-lg font-semibold ${textColor}`}>
                            Desempenho: {valores.desempenho}
                        </p>
                    </div>
                </div>
            )}
            {valores.pontuacaoTotal === 0 && ver && (
                <div className='bg-white rounded-lg shadow-lg p-6'>
                    <div className='text-center mb-6'>
                        <p className='text-lg font-semibold text-gray-800'>Não foi possivel calcular o desempenho</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Desempenho;