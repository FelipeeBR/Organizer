import React, { useState } from 'react';
import vectorLogin from '../../images/vector-login.png';
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../features/userSlice';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    function viewSenha(){
        setShowPassword(!showPassword);
    }
    function viewConfirmSenha(){
        setShowConfirmPassword(!showConfirmPassword);
    }

    const onSubmit = async (data) => {
        const result = await dispatch(registerUser(data)); 
        if(result.meta.requestStatus === "fulfilled") { 
            navigate('/login'); 
        } else {
            console.error(result.message); 
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
                                Cadastre-se
                            </h1>
                            <div className="w-full flex-1 mt-8">
                                <div className="mx-auto max-w-xs">
                                    <div className="mx-auto max-w-xs">
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className='mb-3'>
                                                <input
                                                    className="w-full px-8 py-4 h-10 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                                    type="text" placeholder="Nome" {...register("name", { required: true, maxLength: 15 })}/>
                                            </div>
                                            {errors.name && errors.name.type === "required" && (
                                                <p className="text-red-600 text-sm">Nome é obrigatório</p>
                                            )}
                                            {errors.name && errors.name.type === "maxLength" && (
                                                <p className="text-red-600 text-sm">Nome muito longo</p>
                                            )}

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
    
                                            <div className="flex items-center gap-2 rounded relative mb-3">
                                                <input
                                                    className="w-full px-8 py-4 h-10 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
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

                                            <div className="flex items-center gap-2 rounded relative">
                                                <input
                                                    className="w-full px-8 py-4 h-10 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    placeholder="Confirmar Senha"
                                                    {...register("confirmPassword", { required: true, validate: (val) =>
                                                        val === watch("password") || 'Senhas precisam ser idênticas',
                                                    })}
                                                />
                                                <span 
                                                    className="absolute right-4 cursor-pointer text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out"
                                                    onClick={viewConfirmSenha}
                                                >
                                                    {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                                </span>
                                            </div>
                                            
                                            {errors.confirmPassword?.type === "validate" && (
                                                <p className="text-red-600 text-sm">{errors.confirmPassword.message}</p>
                                            )}

                                            <button type="submit" disabled={loading}
                                                className="mt-5 h-10 tracking-wide font-semibold bg-blue-500 text-gray-100 w-full py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                                <span className="ml-3">
                                                    {loading ? 'Carregando...' : 'Criar Conta'}
                                                </span>
                                            </button>
                                        </form>
                                        {error && <p className="text-red-600 text-sm">{error.error || 'Ocorreu um erro ao cadastrar novo usuário'}</p>}
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center justify-center mt-3'>
                                <span>Já possui uma conta? <Link to="/login" className='text-blue-500 underline'>Faça login</Link></span>
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

export default Register;