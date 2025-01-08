import React, { useState } from 'react';
import "./Tasks.css";
const initialColumns = [
    {
      id: 1,
      title: 'Pendente',
      cards: [
        {
          id: '1-1',
          priority: 'medium',
          title: 'Revisar documento do projeto',
          comments: 1,
          attachments: 1,
          avatar: 'src/images/avatar2.png',
        },
      ],
    },
    {
      id: 2,
      title: 'Fazendo',
      cards: [
        {
          id: '2-1',
          priority: 'high',
          title: 'Implementar componente X',
          comments: 2,
          attachments: 0,
          avatar: 'src/images/avatar3.png',
        },
      ],
    },
    {
      id: 3,
      title: 'Concluído',
      cards: [
        {
          id: '3-1',
          priority: 'low',
          title: 'Configurar API Y',
          comments: 3,
          attachments: 2,
          avatar: 'src/images/avatar.png',
        },
      ],
    },
  ];
  
const Tasks = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [draggingCard, setDraggingCard] = useState(null);

  const handleDragStart = (card, columnId) => {
    setDraggingCard({ ...card, columnId });
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Necessário para permitir o drop
  };

  const handleDrop = (columnId) => {
    if (!draggingCard) return;

    // Verifica se a coluna de origem é diferente da de destino
    if (draggingCard.columnId !== columnId) {
      setColumns((prevColumns) => {
        return prevColumns.map((column) => {
          // Remove o item da coluna de origem
          if (column.id === draggingCard.columnId) {
            return {
              ...column,
              cards: column.cards.filter((card) => card.id !== draggingCard.id),
            };
          }

          // Adiciona o item à coluna de destino
          if (column.id === columnId) {
            return {
              ...column,
              cards: [...column.cards, draggingCard],
            };
          }

          return column;
        });
      });
    }

    setDraggingCard(null); // Limpa o estado do item arrastado
  };

    return (
        <main className="flex gap-14 p-24 w-full h-screen overflow-x-auto items-center justify-center">
            {columns.map((column) => (
                <div
                key={column.id}
                className="flex flex-col gap-18 h-full overflow-y-auto bg-[#f6f8fc] border border-12 shadow-lg p-12 overflow-hidden relative min-w-252 kanban-column"
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(column.id)}
                >
                <div className="kanban-title">
                    <h2>{column.title}</h2>
                    <button className="add-card">
                    <i className="fa-solid fa-plus"></i>
                    </button>
                </div>

                <div className="kanban-cards">
                    {column.cards.map((card) => (
                    <div
                        key={card.id}
                        className={`kanban-card ${card.priority}`}
                        draggable
                        onDragStart={() => handleDragStart(card, column.id)}
                    >
                        <div className={`badge ${card.priority}`}>
                        <span>
                            {card.priority === 'high'
                            ? 'Alta prioridade'
                            : card.priority === 'medium'
                            ? 'Média prioridade'
                            : 'Baixa prioridade'}
                        </span>
                        </div>

                        <p className="card-title">{card.title}</p>

                        <div className="card-infos">
                        <div className="card-icons">
                            <p>
                            <i className="fa-regular fa-comment"></i> {card.comments}
                            </p>
                            <p>
                            <i className="fa-solid fa-paperclip"></i> {card.attachments}
                            </p>
                        </div>

                        <div className="user">
                            <img src={card.avatar} alt="Avatar" />
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
                </div>
            ))}
        </main>
    );
};

export default Tasks;
