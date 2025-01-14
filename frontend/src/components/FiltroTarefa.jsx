import React, { useState} from 'react';
import { FaSearch } from "react-icons/fa";

const FiltroTarefa = ({ onApplyFilters }) => {
    const [priority, setPriority] = useState("");
    const [date, setDate] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onApplyFilters({ priority, date });
    };
    return (
        <div className="flex justify-center">
            <div>
                <form onSubmit={handleSubmit} className='flex gap-4'>
                    <div>
                        <select
                            name="priority"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="w-full h-10 px-3 min-w-[150px] rounded-lg font-medium bg-gray-100 border border-gray-300 text-sm placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white"
                        >
                            <option value="">Prioridade</option>
                            <option value="BAIXA">Baixa</option>
                            <option value="MEDIA">Média</option>
                            <option value="ALTA">Alta</option>
                        </select>
                    </div>
                    <div>
                        <div>
                            <input
                                type="date" 
                                placeholder='Prazo' 
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full h-10 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"/>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        <FaSearch />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default FiltroTarefa;