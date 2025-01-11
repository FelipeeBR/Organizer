import React from 'react';
import Title from '../../components/Title';
import { useParams } from 'react-router-dom';
import ModalTarefa from '../../components/Modal/ModalTarefa';
import Tarefas from '../../components/Tarefa/Tarefas';

const DisciplinaTarefa = () => {
    const { id } = useParams();
    return (
        <div className='h-full overflow-y-auto'>
            <Title text={"Tarefas"}/>
            <p>Disciplina: {id}</p>
            <ModalTarefa/>
            <Tarefas/>
        </div>
    )
}

export default DisciplinaTarefa;