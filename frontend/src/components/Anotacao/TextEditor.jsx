import React, { useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { createAnotacao } from "../../features/anotacaoSlice";
import { toast } from "react-toastify";
import { FaSave, FaBan } from "react-icons/fa";
import { useNavigate, Link } from 'react-router-dom';

const TextEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const dispatch = useDispatch();
  const token = localStorage.getItem('user');
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { title: "", description: "" } });

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const onSubmit = async (data) => {
    const parsedUser = JSON.parse(token);
    const token2 = parsedUser.token;
    data.description = draftToHtml(convertToRaw(editorState.getCurrentContent()));
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
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={onEditorStateChange}
        />
      </div>
      <div className="flex justify-end gap-3">
        <Link to={"/anotacoes"}>
          <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
            <FaBan />
          </button>
        </Link>
        <button type="submit" className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
          <FaSave />
        </button>
      </div>
    </form>
  );
};

export default TextEditor;
