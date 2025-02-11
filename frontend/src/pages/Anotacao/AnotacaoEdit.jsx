import React, { useState, useEffect } from "react";
import Editor from 'react-simple-wysiwyg';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { updateAnotacao, getAnotacao } from "../../features/anotacaoSlice";
import { toast } from "react-toastify";
import { useParams } from 'react-router-dom';
import { FaSave, FaArrowLeft } from "react-icons/fa";
import { useNavigate, Link } from 'react-router-dom';
import '../../App.css';

const AnotacaoEdit = () => {
  const [description, setDescription] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('user');
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ defaultValues: { title: "", description: "" } });

  const onSubmit = async (data) => {
    const parsedUser = JSON.parse(token);
    const token2 = parsedUser.token;
    data.description = description
    data.token = token2;
    const result = await dispatch(updateAnotacao({id:id, anotacaoData: data, token: token2 }));
    if(result.meta.requestStatus === "fulfilled") {
      toast.success('Anotação atualizada com sucesso');
      navigate('/anotacoes');
    }else {
      console.error(result);
      toast.error('Erro ao atualizar anotação');
    }
  };

  useEffect(() => {
      const fetchAnotacao = async () => {
        const parsedUser = JSON.parse(token);
        const token2 = parsedUser.token;
        try {
            const result = await dispatch(getAnotacao({id: id, token: token2}));
            const anotacao = result.payload;
            setValue("title", anotacao?.title || "");
            if (anotacao?.description) {
              setValue("description", anotacao?.description); 
              setDescription(anotacao?.description);
            }
        } catch (error) {
            console.error("Erro ao buscar anotacao:", error);
        }
      };
      fetchAnotacao();
    }, [dispatch, token, id, setValue]);

    const handleChange = (event) => {
      setDescription(event.target.value);
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
            <Editor value={description} onChange={handleChange} className="rsw-ce ul rsw-ce ol"/>
          </div>
          <input type="hidden" {...register("description")}/>
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

export default AnotacaoEdit;