import React, { useState, useEffect } from 'react';
import Title from '../../components/Title';
import { useParams } from 'react-router-dom';
import ModalTarefa from '../../components/Modal/ModalTarefa';
import Tarefas from '../../components/Tarefa/Tarefas';
import { getDisciplina } from '../../features/disciplinaSlice';
import { useDispatch } from 'react-redux';

const DisciplinaTarefa = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [disciplina, setDisciplina] = useState({});

    useEffect(() => {
        const fetchNameDisciplina = async () => {
            const tokenData = JSON.parse(localStorage.getItem('user'));
            const token = tokenData?.token;
            if (!token) {
                console.error('Token não encontrado');
                return;
            }
            const res = await dispatch(getDisciplina({ id:id, token:token }));
            if(res.meta.requestStatus === 'fulfilled') {
            setDisciplina(res.payload);
            }else{
            console.error(res.payload || 'Erro ao buscar disciplina');
            }
        };
        fetchNameDisciplina();
    }, [dispatch, id]);
    console.log(disciplina);

    return (
        <div className='h-full overflow-y-auto'>
            <Title text={"Tarefas"}/>
            <div className='flex m-2'>
                <p className='font-bold mr-1'>Disciplina:</p>
                <p>{disciplina.name}</p>
            </div>
            <ModalTarefa/>
            <Tarefas/>
        </div>
    )
}

export default DisciplinaTarefa;