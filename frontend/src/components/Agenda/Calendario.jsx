import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import brLocale from '@fullcalendar/core/locales/pt-br';
import { useDispatch, useSelector } from 'react-redux';
import { getAgendas } from '../../features/agendaSlice';
import { getAllTarefas } from '../../features/tarefaSlice';
import { FaTimes } from "react-icons/fa";


const Calendario = () => {
  const agendas = useSelector((state) => state.agenda.list) ?? [];
  const tarefas = useSelector((state) => state.tarefa.list) ?? [];
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);
  const [eventoSelecionado, setEventoSelecionado] = useState(null);

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
    ...(Array.isArray(agendas)
      ? agendas.map((agenda) => ({
          title: agenda.description,
          start: agenda.date,
          priority: agenda.tipo,
          extendedProps: { type: "agenda", details: agenda.description },
        }))
      : []),

    ...(Array.isArray(tarefas)
      ? tarefas.map((tarefa) => ({
          title: tarefa.title,
          start: tarefa.date,
          priority: tarefa.priority,
          extendedProps: { type: "tarefa", details: tarefa.description },
        }))
      : []),
  ];

  const handleEventClick = (clickInfo) => {
    const eventDate = new Date(clickInfo.event.start);
    eventDate.setDate(eventDate.getDate() + 1);
    
    setEventoSelecionado({
      title: clickInfo.event.title,
      date: eventDate.toLocaleDateString("pt-BR"),
      details: clickInfo.event.extendedProps.details || "Sem detalhes",
      priority: clickInfo.event.extendedProps.priority,
      type: clickInfo.event.extendedProps.type,
    });
    setModalOpen(true);
  };

  return (
    <div className="bg-white p-4 rounded-lg mt-4">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={eventos}
        eventContent={renderEventContent}
        locale={brLocale}
        timeZone="America/Sao_Paulo"
        eventClick={handleEventClick}
      />
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300">
          <div className="relative bg-white p-6 rounded-lg shadow-2xl w-full max-w-md animate-fadeIn">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl font-bold"
            >
              <FaTimes className="text-2xl text-slate-800 cursor-pointer"/>
            </button>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {eventoSelecionado.title}
            </h2>
            <p className="text-sm text-gray-600">
              <strong>Data:</strong> {eventoSelecionado.date}
            </p>
          
            {eventoSelecionado?.type === "tarefa" && (
              <p className="text-sm text-gray-600">
                <strong>Prioridade:</strong> {eventoSelecionado.priority}
              </p>
            )}

            {eventoSelecionado?.type === "tarefa" && (
              <p className="text-sm text-gray-600">
                <strong>Detalhes:</strong> {eventoSelecionado?.details}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendario;

function renderEventContent(eventInfo) {
  return (
    <div
      className={`rounded text-white px-2 py-1 truncate max-w-[120px] overflow-hidden text-ellipsis cursor-pointer ${
        eventInfo.event.extendedProps.type === "agenda"
          ? "bg-blue-600"
          : "bg-green-600"
      }`}
    >
      <i>{eventInfo.event.title}</i>
    </div>
  );
}