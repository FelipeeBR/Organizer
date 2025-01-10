import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDisciplinas } from '../../features/disciplinaSlice';
import CardDisciplina from './CardDisciplina';
import { FaPlus } from "react-icons/fa";
import { useContextApp } from '../../context/AppContext';

const Disciplinas = () => {
    const dispatch = useDispatch();
    const { openClose } = useContextApp();
    //const [disciplinas, setDisciplinas] = useState([]);
    const disciplinas = useSelector((state) => state.disciplina.list);
    useEffect(() => {
      const fetchDisciplinas = async () => {
          const tokenData = JSON.parse(localStorage.getItem('user'));
          const token = tokenData?.token;
          if (!token) {
              console.error('Token não encontrado');
              return;
          }
          await dispatch(getDisciplinas(token));
      };
      fetchDisciplinas();
    }, [dispatch]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-4 my-4">
            {disciplinas?.map((disciplina) => {
                return <CardDisciplina key={disciplina.id} info={disciplina} />;
            })}
        <div
        onClick={() => openClose("isModalDisciplina")}
        className="cursor-pointer min-h-[200px] rounded-lg border relative flex items-center justify-center border-dashed border-slate-800 text-slate-800 bg-gray-200 hover:bg-gray-300 duration-300 p-4"
      >
        <button
          type="button"
          className="border-0 outline-none flex items-center gap-2 text-lg"
        >
            <FaPlus className="text-2xl" />
            Adicionar
        </button>
      </div>
    </div>
    )
}

export default Disciplinas;