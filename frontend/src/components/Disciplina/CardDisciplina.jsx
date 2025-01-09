import React from 'react';
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";

const CardDisciplina = ({info}) => {
    const { id, name, details } = info;
    const deleteDisciplina = (id) => {
        console.log("Deletado: ", id);
    };
    return (
        <div className=" bg-white rounded-lg flex flex-col justify-between border relative border-slate-500 p-4">
            <div className="flex items-center justify-center text-blue-500 bg-blue-100 rounded-full w-16 h-16 sm:w-20 sm:h-20">
                <FaBookOpen className="text-2xl sm:text-3xl" />
            </div>
            <div className="flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
                <p className="text-sm text-gray-600 mt-1">
                    {details}
                </p>
                <div className="mt-4 flex gap-2 sm:mt-auto">
                    <button className="flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
                        <FaEdit className="mr-2" />
                        Editar
                    </button>
                    <button onClick={() => deleteDisciplina(id)} className="flex items-center justify-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                        <FaTrash className="mr-2" />
                        Excluir
                    </button>
                </div>
            </div>
        </div>

    )
}

export default CardDisciplina