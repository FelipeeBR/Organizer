import { FaPlus, FaTimes } from "react-icons/fa";
import { BiSolidBookAdd } from "react-icons/bi";
import React, { useEffect } from 'react';
import { useContextApp } from '../../context/AppContext';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { registerDisciplina, getDisciplina, updateDisciplina } from "../../features/disciplinaSlice";
import { toast } from "react-toastify";


const ModalDisciplina = () => {
  const { isModalDisciplina, isModalDisciplinaEdit, editDisciplinaId, openClose} = useContextApp();
  const modalState = isModalDisciplina ? "isModalDisciplina" : isModalDisciplinaEdit ? "isModalDisciplinaEdit" : null;
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.disciplina);
  const token = localStorage.getItem('user');
  const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
      reset,
  } = useForm({ defaultValues: {
      title: "",
      content:"" 
    },});

    
    const onSubmit = async (data) => {
      const parsedUser = JSON.parse(token);
      const token2 = parsedUser.token;
      if (isModalDisciplina) {
        const result = await dispatch(registerDisciplina({ ...data, token: token2 }));
        if (result.meta.requestStatus === "fulfilled") {
          openClose("isModalDisciplina");
          reset();
          toast.success('Disciplina criada com sucesso');
        } else {
          console.error(result.message);
          toast.error('Erro ao criar disciplina');
        }
      } else if (isModalDisciplinaEdit) {
        const result = await dispatch(updateDisciplina({id: editDisciplinaId, disciplinaData: data, token: token2 })); 
        if (result.meta.requestStatus === "fulfilled") {
          openClose("isModalDisciplinaEdit");
          reset({
            title: result.payload.name,
            content: result.payload.details,
          });
          toast.success('Disciplina atualizada com sucesso');
        } else {
          console.error(result.message);
          toast.error('Erro ao atualizar disciplina');
        }
      }
    };

    useEffect(() => {
      const fetchDisciplina = async () => {
        const parsedUser = JSON.parse(token);
        const token2 = parsedUser.token;
          if(isModalDisciplinaEdit) {
              try {
                  const result = await dispatch(getDisciplina({id: editDisciplinaId, token: token2}));
                  const disciplina = result.payload;
                  setValue("title", disciplina?.name || "");
                  setValue("content", disciplina?.details || "");
              } catch (error) {
                  console.error("Erro ao buscar disciplina:", error);
              }
          }else {
            reset({});
          }
      };
  
      fetchDisciplina();
    }, [isModalDisciplinaEdit, editDisciplinaId, dispatch, token, setValue, reset]);

    return (
      <div
        className={`bg-[rgba(0,0,0,0.5)] min-h-screen w-full flex items-center justify-center fixed top-0 left-0 ${
          modalState ? "block opacity-100 z-10 show-modal" : "-z-10 opacity-0 hidden hide-modal"
        }`}
      >
        {isModalDisciplina && (
          <ModalContent
            title="Adicionar"
            onClose={() => openClose("isModalDisciplina")}
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            loading={loading}
            error={error}
            errors={errors}
          />
        )}
        {isModalDisciplinaEdit && (
          <ModalContent
            title="Editar"
            onClose={() => openClose("isModalDisciplinaEdit")}
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

export default ModalDisciplina;


const ModalContent = ({ title, onClose, onSubmit, register, loading, error, errors }) => (
  <div className="bg-white p-8 rounded-lg md:w-[700px] w-[300px] content">
    <div className="flex items-center justify-between">
      <BiSolidBookAdd className="text-2xl text-slate-800" />
      <h4 className="text-slate-800 text-xl">{title} disciplina</h4>
      <FaTimes className="text-2xl text-slate-800 cursor-pointer" onClick={onClose} />
    </div>

    <div className="my-5">
      <form onSubmit={onSubmit} className="flex flex-col gap-y-4">
        <div>
          <label className="text-lg text-slate-800">Nome</label>
          <input
            type="text"
            name="title"
            className="w-full h-10 px-8 py-4 rounded-lg font-medium bg-gray-200 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            placeholder="Nome"
            {...register("title", { required: true })}
          />
          {errors.name && <p className="text-red-500 text-sm">Preencha o nome</p>}
        </div>
        <div>
          <label className="text-lg text-slate-800">Descrição</label>
          <textarea
            type="text"
            name="content"
            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-200 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            placeholder="Descrição"
            {...register("content")}
            
          ></textarea>
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
