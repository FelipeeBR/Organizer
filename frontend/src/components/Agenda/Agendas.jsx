import React from 'react';

const events = [
    { description: 'Terminar esse sistema 1', start: new Date() },
    { description: 'Terminar esse sistema 2', start: new Date() },
  ]

const Agendas = () => {
  return (
    <div className='bg-white rounded-lg shadow-md flex flex-col justify-between relative p-4'>
        {events.map((event, index) => (
            <div key={index}>
                <p>{event.description}</p>
            </div>
        ))}
    </div>
  )
}

export default Agendas;