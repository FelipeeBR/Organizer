import React from 'react';
import { FaCalendar, FaEdit, FaTrash } from "react-icons/fa";
import { FaTasks, FaCheckDouble, FaHourglassEnd } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { useDispatch } from 'react-redux';
import { deleteTarefa } from '../../features/tarefaSlice';
import { useContextApp } from "../../context/AppContext";
import { format, addDays } from 'date-fns';

const CardTarefa = ({info}) => {
    const { id, title, description, date, priority, status } = info;
    const dispatch = useDispatch();
    const { openClose } = useContextApp();

    const handleDeleteTarefa = async (id) => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const res = await dispatch(deleteTarefa({ id, token }));
    
        if(res.meta.requestStatus === 'fulfilled') {
            console.log('Tarefa excluída com sucesso');
        } else {
            console.error(res.payload || 'Erro ao deletar Tarefa');
        }
    };

    const handleEditTarefa = async (id) => {
        openClose("isModalTarefaEdit", id);
    };

    const getStatusColor = (status) => {
        switch (status) {
          case 'PENDING':
            return 'bg-red-500'; 
          case 'COMPLETED':
            return 'bg-green-500'; 
          case 'IN_PROGRESS':
            return 'bg-blue-500'; 
          default:
            return 'bg-gray-500';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
          case 'ALTA':
            return 'bg-red-500'; 
          case 'MEDIA':
            return 'bg-yellow-500'; 
          case 'BAIXA':
            return 'bg-green-500'; 
          default:
            return 'bg-gray-500';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
          case 'PENDING':
            return <div className='flex items-center gap-2'><FaCircleXmark />Pendente</div>; 
          case 'IN_PROGRESS':
            return <div className='flex items-center gap-2'><FaHourglassEnd />Fazendo</div>; 
          case 'COMPLETED':
            return <div className='flex items-center gap-2'><FaCheckDouble />Concluida</div>; 
          default:
            return <FaTasks />;
        }
    };
    
    return (
        <div className="bg-white rounded-lg shadow-md flex flex-col justify-between border border-slate-300 p-4">
            <div className="flex flex-col items-center justify-between mb-4">
                
                <div
                className={`rounded-lg text-white text-sm font-semibold px-2 py-1 flex items-center gap-2 capitalize ${getStatusColor(status)}`}>
                    {getStatusIcon(status)}
                </div>
                <div
                className={`rounded-lg text-white text-sm font-semibold px-4 py-1 w-40 text-center capitalize m-1 ${getPriorityColor(priority)}`}>
                    Prioridade: {priority}
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <FaCalendar className="text-gray-600"/>
                        <p className="text-sm text-gray-600">Prazo: {format(addDays(new Date(date), 1), 'dd/MM/yyyy')}</p>
                    </div> 
                </div>
            </div>
            <div className="flex-grow">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
                <p className="text-sm text-gray-600">{description}</p>
            </div>

            <div className="mt-4 flex gap-2">
                <button
                onClick={() => handleEditTarefa(id)}
                className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all focus:ring focus:ring-blue-200"
                >
                <FaEdit />
                </button>
                <button
                onClick={() => handleDeleteTarefa(id)}
                className="flex items-center justify-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all focus:ring focus:ring-red-200"
                >
                <FaTrash />
                </button>
            </div>
        </div>
    )
}

export default CardTarefa;