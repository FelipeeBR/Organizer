import React, { useState, useEffect } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, ContentState, convertFromHTML } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { updateAnotacao, getAnotacao } from "../../features/anotacaoSlice";
import { toast } from "react-toastify";
import { useParams } from 'react-router-dom';
import { FaSave, FaBan } from "react-icons/fa";
import { useNavigate, Link } from 'react-router-dom';

const AnotacaoEdit = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [description, setDescription] = useState("");
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
    data.description = draftToHtml(convertToRaw(editorState.getCurrentContent()));
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

  const decodeHtmlContent = (htmlString) => {
    return htmlString.replace(/\\/g, '');
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
              const decodedDescription = decodeHtmlContent(anotacao.description);

              const blocksFromHTML = convertFromHTML(decodedDescription);
              const contentState = ContentState.createFromBlockArray(
                blocksFromHTML.contentBlocks,
                blocksFromHTML.entityMap
              );
              const editorState = EditorState.createWithContent(contentState);
              setEditorState(editorState); 
              setValue("description", decodedDescription); 
              setDescription(decodedDescription);
            }
        } catch (error) {
            console.error("Erro ao buscar anotacao:", error);
        }
      };
      fetchAnotacao();
    }, [dispatch, token, id, setValue]);

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
            onEditorStateChange={(newEditorState) => {
              setEditorState(newEditorState);
              setValue(
                "description",
                description
              );
            }}
          />
        </div>
        <input type="hidden" {...register("description")}/>
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

export default AnotacaoEdit;