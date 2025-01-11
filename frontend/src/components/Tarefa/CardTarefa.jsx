import React from 'react';
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { deleteDisciplina } from '../../features/disciplinaSlice';
import { useContextApp } from "../../context/AppContext";

const CardTarefa = ({info}) => {
    const { id, title, description, date, priority, status } = info;
    const dispatch = useDispatch();
    const { openClose } = useContextApp();

    const handleDeleteDisciplina = async (id) => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const res = await dispatch(deleteDisciplina({ id, token }));
    
        if (res.meta.requestStatus === 'fulfilled') {
            console.log('Disciplina excluída com sucesso');
        } else {
            console.error(res.payload || 'Erro ao deletar disciplina');
        }
    };

    const handleEditDisciplina = async (id) => {
        openClose("isModalTarefaEdit", id);
    };
    
    return (
        <div className=" bg-white rounded-lg flex flex-col justify-between border relative border-slate-500 p-4">
            
            <div className="flex items-center justify-center text-blue-500 bg-blue-100 rounded-full w-16 h-16 sm:w-20 sm:h-20">
                <FaTasks className="text-2xl sm:text-3xl" />
            </div>
            <div className="flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                <p className="text-sm text-gray-600 mt-1">
                    {description}
                </p>
            </div>
            <div className="flex flex-col flex-grow">
                <div className="mt-4 flex gap-2 sm:mt-auto">
                    <button onClick={() => handleEditDisciplina(id)} className="flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
                        <FaEdit className="mr-2" />
                        Editar
                    </button>
                    <button onClick={() => handleDeleteDisciplina(id)} className="flex items-center justify-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                        <FaTrash className="mr-2" />
                        Excluir
                    </button>
                </div>
            </div>
        </div>

    )
}

export default CardTarefa;