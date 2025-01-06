import React from 'react';
import { logoutUser, checkToken } from '../../features/authSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(checkToken());
    navigate('/login');
  };

  return (
    <div className=''>
        Pagina Inicial
        <div>
          <button className='bg-red-600 p-2 text-white rounded' onClick={handleLogout}>Sair</button>
        </div>
    </div>
  )
}

export default Home;