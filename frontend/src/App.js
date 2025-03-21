import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { useDispatch } from 'react-redux';
import { checkToken } from './features/authSlice';
import ProtectedRoute from './components/ProtectedRoute';
import { useContextApp } from "./context/AppContext";
import Sidebar from "./components/Sidebar";
import { FaBars } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import Disciplina from './pages/Disciplina/Disciplina';
import DisciplinaTarefa from './pages/Disciplina/DisciplinaTarefa';
import { ToastContainer } from 'react-toastify';
import Anotacao from './pages/Anotacao/Anotacao';
import NovaAnotacao from './pages/Anotacao/NovaAnotacao/NovaAnotacao';
import AnotacaoEdit from './pages/Anotacao/AnotacaoEdit';
import Agenda from './pages/Agenda/Agenda';
import Notificacao from './pages/Notificacao/Notificacao';
import Desempenho from './pages/Desempenho/Desempenho';
import Forgot from './pages/Forgot/Forgot';
import Download from './pages/Download/Download';
import Ajuda from './pages/Ajuda/Ajuda';
import PublicRoute from './PublicRoute';

function App() {
  const { isSidebar, openClose } = useContextApp();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(checkToken());
  }, [dispatch]);

  const noMainLayoutRoutes = ["/login", "/register", '/recuperar-senha', '/download'];
  const isMainLayout = !noMainLayoutRoutes.includes(location.pathname);

  return (
    <>
      {isMainLayout ? (
        <div className="h-screen w-full p-5 flex gap-2 justify-between">
          <Sidebar />
          <main
            className={`${
              isSidebar ? "w-[calc(100%-20rem)] md:w-[80%]" : "w-full md:w-[100%]"
            } max-h-screen relative overflow-hidden bg-gray-200 shadow-lg rounded-lg p-5`}
          >
            {!isSidebar && (
              <button
                onClick={() => openClose("isSidebar")}
                className="md:hidden fixed top-10 left-0 border border-l-0 rounded-tl-none rounded-bl-none border-slate-300 bg-slate-300 p-2 rounded-md cursor-pointer"
              >
                <FaBars className="text-slate-800 text-xl" />
              </button>
            )}
            <Routes>
              <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/disciplinas" element={<ProtectedRoute><Disciplina /></ProtectedRoute>} />
              <Route path="/disciplina/:id" element={<ProtectedRoute><DisciplinaTarefa /></ProtectedRoute>} />
              <Route path="/anotacoes" element={<ProtectedRoute><Anotacao /></ProtectedRoute>} />
              <Route path="/anotacoes/novo" element={<ProtectedRoute><NovaAnotacao /></ProtectedRoute>} />
              <Route path="/anotacao/:id" element={<ProtectedRoute><AnotacaoEdit /></ProtectedRoute>} />
              <Route path="/agenda" element={<ProtectedRoute><Agenda/></ProtectedRoute>} />
              <Route path="/notificacoes" element={<ProtectedRoute><Notificacao/></ProtectedRoute>} />
              <Route path="/desempenho" element={<ProtectedRoute><Desempenho/></ProtectedRoute>} />
              <Route path="/ajuda" element={<ProtectedRoute><Ajuda/></ProtectedRoute>} />
            </Routes>
          </main>
          <ToastContainer position="top-center"/>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/recuperar-senha" element={<PublicRoute><Forgot /></PublicRoute>} />
          <Route path="/download" element={<Download />} />
        </Routes>
      )}
    </>
  );
}

export default App;
