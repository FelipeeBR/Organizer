import React, { useState, useEffect } from 'react';
import { getDisciplinas } from "../../features/disciplinaSlice";
import { useDispatch } from 'react-redux';

const FiltroAnotacao = ({ onApplyFilters }) => {
    const [disciplinas, setDisciplinas] = useState([]);
    const [disciplinaId, setDisciplinaId] = useState("0");
    const [dataAtualizacao, setDataAtualizacao] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchDisciplinas = async () => {
          const tokenData = JSON.parse(localStorage.getItem('user'));
          const token = tokenData?.token;
          if (!token) {
              console.error('Token não encontrado');
              return;
          }
          const res = await dispatch(getDisciplinas(token));
          if(res.meta.requestStatus === 'fulfilled') {
            setDisciplinas(res.payload);
          }else{
            console.error(res.payload || 'Erro ao buscar disciplinas');
          }
        };
        fetchDisciplinas();
    }, [dispatch]);

    useEffect(() => {
        onApplyFilters({
          disciplinaId: disciplinaId !== "0" ? disciplinaId : null,
          dataAtualizacao: dataAtualizacao || null
        });
      }, [disciplinaId, dataAtualizacao, onApplyFilters]);

    return (
        <div className="flex justify-center">
            <form onSubmit="" className="flex flex-col gap-4 md:flex-row">
                <div className="flex flex-col gap-4 md:flex-row">
                    <div>
                        <select
                            value={disciplinaId}
                            onChange={(e) => setDisciplinaId(e.target.value)}
                            className="w-full h-10 px-3 rounded-lg font-medium bg-gray-100 border border-gray-300 text-sm focus:outline-none"
                        >
                            <option value="0">Filtrar por disciplina</option>
                            {disciplinas.map((disciplina) => (
                            <option key={disciplina.id} value={disciplina.id}>
                                {disciplina.name}
                            </option>
                            ))}
                        </select>

                    </div>
                    <div>
                        <input
                            type="date"
                            value={dataAtualizacao}
                            onChange={(e) => setDataAtualizacao(e.target.value)}
                            className="h-10 px-3 rounded-lg bg-gray-100 border border-gray-300 text-sm focus:outline-none"
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default FiltroAnotacao;