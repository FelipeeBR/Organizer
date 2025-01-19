import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { useContextApp } from "../context/AppContext";
import { Link, useLocation } from "react-router-dom";
import { verificarNotificacao, getNotificacoes } from "../features/notificacaoSlice";
import { useDispatch } from 'react-redux';

const Title = ({ text }) => {
  const { openClose } = useContextApp();
  const location = useLocation();
  const [namePath, setNamePath] = useState("");
  const dispatch = useDispatch();
  const [notificacao, setNotificacao] = useState([]);

  useEffect(() => {
    const pathSegments = location.pathname.split("/");
    const basePath = `/${pathSegments[1]}`; 
    if(String(basePath) === "/disciplinas") {
      setNamePath("isModalDisciplina");
    }
    else if(String(basePath) === "/disciplina") {
      setNamePath("isModalTarefa");
    }
    else if(String(basePath) === "/") {
      setNamePath("isModalTarefa");
    }
    else if(String(basePath) === "/anotacoes") {
      setNamePath("anotacao");
    }
    else if(String(basePath) === "/agenda") {
      setNamePath("isModalAgenda");
    }
  }, [location.pathname]);

  useEffect(() => {
    let isMounted = true;
    const fetchNotificacoes = async () => {
        const tokenData = JSON.parse(localStorage.getItem("user"));
        const token = tokenData?.token;
        if (!token) {
            console.error("Token não encontrado");
            return;
        }

        if (isMounted) {
            await dispatch(verificarNotificacao({ token }));
        }
    };
    fetchNotificacoes();
    return () => {
        isMounted = false;
    };
  }, [dispatch]);


  useEffect(() => {
    const notfi = async () => {
      const tokenData = JSON.parse(localStorage.getItem("user"));
      const token = tokenData?.token;
      if (!token) {
        console.error("Token não encontrado");
        return;
      }
      const res = await dispatch(getNotificacoes({token: token}));
      if(res.meta.requestStatus === 'fulfilled') {
        setNotificacao(res.payload);
      } else {
        console.error(res.payload || 'Erro ao buscar notificação');
      }
    };
    notfi();
  }, [dispatch]);


  return (
    <div className="flex items-center justify-between">
      <div>
        <h4 className="text-2xl font-medium text-slate-800">
          {text ?? "Default Title"}
        </h4>
        <div className="h-[3px] mt-2 w-8 rounded-md bg-blue-500"></div>
      </div>
      <div className="flex gap-2">
        <div>
          <button className="relative w-10 h-10 flex items-center justify-center text-slate-700">
            <IoMdNotifications size={25} />
            {notificacao.length > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 rounded-full bg-red-500 border-2 border-white text-white font-semibold">
                {notificacao.length}
              </span>
            )}
          </button>
        </div>
        {namePath === "anotacao" &&
        <Link to={"/anotacoes/novo"}>
          <button className="w-10 h-10 rounded-full border flex items-center justify-center border-white text-white bg-slate-700">
            <FaPlus />
          </button>
        </Link>
        }
        {namePath !== "anotacao" &&
          <button onClick={() => openClose(namePath)}
              className="w-10 h-10 rounded-full border flex items-center justify-center border-white text-white bg-slate-700"
          >
              <FaPlus />
          </button>
        }
      </div>
    </div>
  );
};

export default Title;