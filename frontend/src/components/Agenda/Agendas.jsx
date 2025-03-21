import React, { useEffect, useState } from 'react';
import CardAgenda from './CardAgenda';
import { useDispatch, useSelector } from 'react-redux';
import { getAgendas } from '../../features/agendaSlice';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ITEMS_PER_PAGE = 5;

const Agendas = () => {
  const dispatch = useDispatch();
  const agendas = useSelector((state) => state.agenda.list);
  const [currentPage, setCurrentPage] = useState(1);

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

  console.log(agendas)

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedAgendas = Array.isArray(agendas) ? agendas.slice(startIndex, startIndex + ITEMS_PER_PAGE) : [];

  const totalPages = Math.ceil((agendas?.length || 0) / ITEMS_PER_PAGE);

  return (
    <div className="m-4">
      <div className="grid grid-cols-1 lg:grid-cols-1 sm:grid-cols-1 gap-4">
        {agendas && agendas.length > 0 ? (
          paginatedAgendas?.map((agenda) => (
            <CardAgenda key={agenda.id} info={agenda} />
          ))
        ): (
          <p className="text-center text-slate-800 font-semibold">Nenhuma agenda encontrada</p>
        )}
      </div>
      <div className="flex justify-center mt-4 gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded disabled:opacity-50"
        >
          <FaChevronLeft />
        </button>
        <span className="px-4 py-2">{`Página ${currentPage} de ${totalPages}`}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded disabled:opacity-50"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Agendas;