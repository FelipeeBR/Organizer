import React, { useEffect, useState }  from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import Tarefa from './Tarefa';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTarefas, updateTarefa } from '../features/tarefaSlice';

const Tarefas = () => {
    const dispatch = useDispatch();
    const [newTask, setNewTask] = useState("");
    const tarefas = useSelector((state) => state.tarefa.list);
    const [listTarefas, setListTarefas] = useState([]);
    const [tasks, setTasks] = useState([]);

    const column1Tasks = listTarefas.filter((task) => task.status === "PENDING");
    const column2Tasks = listTarefas.filter((task) => task.status === "IN_PROGRESS");
    const column3Tasks = listTarefas.filter((task) => task.status === "COMPLETED");

    useEffect(() => {
        setListTarefas(tarefas);
    }, [tarefas]);

    useEffect(() => {
        const fetchTarefas = async () => {
            const tokenData = JSON.parse(localStorage.getItem('user'));
            const token = tokenData?.token;
            if (!token) {
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
        if (!token) {
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
        if (!result.destination) return;
    
        const { source, destination } = result;
    
        // Verificar se o item mudou de coluna
        if (source.droppableId !== destination.droppableId) {
            // Obter a tarefa movida pelo ID
            const movedTask = listTarefas.find((task) => task.id.toString() === result.draggableId);
    
            if(movedTask) {
                // Determinar o novo status com base na coluna de destino
                let newStatus = "";
                if (destination.droppableId === "column1") newStatus = "PENDING";
                else if (destination.droppableId === "column2") newStatus = "IN_PROGRESS";
                else if (destination.droppableId === "column3") newStatus = "COMPLETED";
    
                await updateTarefaStatus(movedTask.id, newStatus);

                // Atualizar o estado localmente para refletir a mudança
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
        <div className="w-full h-screen flex flex-col items-center px-4 pt-52">
            <div className="flex flex-wrap justify-center gap-5 w-full max-w-7xl">
                <DragDropContext onDragEnd={onDragEnd}>
                {/*Coluna 1*/}
                <section className="bg-gray-100 p-5 rounded-lg w-full sm:w-[300px] md:w-[400px] flex-1 min-h-[600px] shadow-lg">
                    <h1 className="text-xl font-bold mb-4 text-center">Pendente</h1>
                    <Droppable droppableId="column1" type="list" direction="vertical">
                    {(provided) => (
                        <article
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="space-y-2 min-h-[50px]"
                            >
                                {column1Tasks.length > 0 ? (
                                column1Tasks.map((task, index) => (
                                    <Tarefa key={task.id} task={task} index={index} />
                                ))
                                ) : (
                                <div className="text-center text-gray-500 italic">
                                    Nenhuma tarefa
                                </div>
                                )}
                                {provided.placeholder}
                        </article>
                    )}
                    </Droppable>
                </section>

                {/*Coluna 2*/}
                <section className="bg-gray-100 p-5 rounded-lg w-full sm:w-[300px] md:w-[400px] flex-1 min-h-[300px] shadow-lg">
                    <h1 className="text-xl font-bold mb-4 text-center">Fazendo</h1>
                    <Droppable droppableId="column2" type="list" direction="vertical">
                    {(provided) => (
                        <article
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="space-y-2 min-h-[50px]"
                        >
                            {column2Tasks.length > 0 ? (
                            column2Tasks.map((task, index) => (
                                <Tarefa key={task.id.toString()} task={task} index={index} />
                            ))
                            ) : (
                            <div className="text-center text-gray-500 italic">
                                Nenhuma tarefa
                            </div>
                            )}
                            {provided.placeholder}
                        </article>
                    )}
                    </Droppable>
                </section>

                {/*Coluna 3*/}
                <section className="bg-gray-100 p-5 rounded-lg w-full sm:w-[300px] md:w-[400px] flex-1 min-h-[300px] shadow-lg">
                    <h1 className="text-xl font-bold mb-4 text-center">Concluído</h1>
                    <Droppable droppableId="column3" type="list" direction="vertical">
                    {(provided) => (
                        <article
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="space-y-2 min-h-[50px]"
                        >
                            {column3Tasks.length > 0 ? (
                            column3Tasks.map((task, index) => (
                                <Tarefa key={task.id} task={task} index={index} />
                            ))
                            ) : (
                            <div className="text-center text-gray-500 italic">
                                Nenhuma tarefa
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