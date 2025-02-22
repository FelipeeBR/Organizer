import React from 'react';
import Title from '../../components/Title';
import axios from 'axios';
import { FaChartLine, FaMarker, FaCheckSquare, FaHandPointRight, FaExclamationTriangle } from "react-icons/fa";
import { format } from 'date-fns';

const API = process.env.REACT_APP_API_URL;


const Desempenho = () => {
    const [valores, setValores] = React.useState({
        aproveitamento: null,
        recomendacao: null,
        tarefasCompletadasCount: 0,
        tarefasPendentesCount: 0,
        tarefasConcluidasRecentemente: 0,
        tarefasPendentes: [],
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
            return response.data; 
        } catch (error) {
            console.error("Erro ao buscar desempenho:", error);
            return null;
        }
    };

    return (
        <div className="h-full overflow-y-auto p-6 bg-gray-100">
            <Title text="Desempenho" />

            <div className="flex flex-col items-center text-center mb-6">
                <h3 className="text-3xl font-bold text-gray-900">Veja como está seu desempenho</h3>
            </div>

            <div className="flex justify-center mb-6">
                <button
                    onClick={handleDesempenho}
                    className="flex bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition duration-300"
                >
                    <FaChartLine className="mr-2" color='#fff' size={20}/>
                    Mostrar meu desempenho
                </button>
            </div>

            {valores.aproveitamento !== null && (
                <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
                    <div className="flex items-center space-x-4 border-b pb-4">
                        <FaChartLine className="text-4xl text-gray-800" />
                        <p className="text-xl font-semibold text-gray-800">
                            Aproveitamento: <span className="text-blue-600">{valores.aproveitamento}%</span>
                        </p>
                    </div>

                    <div className="flex items-center space-x-4 border-b pb-4">
                        <FaMarker className="text-4xl text-gray-800" />
                        <p className="text-xl font-semibold text-gray-800">
                            Tarefas Pendentes: <span className="text-red-500">{valores.tarefasPendentesCount}</span>
                        </p>
                    </div>

                    <div className="flex items-center space-x-4 border-b pb-4">
                        <FaCheckSquare className="text-4xl text-gray-800" />
                        <p className="text-xl font-semibold text-gray-800">
                            Tarefas Finalizadas: <span className="text-green-500">{valores.tarefasCompletadasCount}</span>
                        </p>
                    </div>

                    <div className="flex items-center space-x-4 border-b pb-4">
                        <FaCheckSquare className="text-4xl text-gray-800" />
                        <p className="text-xl font-semibold text-gray-800">
                            Tarefas concluídas nos últimos 7 dias: <span className="text-green-500">{valores.tarefasConcluidasRecentemente}</span>
                        </p>
                    </div>

                    <div className="flex items-center space-x-4 border-b pb-4">
                        <FaHandPointRight className="text-4xl text-gray-800" />
                        <p className="text-xl font-semibold text-gray-800">
                            Recomendação: {valores.recomendacao || "Nenhuma recomendação disponível"}
                        </p>
                    </div>

                    <div className="border-t pt-4">
                        <div className="flex items-center space-x-4">
                            <FaExclamationTriangle className="text-4xl text-yellow-600" />
                            <p className="text-xl font-semibold text-gray-800">Tarefas Prioritárias:</p>
                        </div>
                        {valores.tarefasPendentes.length > 0 ? (
                            <div className="mt-4 space-y-4">
                                {valores.tarefasPendentes.map((tarefa) => (
                                    <div key={tarefa.id} className="flex justify-between items-center bg-gray-50 border border-slate-300 rounded-lg p-4 shadow truncate">
                                        <p className="text-lg font-semibold text-gray-800 truncate">{tarefa.title}</p>
                                        <p className="text-sm text-gray-600 font-bold">Até: {format(new Date(tarefa.date), 'dd/MM/yyyy')}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-600 mt-2">Nenhuma tarefa prioritária no momento.</p>
                        )}
                    </div>
                </div>
            )}

            {valores.aproveitamento === null && ver && (
                <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                    <p className="text-lg font-semibold text-gray-800">Não foi possível calcular o desempenho</p>
                </div>
            )}
        </div>

    );
};

export default Desempenho;