import { FaPlus, FaTimes } from "react-icons/fa";
import { BiSolidBookAdd } from "react-icons/bi";
import React, { useState } from 'react';
import { useContextApp } from '../../context/AppContext';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { registerDisciplina } from "../../features/disciplinaSlice";



const ModalDisciplina = () => {
    const { isModalDisciplina, openClose} = useContextApp();
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.disciplina);
    const token = localStorage.getItem('user');
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    
    const onSubmit = async (data) => {
        const parsedUser = JSON.parse(token);
        var token2 = parsedUser.token;
        const result = await dispatch(registerDisciplina({ ...data, token:token2 }));
        if(result.meta.requestStatus === "fulfilled") { 
            openClose("isModalDisciplina");
        } else {
            console.error(result.message); 
        }
    };

    return (
        <div
      className={`bg-[rgba(0,0,0,0.5)] min-h-screen w-full flex items-center justify-center fixed top-0 left-0 ${
        isModalDisciplina
          ? "block opacity-100 z-10 show-modal"
          : "-z-10 opacity-0 hidden hide-modal"
      }`}
    >
      <div className={`bg-white p-8 rounded-lg w-[400px] content`}>
        {/* modal header  */}
        <div className="flex items-center justify-between">
            <BiSolidBookAdd className="text-2xl text-slate-800"/>
            <h4 className="text-slate-800 text-xl">Adicionar Disciplina</h4>
            <FaTimes
                className="text-2xl text-slate-800 cursor-pointer"
                onClick={() => openClose("isModalDisciplina")}
            />
        </div>
        {/* modal body  */}
        <div className="my-5">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
            <div>
              <label className="text-lg text-slate-800">Nome</label>
              <input
                type="text"
                name="title"
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-200 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                placeholder="Nome"
                {...register("title", { required: true })}
              />
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
              <button type="submit" disabled={loading}
                className="h-10 px-8 text-slate-800 text-lg gap-2 flex items-center outline-none  rounded-md bg-green-500 cursor-pointer border-0 hover:bg-green-400 duration-300"
              >
                <FaPlus /> {loading ? 'Carregando...' : 'Adicionar'}
              </button>
            </div>
            {error && <p className="text-red-600 text-sm">{error.error || 'Ocorreu um erro'}</p>}
          </form>
        </div>
      </div>
    </div>
    )
}

export default ModalDisciplina;