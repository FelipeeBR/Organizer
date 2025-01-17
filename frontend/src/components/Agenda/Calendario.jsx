import React from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import brLocale from '@fullcalendar/core/locales/pt-br';

const events = [
  { title: 'Terminar esse sistema 1', start: new Date() },
  { title: 'Terminar esse sistema 2', start: new Date() },
]

const Calendario = () => {
  return (
    <div>
        <h1>Calendário</h1>
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView='dayGridMonth'
            weekends={false}
            events={events}
            eventContent={renderEventContent}
            locale={brLocale}
        />
</div>
  )
}

export default Calendario;

function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
}