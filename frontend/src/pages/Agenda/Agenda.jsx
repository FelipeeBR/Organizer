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
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <Calendario />
        </div>
        <div className="w-full md:w-1/2">
          <Agendas />
        </div>
      </div>
    </div>
  )
}

export default Agenda;
