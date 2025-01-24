import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTarefas } from '../../features/tarefaSlice';
import { FaPlus } from "react-icons/fa";
import { useContextApp } from '../../context/AppContext';
import CardTarefa from './CardTarefa';
import { useParams } from 'react-router-dom';

const Tarefas = () => {
    const dispatch = useDispatch();
    const { openClose } = useContextApp();
    const { id } = useParams();
    const tarefas = useSelector((state) => state.tarefa.list);
  
    useEffect(() => {
      const fetchTarefas = async () => {
          const tokenData = JSON.parse(localStorage.getItem('user'));
          const token = tokenData?.token;
          if (!token) {
              console.error('Token não encontrado');
              return;
          }

          const res = await dispatch(getTarefas({ id: id, token: token }));
          if(res.meta.requestStatus === 'fulfilled') {
            console.log(res.payload);
          }else{
            console.error(res.payload || 'Erro ao buscar tarefas');
          }
      };
      fetchTarefas();
    }, [dispatch, id]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-4 my-4">
            {tarefas?.map((tarefa) => {
                return <CardTarefa key={tarefa.id} info={tarefa} />;
            })}
        <div
        onClick={() => openClose("isModalTarefa")}
        className="cursor-pointer min-h-[200px] rounded-lg border relative flex items-center justify-center border-dashed border-slate-800 text-slate-800 bg-gray-200 hover:bg-gray-300 duration-300 p-4"
      >
        <button
          type="button"
          className="border-0 outline-none flex items-center gap-2 text-lg"
        >
            <FaPlus className="text-2xl" />
            Adicionar
        </button>
      </div>
    </div>
    )
}

export default Tarefas;