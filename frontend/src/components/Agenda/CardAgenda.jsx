import React from 'react';
import { FaTrash, FaEdit } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import { deleteAgenda } from '../../features/agendaSlice';
import { useContextApp } from "../../context/AppContext";
import { format, addHours } from 'date-fns';

const CardAgenda = ({info}) => {
    const { id, description, date } = info;
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

    return (
        <div className='bg-white rounded-lg shadow-md flex flex-col justify-between relative p-4'>
            <div className="flex flex-col flex-grow">
                <h3 className="text-sm font-semibold text-gray-800 italic">{format(addHours(new Date(date), 3), "dd/MM/yyyy 'às' HH:mm")}</h3>
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