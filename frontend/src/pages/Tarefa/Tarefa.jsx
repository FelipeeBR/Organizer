import React from 'react';
import Title from '../../components/Title';
import { useParams } from 'react-router-dom';
import Tarefas from '../../components/Tarefa/Tarefas';

const Tarefa = () => {
    const { id } = useParams();
    return (
        <div className='h-full overflow-y-auto'>
            <Title text={"Tarefas"}/>
            <p>ID da disciplina: {id}</p>
            <Tarefas/>
        </div>
    )
}

export default Tarefa;