import React from 'react';
import { Draggable } from "@hello-pangea/dnd";
import { FaEdit, FaTrash, FaExclamationCircle, FaClock } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { deleteTarefa } from '../features/tarefaSlice';
import { useContextApp } from "../context/AppContext";
import { format } from 'date-fns';


const Tarefa = ({ task, index }) => {
  const dispatch = useDispatch();
  const { openClose } = useContextApp()

  const handleEditTarefa = async (id) => {
    openClose("isModalTarefaEdit", id);
  };

  const handleDeleteTarefa = async (id) => {
    const token = JSON.parse(localStorage.getItem('user')).token;
    const res = await dispatch(deleteTarefa({ id, token }));

    if(res.meta.requestStatus === 'fulfilled') {
        toast.success('Tarefa foi excluída');
    } else {
        toast.error(res.payload || 'Erro ao deletar Tarefa');
    }
  };

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <div
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        className="w-full bg-white rounded-lg shadow-md flex flex-col justify-between border border-slate-300 p-4"
      >
        <p className="font-medium">{task.title}</p>
        {new Date(task.date) > new Date() ? (
          <div className="flex items-center text-blue-500 gap-2">
            <FaClock/>
            <p className="ml-2">Até o dia {format(new Date(task.date),"dd/MM/yyyy")}</p>
          </div>
        ) : (
          <div className='flex items-center text-red-500 gap-2'>
            <FaExclamationCircle/>
            <p className="ml-2">Até o dia {format(new Date(task.date),"dd/MM/yyyy")}</p>
          </div>
        )}
        <div className="mt-4 flex gap-2">
          <button
          onClick={() => handleEditTarefa(task.id)}
          className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all focus:ring focus:ring-blue-200"
          >
          <FaEdit />
          </button>
          <button
          onClick={() => handleDeleteTarefa(task.id)}
          className="flex items-center justify-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all focus:ring focus:ring-red-200"
          >
          <FaTrash />
          </button>
        </div>
      </div>
      )}
    </Draggable>
  )
}

export default Tarefa