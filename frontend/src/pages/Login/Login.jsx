import React, { useState } from 'react';
import vectorLogin from '../../images/vector-login.png';
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../features/authSlice';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    function viewSenha(){
        setShowPassword(!showPassword);
    }

    const onSubmit = async (data) => {
        const result = await dispatch(loginUser(data)); 
        if(result.meta.requestStatus === "fulfilled") {
            navigate('/'); 
        } else {
            console.error(result.message); 
        }
    }
     
    return (
        <div classNameName=''>
            <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
                <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                    <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                        <div>
                            LOGO AQUI
                        </div>
                        <div className="mt-12 flex flex-col items-center">
                            <h1 className="text-2xl xl:text-3xl font-extrabold">
                                Login
                            </h1>
                            <div className="w-full flex-1 mt-8">
                                <div className="flex flex-col items-center">
                                    <button
                                        className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                                        <div className="bg-white p-2 rounded-full">
                                            <FcGoogle />
                                        </div>
                                        <span className="ml-4">
                                            Continuar com Google
                                        </span>
                                    </button>
                                </div>

                                <div className="my-12 border-b text-center">
                                    <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                        Ou 
                                    </div>
                                </div>

                                <div className="mx-auto max-w-xs">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className='mb-3'>
                                            <input
                                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                                type="email" placeholder="Email" {...register("email", { required: true, pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/ })}/>
                                        </div>

                                        {errors.email && errors.email.type === "required" && (
                                            <p className="text-red-600 text-sm">E-mail é obrigatório</p>
                                        )}
                                        {errors.email && errors.email.type === "pattern" && (
                                            <p className="text-red-600 text-sm">E-mail inválido</p>
                                        )}

                                        <div className="flex items-center gap-2 rounded relative">
                                            <input
                                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Senha"
                                                {...register("password", { required: true })}
                                            />
                                            <span 
                                                className="absolute right-4 cursor-pointer text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out"
                                                onClick={viewSenha}
                                            >
                                                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                            </span>
                                        </div>

                                        {errors.password && errors.password.type === "required" && (
                                            <p className="text-red-600 text-sm">Senha não pode ficar em branco</p>
                                        )}
                                        
                                        <button type="submit" disabled={loading}
                                            className="mt-5 tracking-wide font-semibold bg-blue-500 text-gray-100 w-full py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                            <span className="ml-3">
                                                {loading ? 'Carregando...' : 'Entrar'}
                                            </span>
                                        </button>
                                    </form>
                                    {error && <p className="text-red-600 text-sm">{error.error || 'Ocorreu um erro ao fazer login'}</p>}
                                </div>
                                <div className='flex items-center justify-center mt-3'>
                                    <span>Não possui uma conta? <Link to="/register" className='text-blue-500 underline'>Cadastre-se</Link></span>
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
    );
}

export default Login;