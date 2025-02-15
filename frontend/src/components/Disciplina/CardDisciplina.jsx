import React from 'react';
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { deleteDisciplina } from '../../features/disciplinaSlice';
import { useContextApp } from "../../context/AppContext";
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import { FaExclamationTriangle } from "react-icons/fa";

const CardDisciplina = ({info}) => {
    const { id, name, details, dependencia } = info;
    const dispatch = useDispatch();
    const { openClose } = useContextApp();

    const handleDeleteDisciplina = async (id) => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const res = await dispatch(deleteDisciplina({ id, token }));
    
        if (res.meta.requestStatus === 'fulfilled') {
            toast.success('Disciplina excluída com sucesso');
        } else {
            toast.error(res.payload || 'Erro ao deletar disciplina');
        }
    };

    const handleEditDisciplina = async (id) => {
        openClose("isModalDisciplinaEdit", id);
    };

    return (
        <div className="bg-white rounded-lg shadow-md flex flex-col justify-between relative p-4">
            <Link to={"/disciplina/" + id}>
                <div className="flex items-center justify-center text-blue-500 bg-blue-100 rounded-full w-16 h-16 sm:w-20 sm:h-20">
                    <FaBookOpen className="text-2xl sm:text-3xl" />
                </div>
                <div className="flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
                    <p className="text-sm text-gray-600 mt-1 truncate">
                        {details}
                    </p>
                </div>
            </Link>
            <div className="flex flex-col flex-grow">
                <div className="mt-4 flex gap-2 sm:mt-auto">
                    <button onClick={() => handleEditDisciplina(id)} className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
                        <FaEdit className="" />
                    </button>
                    <button onClick={() => handleDeleteDisciplina(id)} className="flex items-center justify-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                        <FaTrash className="" />
                    </button>
                    {dependencia > 0 && <div className="flex bg-orange-500 text-white px-4 py-2 rounded-lg text-sm"><FaExclamationTriangle className="flex flex-grow m-1"/>Dependência</div>}
                </div>
            </div>
        </div>

    )
}

export default CardDisciplina;