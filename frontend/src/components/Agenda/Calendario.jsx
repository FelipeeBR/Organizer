import React, { useEffect } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import brLocale from '@fullcalendar/core/locales/pt-br';
import { useDispatch, useSelector } from 'react-redux';
import { getAgendas } from '../../features/agendaSlice';
import { getAllTarefas } from '../../features/tarefaSlice';


const Calendario = () => {
  const agendas = useSelector((state) => state.agenda.list) ?? [];
  const tarefas = useSelector((state) => state.tarefa.list) ?? [];
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAgendas = async () => {
      const tokenData = JSON.parse(localStorage.getItem("user"));
      const token = tokenData?.token;
      if (!token) {
        console.error("Token não encontrado");
        return;
      }
      await dispatch(getAgendas(token));
      await dispatch(getAllTarefas(token));
    };
    fetchAgendas();
  }, [dispatch]);

  const eventos = [
    ...(Array.isArray(agendas) ? agendas.map(agenda => ({
      title: agenda.description,
      start: agenda.date,
      extendedProps: { type: "agenda" }
    })) : []),
  
    ...(Array.isArray(tarefas) ? tarefas.map(tarefa => ({
      title: tarefa.title,
      start: tarefa.date,
      extendedProps: { type: "tarefa" }
    })) : [])
  ];  
  console.log(eventos)

  return (
    <div className='bg-white p-4 rounded-lg mt-4'>
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView='dayGridMonth'
            weekends={true}
            events={eventos}
            eventContent={renderEventContent}
            locale={brLocale}
            timeZone="America/Sao_Paulo"
        />
    </div>  
  )
}

export default Calendario;

function renderEventContent(eventInfo) {
  return (
    <div className={`rounded text-white ${eventInfo.event.extendedProps.type === "agenda" ? 'bg-blue-600' : 'bg-green-600'}`}>
      <i>{eventInfo.event.title}</i>
    </div>
  );
}