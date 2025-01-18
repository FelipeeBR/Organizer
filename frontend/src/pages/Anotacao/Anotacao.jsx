import React from 'react'
import Title from '../../components/Title';
import Anotacoes from '../../components/Anotacao/Anotacoes';

const Anotacao = () => {
  return (
    <div className='h-full overflow-y-auto'>
      <Title text="Anotações"/>
      <Anotacoes/>
    </div>
  )
}

export default Anotacao;