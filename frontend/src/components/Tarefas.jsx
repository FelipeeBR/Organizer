import React, { useState }  from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import Tarefa from './Tarefa';

const Tarefas = () => {
    const [newTask, setNewTask] = useState("");
    const [tasks, setTasks] = useState([
        { id: "0", name: "Estudar React", status: 1 },
        { id: "1", name: "Status da Task", status: 2 },
        { id: "2", name: "Terminar Sistema", status: 3 },
    ]);

    const column1Tasks = tasks.filter((task) => task.status === 1);
    const column2Tasks = tasks.filter((task) => task.status === 2);
    const column3Tasks = tasks.filter((task) => task.status === 3);

    function handleAddTask(event) {
        event.preventDefault();
    
        if (newTask === "") return;
    
        const newItem = {
          id: `${tasks.length + 1}`,
          name: newTask,
          status: 1,
        };
    
        setTasks((prevTasks) => [...prevTasks, newItem]);
        setNewTask("");
      }

    function reorder(list, startIndex, endIndex) {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    }
    
    function onDragEnd(result) {
        if (!result.destination) return;
    
        const { source, destination } = result;

        const getColumnTasks = (columnId) => {
            switch (columnId) {
              case "column1":
                return column1Tasks;
              case "column2":
                return column2Tasks;
              case "column3":
                return column3Tasks;
              default:
                return [];
            }
        };
    
        if(source.droppableId === destination.droppableId) {
            const tasksToReorder = getColumnTasks(source.droppableId);
        
            const reordered = reorder(tasksToReorder, source.index, destination.index);
        
            const updatedTasks = tasks.map((task) => {
              const reorderedTask = reordered.find((t) => t.id === task.id);
              if (reorderedTask) {
                return reorderedTask;
              }
              return task;
            });
        
            setTasks(updatedTasks);
        } else {
            const movedTask = tasks.find((task) => task.id === result.draggableId);
        
            if (movedTask) {
              const updatedTasks = tasks.map((task) => {
                if (task.id === movedTask.id) {
                  let newStatus = 0;
                  if (destination.droppableId === "column1") newStatus = 1;
                  else if (destination.droppableId === "column2") newStatus = 2;
                  else if (destination.droppableId === "column3") newStatus = 3;
        
                  return {
                    ...task,
                    status: newStatus,
                  };
                }
                return task;
              });
        
              setTasks(updatedTasks);
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