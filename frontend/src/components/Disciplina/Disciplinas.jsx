import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getDisciplinas } from '../../features/disciplinaSlice';
import CardDisciplina from './CardDisciplina';
import { FaPlus } from "react-icons/fa";
import { useContextApp } from '../../context/AppContext';

const Disciplinas = () => {
    const dispatch = useDispatch();
    const { openClose } = useContextApp();
    const [disciplinas, setDisciplinas] = useState([]);
    useEffect(() => {
        const getAllDisciplinas = async () => {
          const tokenData = JSON.parse(localStorage.getItem('user')); 
          const token = tokenData?.token; 
          if (!token) {
            console.error('Token não encontrado');
            return;
          }
          const result = await dispatch(getDisciplinas(token));
          if (result.meta.requestStatus === 'fulfilled') {
            setDisciplinas(result.payload);
            console.log(result.payload);
          } else {
            console.error(result.payload || 'Erro ao buscar disciplinas');
          }
        };
        getAllDisciplinas();

      }, [dispatch]);
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-4 my-4">
            {disciplinas?.map((disciplina) => {
                return <CardDisciplina key={disciplina.id} info={disciplina} />;
            })}
        <div
        onClick={() => openClose("isModalDisciplina")}
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

export default Disciplinas;