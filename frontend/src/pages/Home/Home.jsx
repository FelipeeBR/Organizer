import React, { useState} from 'react';
import Title from '../../components/Title';
import Tarefas from '../../components/Tarefas';
import ModalTarefa from '../../components/Modal/ModalTarefa';
import FiltroTarefa from '../../components/FiltroTarefa';


const Home = () => {
  const [filters, setFilters] = useState({ priority: "", date: "" });

  const handleApplyFilters = (newFilters) => {
      setFilters(newFilters);
  };

  return (
    <div className='bg-gray-200 h-full overflow-y-auto'>
        <div>
          <Title text="Início" />
          <ModalTarefa/>
          <FiltroTarefa onApplyFilters={handleApplyFilters}/>
          <Tarefas filters={filters}/>
        </div>
    </div>
  )
}

export default Home;