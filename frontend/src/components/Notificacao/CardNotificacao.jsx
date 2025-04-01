import React from 'react';
import { FaCheck } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import { updateNotificacao } from '../../features/notificacaoSlice';

const CardNotificacao = ({info}) => {
    const { id, descricao } = info;
    const dispatch = useDispatch();

    const handleVerificarNotificao = async (id) => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const res = await dispatch(updateNotificacao({ id, token })); 
        if(res.meta.requestStatus === 'fulfilled') {
            toast.success('Marcado como lido com sucesso');
            window.location.reload();
        } else {
            toast.error(res.payload || 'Erro ao marcar como lido');
        }
    }
    
    return (
        <div>
            <div className="bg-white rounded-lg shadow-md flex flex-col justify-between relative p-4">
                <div className="flex flex-grow justify-between">
                    <div className='truncate'>
                        <h3 className="text-lg font-semibold text-gray-800 truncate">{descricao}</h3>
                    </div>
                    <button onClick={() => handleVerificarNotificao(id)}
                        className="flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all focus:ring focus:ring-green-200">
                        <FaCheck />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CardNotificacao;