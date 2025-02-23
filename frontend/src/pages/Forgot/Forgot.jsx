import React, { useState } from 'react';
import vectorLogin from '../../images/vector-login.png';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;
const Forgot = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await axios.post(`${API}/email`, data,  {});
            setLoading(false);
            if(response.status === 200) {
                navigate('/login');
            }
            return response.data; 
        } catch (error) {
            setError(error.response.data.message);
            setLoading(false);
            return null;
        }
    }

    return (
        <div classNameName=''>
            <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
                <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                    <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                        <div className='flex flex-col items-center justify-center'>
                            <h1 className='text-2xl xl:text-3xl font-extrabold'>Organizer</h1>
                            <h3>Controle Universitário</h3>
                        </div>
                        <div className="mt-12 flex flex-col items-center">
                            <h1 className="text-lg xl:text-2xl font-bold">
                                Login
                            </h1>
                            <div className="w-full flex-1 mt-8">
                                <div className="mx-auto max-w-xs">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className='mb-3'>
                                            <input
                                                className="w-full px-8 py-4 h-10 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                                type="email" placeholder="Email" {...register("email", { required: true, pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/ })}/>
                                        </div>

                                        {errors.email && errors.email.type === "required" && (
                                            <p className="text-red-600 text-sm">E-mail é obrigatório</p>
                                        )}
                                        {errors.email && errors.email.type === "pattern" && (
                                            <p className="text-red-600 text-sm">E-mail inválido</p>
                                        )}
                                        <button type="submit" disabled={loading}
                                            className="mt-5 h-10 tracking-wide font-semibold bg-blue-500 text-gray-100 w-full py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                            <span className="ml-3">
                                                {loading ? 'Carregando...' : 'Enviar Senha'}
                                            </span>
                                        </button>
                                    </form>
                                    {error.length > 0 && <p className="text-red-600 text-sm text-center">{error}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 bg-blue-100 text-center hidden lg:flex">
                        <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat">
                            <img src={vectorLogin} alt="login" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Forgot