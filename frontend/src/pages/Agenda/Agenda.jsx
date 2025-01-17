import React from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import brLocale from '@fullcalendar/core/locales/pt-br';

const events = [
  { title: 'Terminar esse sistema', start: new Date() }
]

const Agenda = () => {
  return (
    <div>
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
    </div>
  )
}

export default Agenda;

function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
}