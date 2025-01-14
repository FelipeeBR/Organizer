import React from 'react';
import Title from '../../components/Title';
import Tarefas from '../../components/Tarefas';
import ModalTarefa from '../../components/Modal/ModalTarefa';


const Home = () => {
  
  return (
    <div className='bg-gray-200 h-full overflow-y-auto'>
        <div>
          <Title text="Início" />
          <ModalTarefa/>
          <Tarefas/>
        </div>
    </div>
  )
}

export default Home;