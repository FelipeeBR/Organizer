import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import brLocale from '@fullcalendar/core/locales/pt-br';
import { useDispatch, useSelector } from 'react-redux';
import { getAgendas } from '../../features/agendaSlice';


const Calendario = () => {
  const agendas = useSelector((state) => state.agenda.list);
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
    };
    fetchAgendas();
  }, [dispatch]);

  return (
    <div>
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView='dayGridMonth'
            weekends={true}
            events={agendas}
            eventContent={renderEventContent}
            locale={brLocale}
            timeZone="America/Sao_Paulo"
        />
</div>
  )
}

export default Calendario;

function renderEventContent(eventInfo) {
  console.log(eventInfo)
    return (
      <div className='bg-blue-600 rounded text-white'>
        <b className=''>{eventInfo.timeText}</b>
        <i>{eventInfo.event.extendedProps.description}</i>
      </div>
    )
}