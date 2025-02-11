import React, { useState } from "react";
import { DefaultEditor } from 'react-simple-wysiwyg';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { createAnotacao } from "../../features/anotacaoSlice";
import { toast } from "react-toastify";
import { FaSave, FaArrowLeft } from "react-icons/fa";
import { useNavigate, Link } from 'react-router-dom';
import '../../App.css';

const TextEditor = () => {
  const [description, setDescription] = useState();
  const dispatch = useDispatch();
  const token = localStorage.getItem('user');
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { title: "", description: "" } });

  const handleChange = (event) => {
    setDescription(event.target.value);
  };

  const onSubmit = async (data) => {
    const parsedUser = JSON.parse(token);
    const token2 = parsedUser.token;
    data.description = description;
    data.token = token2;
    const result = await dispatch(createAnotacao({ anotacaoData: data, token: token2 }));
    if(result.meta.requestStatus === "fulfilled") {
      toast.success('Anotação Salva com sucesso');
      navigate('/anotacoes');
    }else {
      console.error(result);
      toast.error('Erro ao salvar anotação');
    }
  };
  
  return (
    <div className='h-full overflow-y-auto'>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <input
            type="text"
            name="title"
            className="w-full h-10 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            placeholder="Título"
            {...register("title", { required: "Preencha o título" })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>
        <div className="bg-white rounded-lg min-h-10">
          <DefaultEditor value={description} onChange={handleChange} className="rsw-ce ul rsw-ce ol"/>
        </div>
        <div className="flex justify-end gap-3">
          <Link to={"/anotacoes"}>
            <button className="flex flex-grow mt-4 px-4 py-2 bg-red-500 text-white rounded">
              <FaArrowLeft className="flex flex-grow m-1"/> Voltar
            </button>
          </Link>
          <button type="submit" className="flex mt-4 px-4 py-2 bg-green-500 text-white rounded">
            <FaSave className="flex flex-grow m-1"/> Salvar
          </button>
        </div>
      </form>
    </div>
  );
};

export default TextEditor;
