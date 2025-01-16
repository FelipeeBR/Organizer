import React from 'react';
import { FaTrash, FaListAlt } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import { deleteAnotacao } from '../../features/anotacaoSlice';

const CardAnotacao = ({info}) => {
    const { id, title } = info;
    const dispatch = useDispatch();

    const handleDeleteAnotacao = async (id) => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const res = await dispatch(deleteAnotacao({ id, token }));
    
        if (res.meta.requestStatus === 'fulfilled') {
            toast.success('Anotação excluída com sucesso');
        } else {
            toast.error(res.payload || 'Erro ao deletar anotação');
        }
    };
    return (
        <div className="bg-white rounded-lg shadow-md flex flex-col justify-between relative p-4">
            <Link to={"/anotacao/" + id}>
                <div className="flex items-center justify-center text-blue-500 bg-blue-100 rounded-full w-16 h-16 sm:w-20 sm:h-20">
                    <FaListAlt className="text-2xl sm:text-3xl" />
                </div>
                <div className="flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                </div>
            </Link>
            <div className="flex flex-col flex-grow">
                <div className="mt-4 flex gap-2 sm:mt-auto">
                    <button onClick={() => handleDeleteAnotacao(id)} className="flex items-center justify-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                        <FaTrash className="" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CardAnotacao;