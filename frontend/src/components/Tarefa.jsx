import React from 'react';
import { Draggable } from "@hello-pangea/dnd";
import { FaEdit, FaTrash, FaExclamationCircle, FaClock, FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { deleteTarefa } from '../features/tarefaSlice';
import { useContextApp } from "../context/AppContext";
import { format, addDays } from 'date-fns';

const getTaskStatusDetails = (task) => {
  const taskDate = addDays(new Date(task.date), 1);
  if (task.status === "COMPLETED") {
    return {
      icon: FaCheckCircle,
      color: "text-green-500",
      message: `Até o dia ${format(taskDate, "dd/MM/yyyy")}`,
    };
  } else if (taskDate > new Date()) {
    return {
      icon: FaClock,
      color: "text-blue-500",
      message: `Até o dia ${format(taskDate, "dd/MM/yyyy")}`,
    };
  } else {
    return {
      icon: FaExclamationCircle,
      color: "text-red-500",
      message: `Até o dia ${format(taskDate, "dd/MM/yyyy")}`,
    };
  }
};

const Tarefa = ({ task, index }) => {
  const { icon: Icon, color, message } = getTaskStatusDetails(task);
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
        <div className={`flex items-center ${color} gap-2`}>
          <Icon />
          <p className="ml-2">{message}</p>
        </div>
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