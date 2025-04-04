import React from 'react';
import { FaTrash, FaEdit } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import { deleteAgenda } from '../../features/agendaSlice';
import { useContextApp } from "../../context/AppContext";
import { format, addHours } from 'date-fns';

const CardAgenda = ({info}) => {
    const { id, description, date, tipo } = info;
    const dispatch = useDispatch();
    const { openClose } = useContextApp();

    const handleDeleteAgenda = async (id) => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const res = await dispatch(deleteAgenda({ id, token }));
    
        if (res.meta.requestStatus === 'fulfilled') {
            toast.success('Agenda excluída com sucesso');
        } else {
            toast.error(res.payload || 'Erro ao deletar agenda');
        }
    };

    const handleEditAgenda = async (id) => {
        openClose("isModalAgendaEdit", id);
    };

    const getTipo = (tipo) => {
        switch (tipo) {
            case 'TRABALHO':
            return <div className='flex items-center gap-2'>Trabalho</div>; 
            case 'PROVA':
            return <div className='flex items-center gap-2'>Prova</div>; 
            case 'EVENTO':
            return <div className='flex items-center gap-2'>Evento</div>;
            case 'REUNIAO':
            return <div className='flex items-center gap-2'>Reunião</div>;
            case 'AULA':
            return <div className='flex items-center gap-2'>Aula</div>;  
            case 'IMPORTANTE':
            return <div className='flex items-center gap-2'>Importante</div>;
            default:
            return <div className='flex items-center gap-2'>Evento</div>;
        }
    };

    const getColor = (tipo) => {
        switch (tipo) {
          case 'TRABALHO':
            return 'bg-green-500'; 
          case 'PROVA':
            return 'bg-red-500'; 
          case 'EVENTO':
            return 'bg-blue-500'; 
        case 'REUNIAO':
            return 'bg-yellow-500';
        case 'AULA':
            return 'bg-indigo-500';
        case 'IMPORTANTE':
            return 'bg-orange-500';
          default:
            return 'bg-gray-500';
        }
    };

    return (
        <div className='bg-white rounded-lg shadow-md flex flex-col justify-between relative p-4 gap-2'>
            <div className="flex flex-grow gap-2">
                <div className={`flex items-center justify-center text-white ${getColor(tipo)} rounded-lg px-2 font-semibold`}>
                    {getTipo(tipo)}
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-gray-800 italic">{format(addHours(new Date(date), 3), "dd/MM/yyyy 'às' HH:mm")}</h3>
                </div>
            </div>
            <div className="flex flex-col flex-grow">
                <h3 className="text-sm font-semibold text-gray-800 italic">{description}</h3>
            </div>
            <div className="flex flex-col flex-grow">
                <div className="mt-4 flex gap-2 sm:mt-auto">
                    <button onClick={() => handleEditAgenda(id)}
                        className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all focus:ring focus:ring-blue-200">
                        <FaEdit />
                    </button>
                    <button onClick={() => handleDeleteAgenda(id)} className="flex items-center justify-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                        <FaTrash className="" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CardAgenda;