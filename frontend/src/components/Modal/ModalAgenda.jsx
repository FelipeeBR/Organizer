import { FaPlus, FaTimes } from "react-icons/fa";
import { BiSolidBookAdd } from "react-icons/bi";
import React, { useEffect } from 'react';
import { useContextApp } from '../../context/AppContext';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { createAgenda, updateAgenda, getAgenda } from "../../features/agendaSlice";
import { toast } from "react-toastify";


const ModalAgenda = () => {
  const { isModalAgenda, isModalAgendaEdit, editAgendaId, openClose} = useContextApp();
  const modalState = isModalAgenda ? "isModalAgenda" : isModalAgendaEdit ? "isModalAgendaEdit" : null;
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.agenda);
  const token = localStorage.getItem('user');
  const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
      reset,
  } = useForm({ defaultValues: {
      description: "",
      date: new Date(), 
    },});

    
    const onSubmit = async (data) => {
      const parsedUser = JSON.parse(token);
      const token2 = parsedUser.token;
      data.token = token2;
      data.date = new Date(data.date).toISOString(); 
      if (isModalAgenda) {
        const result = await dispatch(createAgenda({ agendaData: data, token: token2 }));
        if (result.meta.requestStatus === "fulfilled") {
          openClose("isModalAgenda");
          reset();
          toast.success('Item adicionado com sucesso');
        } else {
          console.error(result);
          toast.error('Erro ao criar');
        }
        console.log(data);
      } else if (isModalAgendaEdit) {
        const result = await dispatch(updateAgenda({id: editAgendaId, agendaData: data, token: token2 })); 
        if (result.meta.requestStatus === "fulfilled") {
          openClose("isModalAgendaEdit");
          reset({
            title: result.payload.name,
            content: result.payload.details,
          });
          toast.success('Item atualizado com sucesso');
        } else {
          console.error(result.message);
          toast.error('Erro ao atualizar');
        }
      }
    };

    useEffect(() => {
      const fetchAgenda = async () => {
        const parsedUser = JSON.parse(token);
        const token2 = parsedUser.token;
          if (isModalAgendaEdit) {
              try {
                  const result = await dispatch(getAgenda({id: editAgendaId, token: token2}));
                  const agenda = result.payload;
                  setValue("description", agenda?.description || "");
                  setValue("date", agenda?.date || "");
              } catch (error) {
                  console.error("Erro ao buscar agenda:", error);
              }
          }else {
            reset({});
          }
      };
  
      fetchAgenda();
    }, [isModalAgendaEdit, editAgendaId, dispatch, token, setValue, reset]);

    return (
      <div
        className={`bg-[rgba(0,0,0,0.5)] min-h-screen w-full flex items-center justify-center fixed top-0 left-0 ${
          modalState ? "block opacity-100 z-10 show-modal" : "-z-10 opacity-0 hidden hide-modal"
        }`}
      >
        {isModalAgenda && (
          <ModalContent
            title="Adicionar"
            onClose={() => openClose("isModalAgenda")}
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            loading={loading}
            error={error}
            errors={errors}
          />
        )}
        {isModalAgendaEdit && (
          <ModalContent
            title="Editar"
            onClose={() => openClose("isModalAgendaEdit")}
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            loading={loading}
            error={error}
            errors={errors}
          />
        )}
      </div>
    );    
}

export default ModalAgenda;


const ModalContent = ({ title, onClose, onSubmit, register, loading, error, errors }) => (
  <div className="bg-white p-8 rounded-lg md:w-[700px] w-[300px] content">
    <div className="flex items-center justify-between">
      <BiSolidBookAdd className="text-2xl text-slate-800" />
      <h4 className="text-slate-800 text-xl">{title} agenda</h4>
      <FaTimes className="text-2xl text-slate-800 cursor-pointer" onClick={onClose} />
    </div>

    <div className="my-5">
      <form onSubmit={onSubmit} className="flex flex-col gap-y-4">
        <div>
          <label className="text-lg text-slate-800">Descrição</label>
          <textarea
            type="text"
            name="description"
            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            placeholder="Descrição"
            {...register("description", { required: true, maxLength: 30 })}
            
          ></textarea>
          {errors.description && <p className="text-red-500 text-sm">Preencha a descrição</p>}
          {errors.description?.type === "maxLength" && <p className="text-red-500 text-sm">Limite de 30 caracteres</p>}
        </div>
        <div>
            <label className="text-lg text-slate-800">Data</label>
            <input {...register("date")} type="datetime-local" className="w-full h-10 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"/>
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
      </form>
    </div>
  </div>
);
