import React, { useState } from 'react'
import Title from '../../components/Title';
import Anotacoes from '../../components/Anotacao/Anotacoes';
import FiltroAnotacao from '../../components/Anotacao/FiltroAnotacao';

const Anotacao = () => {
  const [filtros, setFiltros] = useState({
    disciplinaId: null,
    dataAtualizacao: null
  });

  const handleFilter = (filtrosAtualizados) => {
    setFiltros(filtrosAtualizados);
  };
  return (
    <div className='h-full overflow-y-auto'>
      <Title text="Anotações"/>
      <FiltroAnotacao onApplyFilters={handleFilter} />
      <Anotacoes filtros={filtros} />
    </div>
  )
}

export default Anotacao;