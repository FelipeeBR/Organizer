import React from 'react';
import Calendario from '../../components/Agenda/Calendario';
import Title from '../../components/Title';
import Agendas from '../../components/Agenda/Agendas';
import ModalAgenda from '../../components/Modal/ModalAgenda';

const Agenda = () => {
  return (
    <div>
      <Title text={"Agenda"}/>
      <ModalAgenda/>
      <div className='md:flex flex flex-col'>
        <div className='md:w-1/2 w-full'>
          <Calendario/>
        </div>
        <div className='md:w-1/2 w-full'>
          <Agendas/>
        </div>
      </div>
    </div>
  )
}

export default Agenda;
