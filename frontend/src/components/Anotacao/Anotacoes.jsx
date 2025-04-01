import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAnotacoes } from '../../features/anotacaoSlice';
import CardAnotacao from './CardAnotacao';
import { FaPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Anotacoes = ({ filtros }) => {
    const dispatch = useDispatch();
    const anotacoes = useSelector((state) => state.anotacao.list);

    useEffect(() => {
        const fetchAnotacoes = async () => {
            const tokenData = JSON.parse(localStorage.getItem('user'));
            const token = tokenData?.token;
            if (!token) {
                console.error('Token não encontrado');
                return;
            }
            await dispatch(getAnotacoes(token));
        };
        fetchAnotacoes();
    }, [dispatch]);

    const { disciplinaId, dataAtualizacao } = filtros;

    const anotacoesFiltradas = anotacoes.filter((a) => {
        const matchDisciplina = disciplinaId ? a.disciplinaId === parseInt(disciplinaId) : true;
        const matchData = dataAtualizacao
        ? new Date(a.createdAt).toISOString().slice(0, 10) === dataAtualizacao
        : true;

        return matchDisciplina && matchData;
    });

   
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-4 my-4">
          {anotacoesFiltradas?.map((anotacao) => (
            <CardAnotacao key={anotacao.id} info={anotacao} />
          ))}
            <div className="cursor-pointer min-h-[200px] rounded-lg border relative flex items-center justify-center border-dashed border-slate-800 text-slate-800 bg-gray-200 hover:bg-gray-300 duration-300 p-4">
                <Link to={"/anotacoes/novo"}>
                    <button type="button" className="border-0 outline-none flex items-center gap-2 text-lg">
                        <FaPlus className="text-2xl" />
                        Adicionar
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Anotacoes;