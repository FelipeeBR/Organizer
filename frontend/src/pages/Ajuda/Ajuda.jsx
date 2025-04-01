import React from 'react';
import Title from '../../components/Title';
import { FaPlus, FaChartLine } from "react-icons/fa";

const Ajuda = () => {
  return (
    <div className='h-full overflow-y-auto'>
        <Title text={"Ajuda"}/>
        <div className='flex mt-3 flex-col items-center justify-center bg-white rounded-lg p-8 sm:p-6 md:p-8'>
            <h1 className='text-2xl font-bold text-center sm:text-xl'>1. Início</h1>
            <p className='text-lg text-center sm:text-base'>
                No início do aplicativo, você pode ver as tarefas pendentes, concluídas e as tarefas concluídas recentemente. 
                Arraste as tarefas entre os quadros para organizar as tarefas.
            </p>
            <p className='text-lg text-center sm:text-base flex flex-col sm:flex-row sm:items-center sm:justify-center'>
                Para adicionar uma nova tarefa, basta clicar no botão 
                <span className="w-12 h-12 rounded-full border flex items-center justify-center border-white text-white bg-slate-700 mt-2 sm:mt-0 sm:ml-2">
                    <FaPlus />
                </span> 
                e preencher os itens.
            </p>
        </div>
        <div className='flex mt-3 flex-col items-center justify-center bg-white rounded-lg p-8 sm:p-6 md:p-8'>
            <h1 className='text-2xl font-bold text-center sm:text-xl'>2. Disciplinas</h1>
            <p className='text-lg text-center sm:text-base'>
                As disciplinas podem ser criadas, editadas e excluidas. Além de poder definir se é uma disciplina obrigatória ou nao. Dependencia ou sem dependencia.
            </p>
            <p className='text-lg text-center sm:text-base'>
                Ao clicar em cima de uma disciplina, ela vai para o quadro de tarefas.
            </p>
            <p className='text-lg text-center sm:text-base flex flex-col sm:flex-row sm:items-center sm:justify-center'>
                Para adicionar uma nova tarefa, basta clicar no botão 
                <span className="w-12 h-12 rounded-full border flex items-center justify-center border-white text-white bg-slate-700 mt-2 sm:mt-0 sm:ml-2">
                    <FaPlus />
                </span> 
                e preencher os itens.
            </p>
        </div>
        <div className='flex mt-3 flex-col items-center justify-center bg-white rounded-lg p-8 sm:p-6 md:p-8'>
            <h1 className='text-2xl font-bold text-center sm:text-xl'>3. Anotações</h1>
            <p className='text-lg text-center sm:text-base'>
                As anotações podem ser criadas, editadas e excluidas.
            </p>
            <p className='text-lg text-center sm:text-base'>
                Ao clicar em cima de uma anotação, ela vai para o editor, onde será possivel visualizar e editar.
            </p>
            <p className='text-lg text-center sm:text-base flex flex-col sm:flex-row sm:items-center sm:justify-center'>
                Para adicionar uma nova anotação, basta clicar no botão 
                <span className="w-12 h-12 rounded-full border flex items-center justify-center border-white text-white bg-slate-700 mt-2 sm:mt-0 sm:ml-2">
                    <FaPlus />
                </span> 
                e preencher os itens.
            </p>
        </div>
        <div className='flex mt-3 flex-col items-center justify-center bg-white rounded-lg p-8 sm:p-6 md:p-8'>
            <h1 className='text-2xl font-bold text-center sm:text-xl'>4. Desempenho</h1>
            <p className='text-lg text-center sm:text-base'>
                O desempenho é para visualizar o aproveitamento, recomendações e tarefas mais prioritarias.
            </p>
            <p className='text-lg text-center sm:text-base flex flex-col sm:flex-row sm:items-center sm:justify-center'>
                Para ver o seu desempenho, basta clicar no botão 
                <div className="flex justify-center mb-6">
                    <button
                        className="flex bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition duration-300 cursor-default"
                    >
                        <FaChartLine className="mr-2" color='#fff' size={20}/>
                        Mostrar meu desempenho
                    </button>
                </div>
            </p>
        </div>
        <div className='flex mt-3 flex-col items-center justify-center bg-white rounded-lg p-8 sm:p-6 md:p-8'>
            <h1 className='text-2xl font-bold text-center sm:text-xl'>5. Agenda</h1>
            <p className='text-lg text-center sm:text-base'>
                As agendas podem ser criadas, editadas e excluidas.
            </p>
            <p className='text-lg text-center sm:text-base'>
                No calendario, voce pode ver as tarefas marcadas em verde e os compromissos marcados em azul.
            </p>
            <p className='text-lg text-center sm:text-base'>
                Você consegue definir entre trabalho, prova, evento, reunião, aula e importante.
            </p>
            <p className='text-lg text-center sm:text-base flex flex-col sm:flex-row sm:items-center sm:justify-center'>
                Para adicionar uma nova agenda, basta clicar no botão 
                <span className="w-12 h-12 rounded-full border flex items-center justify-center border-white text-white bg-slate-700 mt-2 sm:mt-0 sm:ml-2">
                    <FaPlus />
                </span> 
                e preencher os itens.
            </p>
            <p className='text-lg text-center sm:text-base'>
                Al clicar em cima de algo marcado no calendario, é possivel visualizar com mais detalhes a tarefa ou agenda do dia.
            </p>
        </div>
    </div>
  )
}

export default Ajuda;