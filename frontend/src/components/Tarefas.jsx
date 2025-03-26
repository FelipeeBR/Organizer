import React, { useEffect, useState }  from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import Tarefa from './Tarefa';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTarefas, updateTarefa } from '../features/tarefaSlice';
import EmptyImg from '../images/emptyBox.png';
import { FaHourglassEnd, FaCheckSquare, FaBan } from "react-icons/fa";

const Tarefas = ({ filters }) => {
    const { priority, date } = filters;
    
    const dispatch = useDispatch();
    const tarefas = useSelector((state) => state.tarefa.list);
    const [listTarefas, setListTarefas] = useState([]);
   

    const column1Tasks = listTarefas.filter((task) => task.status === "PENDING");
    const column2Tasks = listTarefas.filter((task) => task.status === "IN_PROGRESS");
    const column3Tasks = listTarefas.filter((task) => task.status === "COMPLETED");

    useEffect(() => {
        const filteredTasks = tarefas.filter((task) => {
            const taskDate = new Date(task.date).toISOString().split('T')[0];
            const hasPriority = priority === '' || task.priority === priority;
            const hasDate = date === '' || taskDate === date;
    
            return hasPriority && hasDate;
        });
        setListTarefas(filteredTasks);     
    }, [date, priority, tarefas]);

    useEffect(() => {
        setListTarefas(tarefas);
    }, [tarefas]);

    useEffect(() => {
        const fetchTarefas = async () => {
            const tokenData = JSON.parse(localStorage.getItem('user'));
            const token = tokenData?.token;
            if(!token) {
                console.error('Token não encontrado');
                return;
            }
            const res = await dispatch(getAllTarefas(token));
            if(res.meta.requestStatus === 'fulfilled') {
                setListTarefas(res.payload);
            }else{
                console.error(res.payload || 'Erro ao buscar tarefas');
            }
        }
        fetchTarefas();
    }, [dispatch]);

    const updateTarefaStatus = async (id, status) => {
        const tarefa = { ...listTarefas.find((task) => task.id === id), status };
        const tokenData = JSON.parse(localStorage.getItem('user'));
        const token = tokenData?.token;
        if(!token) {
            console.error('Token não encontrado');
            return;
        }
        try {
            const res = await dispatch(updateTarefa({ id: id, tarefaData: tarefa, token: token }));
    
            if (res.meta.requestStatus === 'fulfilled') {
                setListTarefas(res.payload);
            } else {
                console.error(res.payload || 'Erro ao atualizar a tarefa');
            }
        } catch (error) {
            console.error('Erro inesperado ao atualizar a tarefa:', error);
        }
    };
    
    
    async function onDragEnd(result) {
        if(!result.destination) return;
    
        const { source, destination } = result;
    
        if(source.droppableId !== destination.droppableId) {
            const movedTask = listTarefas.find((task) => task.id.toString() === result.draggableId);
    
            if(movedTask) {
                let newStatus = "";
                if (destination.droppableId === "column1") newStatus = "PENDING";
                else if(destination.droppableId === "column2") newStatus = "IN_PROGRESS";
                else if(destination.droppableId === "column3") newStatus = "COMPLETED";
    
                await updateTarefaStatus(movedTask.id, newStatus);

                const updatedTasks = listTarefas.map((task) =>
                    task.id === movedTask.id
                        ? { ...task, status: newStatus }
                        : task
                );
                setListTarefas(updatedTasks);
            }
        }
    }
    

    return (
        <div className="w-full h-screen flex flex-col items-center px-4 pt-5">
            <div className="flex flex-wrap sm:flex-nowrap justify-center gap-5 w-full max-w-7xl">
                <DragDropContext onDragEnd={onDragEnd}>
                {/*Coluna 1*/}
                <section className="bg-gray-50 p-5 rounded-lg w-full sm:w-1/2 md:w-1/3 flex-1 min-h-[600px] shadow-lg">
                    <h1 className="text-xl font-bold flex items-center mb-4">
                        Pendente <FaBan size={20} color={'#FF0000'} />
                    </h1>
                    <Droppable droppableId="column1" type="list" direction="vertical">
                    {(provided) => (
                        <article ref={provided.innerRef} {...provided.droppableProps} className="space-y-2 min-h-[50px]">
                        {column1Tasks.length > 0 ? (
                            column1Tasks.map((task, index) => <Tarefa key={task.id} task={task} index={index} />)
                        ) : (
                            <div className="flex flex-col text-center items-center justify-center">
                            <div className="flex w-10">
                                <img src={EmptyImg} alt="empty" />
                            </div>
                            <div>Nenhuma tarefa</div>
                            </div>
                        )}
                        {provided.placeholder}
                        </article>
                    )}
                    </Droppable>
                </section>

                {/*Coluna 2*/}
                <section className="bg-gray-50 p-5 rounded-lg w-full sm:w-1/2 md:w-1/3 flex-1 min-h-[600px] shadow-lg">
                    <h1 className="text-xl font-bold flex items-center mb-4">
                        Fazendo <FaHourglassEnd size={20} color={'#000080'} />
                    </h1>
                    <Droppable droppableId="column2" type="list" direction="vertical">
                    {(provided) => (
                        <article ref={provided.innerRef} {...provided.droppableProps} className="space-y-2 min-h-[50px]">
                        {column2Tasks.length > 0 ? (
                            column2Tasks.map((task, index) => <Tarefa key={task.id.toString()} task={task} index={index} />)
                        ) : (
                            <div className="flex flex-col text-center items-center justify-center">
                            <div className="flex w-10">
                                <img src={EmptyImg} alt="empty" />
                            </div>
                            <div>Nenhuma tarefa</div>
                            </div>
                        )}
                        {provided.placeholder}
                        </article>
                    )}
                    </Droppable>
                </section>

                {/*Coluna 3*/}
                <section className="bg-gray-50 p-5 rounded-lg w-full sm:w-1/2 md:w-1/3 flex-1 min-h-[600px] shadow-lg">
                    <h1 className="text-xl font-bold flex items-center mb-4">
                        Concluído <FaCheckSquare size={20} color={'#008000'} />
                    </h1>
                    <Droppable droppableId="column3" type="list" direction="vertical">
                    {(provided) => (
                        <article ref={provided.innerRef} {...provided.droppableProps} className="space-y-2 min-h-[50px]">
                        {column3Tasks.length > 0 ? (
                            column3Tasks.map((task, index) => <Tarefa key={task.id} task={task} index={index} />)
                        ) : (
                            <div className="flex flex-col text-center items-center justify-center">
                            <div className="flex w-10">
                                <img src={EmptyImg} alt="empty" />
                            </div>
                            <div>Nenhuma tarefa</div>
                            </div>
                        )}
                        {provided.placeholder}
                        </article>
                    )}
                    </Droppable>
                </section>
                </DragDropContext>
            </div>
        </div>
    )
}

export default Tarefas;