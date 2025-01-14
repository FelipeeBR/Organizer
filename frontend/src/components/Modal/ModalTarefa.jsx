import { FaPlus, FaTimes } from "react-icons/fa";
import { RiTaskFill } from "react-icons/ri";
import React, { useEffect, useState } from 'react';
import { useContextApp } from '../../context/AppContext';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { createTarefa, updateTarefa, getTarefa } from "../../features/tarefaSlice";
import { getDisciplinas } from "../../features/disciplinaSlice";
import { useParams } from 'react-router-dom';
import { format, addDays } from "date-fns";
import { toast } from "react-toastify";


const ModalTarefa = () => {
  const { isModalTarefa, isModalTarefaEdit, editTarefaId, openClose} = useContextApp();
  const modalState = isModalTarefa ? "isModalTarefa" : isModalTarefaEdit ? "isModalTarefaEdit" : null;
  const [disciplinas, setDisciplinas] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, error } = useSelector((state) => state.tarefa);
  const token = localStorage.getItem('user');
  const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
      reset
  } = useForm({ defaultValues: {
      title: "",
      description:"",
      status: "PENDING", 
      priority: "BAIXA",
      disciplinaId: id || null,
      date: format(new Date(), 'yyyy-MM-dd')
    },});

    
    const onSubmit = async (data) => {
      const parsedUser = JSON.parse(token);
      const token2 = parsedUser.token;
      //data.disciplinaId = id;
      if (isModalTarefa) {
        const result = await dispatch(createTarefa({ tarefaData: data, token: token2 }));
        if (result.meta.requestStatus === "fulfilled") {
          openClose("isModalTarefa");
          reset();
          toast.success('Tarefa criada com sucesso');
        } else {
          console.error(result.message);
          toast.error('Erro ao criar tarefa');
        }
      } else if (isModalTarefaEdit) {
        const result = await dispatch(updateTarefa({id: editTarefaId, tarefaData: data, token: token2 })); 
        if (result.meta.requestStatus === "fulfilled") {
          openClose("isModalTarefaEdit");
          reset();
          toast.success('Tarefa atualizada com sucesso');
        } else {
          console.error(result.message);
          toast.error('Erro ao atualizar tarefa');
        }
      }
    };

    useEffect(() => {
      const fetchDisciplina = async () => {
        const parsedUser = JSON.parse(token);
        const token2 = parsedUser.token;
          if (isModalTarefaEdit) {
              try {
                  const result = await dispatch(getTarefa({id: editTarefaId, token: token2}));
                  const tarefa = result.payload;
                  setValue("title", tarefa?.title || "");
                  setValue("description", tarefa?.description || "");
                  setValue("status", tarefa?.status || "");
                  setValue("priority", tarefa?.priority || "");
                  setValue("date", tarefa?.date ? format(addDays(new Date(tarefa.date), 1), 'yyyy-MM-dd') : "");
              } catch (error) {
                  console.error("Erro ao buscar tarefa:", error);
              }
          }
      };
  
      fetchDisciplina();
    }, [isModalTarefaEdit, editTarefaId, dispatch, token, setValue]);

    useEffect(() => {
      const fetchDisciplinas = async () => {
          const tokenData = JSON.parse(localStorage.getItem('user'));
          const token = tokenData?.token;
          if (!token) {
              console.error('Token não encontrado');
              return;
          }
          const res = await dispatch(getDisciplinas(token));
          if(res.meta.requestStatus === 'fulfilled') {
            setDisciplinas(res.payload);
          }else{
            console.error(res.payload || 'Erro ao buscar disciplinas');
          }
      };
      fetchDisciplinas();
    }, [dispatch]);
    console.log(disciplinas);
    return (
      <div
        className={`bg-[rgba(0,0,0,0.5)] min-h-screen w-full flex items-center justify-center fixed top-0 left-0 ${
          modalState ? "block opacity-100 z-10 show-modal" : "-z-10 opacity-0 hidden hide-modal"
        }`}
      >
        {isModalTarefa && (
          <ModalContent
            title="Adicionar"
            onClose={() => openClose("isModalTarefa")}
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            loading={loading}
            error={error}
            errors={errors}
            disciplinas={disciplinas}
          />
        )}
        {isModalTarefaEdit && (
          <ModalContent
            title="Editar"
            onClose={() => openClose("isModalTarefaEdit")}
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            loading={loading}
            error={error}
            errors={errors}
            disciplinas={disciplinas}
          />
        )}
      </div>
    );    
}

export default ModalTarefa;


const ModalContent = ({ title, onClose, onSubmit, register, loading, error, errors, disciplinas }) => (
  <div className="bg-white p-8 rounded-lg md:w-[700px] w-[300px] content">
    <div className="flex items-center justify-between">
      <RiTaskFill className="text-2xl text-slate-800" />
      <h4 className="text-slate-800 text-xl">{title} tarefa</h4>
      <FaTimes className="text-2xl text-slate-800 cursor-pointer" onClick={onClose} />
    </div>

    <div className="my-5">
      <form onSubmit={onSubmit} className="flex flex-col gap-y-4">
        <div>
          <input
            type="text"
            name="title"
            className="w-full h-10 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            placeholder="Nome da tarefa"
            {...register("title", { required: true })}
          />
          {errors.name && <p className="text-red-500 text-sm">Preencha o nome</p>}
        </div>
        <div>
          <textarea
            type="text"
            name="description"
            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            placeholder="Descrição"
            {...register("description")}
          ></textarea>
        </div>
        <div>
          <label className="text-slate-800 text-md font-bold">Disciplina</label>
          <select 
            name="disciplinaId"
            {...register("disciplinaId")}
            className="w-full h-10 px-3 rounded-lg font-medium bg-gray-100 border border-gray-300 text-sm placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white"
          >
            <option value="0">Selecione uma disciplina</option>
            {disciplinas.map((disciplina) => (
              <option key={disciplina.id} value={disciplina.id}>{disciplina.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-slate-800 text-md font-bold">Prioridade</label>
          <select
            name="priority"
            {...register("priority")}
            className="w-full h-10 px-3 rounded-lg font-medium bg-gray-100 border border-gray-300 text-sm placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white"
          >
            <option value="BAIXA">Baixa</option>
            <option value="MEDIA">Média</option>
            <option value="ALTA">Alta</option>
          </select>
        </div>
        
        <div>
            <label className="text-slate-800 text-md font-bold">Status</label>
            <select
                name="status"
                {...register("status")}
                className="w-full h-10 px-3 rounded-lg font-medium bg-gray-100 border border-gray-300 text-sm placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white"
            >
                <option value="PENDING">Pendente</option>
                <option value="IN_PROGRESS">Fazendo</option>
                <option value="COMPLETED">Concluída</option>
            </select>
        </div>

        <div>
            <label className="text-slate-800 text-md font-bold">Prazo</label>
            <input type="date" {...register("date")} className="w-full h-10 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"/>
        </div>

        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={loading}
            className="h-10 px-8 text-gray-100 text-lg gap-2 flex items-center outline-none rounded-md bg-green-500 cursor-pointer border-0 hover:bg-green-400 duration-300"
          >
            <FaPlus /> {loading ? "Carregando..." : title}
          </button>
        </div>
        {error && <p className="text-red-600 text-sm">{error.error || "Ocorreu um erro"}</p>}
      </form>
    </div>
  </div>
);
