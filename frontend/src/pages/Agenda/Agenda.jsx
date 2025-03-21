import React from 'react';
import Calendario from '../../components/Agenda/Calendario';
import Title from '../../components/Title';
import Agendas from '../../components/Agenda/Agendas';
import ModalAgenda from '../../components/Modal/ModalAgenda';
import { FaSquare } from "react-icons/fa";

const Agenda = () => {
  return (
    <div className='h-full overflow-y-auto'>
      <Title text={"Agenda"}/>
      <ModalAgenda/>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <Calendario />
          <div className='flex flex-col'>
            <div className='flex items-center justify-center'>
              <FaSquare className="text-2xl text-green-700" />
              <span className='ml-2'>Tarefas</span>
            </div>
            <div className='flex items-center justify-center'>
              <FaSquare className="text-2xl text-blue-700" />
              <span className='ml-2'>Agendas</span>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <Agendas />
        </div>
      </div>
    </div>
  )
}

export default Agenda;
