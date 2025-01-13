import React from 'react';
import Title from '../../components/Title';
import Tarefas from '../../components/Tarefas';


const Home = () => {
  
  return (
    <div className='bg-gray-200 h-full overflow-y-hidden'>
        <div>
          <Title text="Início" />
          <Tarefas/>
        </div>
    </div>
  )
}

export default Home;