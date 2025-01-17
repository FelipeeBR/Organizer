import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { useContextApp } from "../context/AppContext";
import { Link, useLocation } from "react-router-dom";

const Title = ({ text }) => {
  const { openClose } = useContextApp();
  const location = useLocation();
  const [namePath, setNamePath] = useState("");
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


  return (
    <div className="flex items-center justify-between">
      <div>
        <h4 className="text-2xl font-medium text-slate-800">
          {text ?? "Default Title"}
        </h4>
        <div className="h-[3px] mt-2 w-8 rounded-md bg-blue-500"></div>
      </div>
      <div className="flex gap-2">
        <button className="w-10 h-10 text-slate-700"><IoMdNotifications size={25}/></button>
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