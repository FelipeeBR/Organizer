import React from 'react'
import Title from '../../components/Title';
import ModalDisciplina from '../../components/Modal/ModalDisciplina';
import Disciplinas from '../../components/Disciplina/Disciplinas';

const Disciplina = () => {
  return (
    <div className='h-full overflow-y-auto'>
        <Title text={"Disciplinas"}/>
        <ModalDisciplina/>
        <Disciplinas/>
    </div>
  )
}

export default Disciplina;