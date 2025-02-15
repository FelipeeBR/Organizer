import React, { useEffect, useState} from 'react'
import CardNotificacao from '../../components/Notificacao/CardNotificacao';
import { useDispatch } from 'react-redux';
import { getNotificacoes } from "../../features/notificacaoSlice";
import Title from '../../components/Title';

const Notificacao = () => {
  const dispatch = useDispatch();
  const [notificacoes, setNotificacoes] = useState([]);
  useEffect(() => {
    const notfi = async () => {
      const tokenData = JSON.parse(localStorage.getItem("user"));
      const token = tokenData?.token;
      if (!token) {
        console.error("Token não encontrado");
        return;
      }
      const res = await dispatch(getNotificacoes({token: token}));
      if(res.meta.requestStatus === 'fulfilled') {
        setNotificacoes(res.payload);
      } else {
        console.error(res.payload || 'Erro ao buscar notificação');
      }
    };
    notfi();
  }, [dispatch])

  return (
    <div className='h-full overflow-y-auto'>
      <Title text={"Notificações"}/>
       <div className="grid grid-cols-1 lg:grid-cols-1 sm:grid-cols-1 gap-4 m-4">
        {notificacoes?.map((notificacao) => (
          <CardNotificacao key={notificacao.id} info={notificacao} />
        ))}
      </div> 
    </div>
  )
}

export default Notificacao;