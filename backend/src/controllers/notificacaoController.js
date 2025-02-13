const { PrismaClient } = require("@prisma/client");
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();
const axios = require('axios');

async function sendPushNotification(token, title, body) {
    const message = {
      to: token,
      sound: 'default',
      title: title,
      body: body,
      data: { someData: 'goes here' }, 
    };
  
    try {
      const response = await axios.post('https://exp.host/--/api/v2/push/send', message, {
        headers: {
          'Accept': 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
      });
      console.log('Notification sent:', response.data);
    } catch (error) {
      console.error('Error sending notification:', error);
    }
}

async function verificarNotificacoes() {
    const tarefas = await prisma.tarefa.findMany({
      where: {
        date: {
          lte: new Date(),
        },
        status: { not: 'COMPLETED' },
      },
    });
  
    const agendas = await prisma.agenda.findMany({
      where: {
        date: {
          lte: new Date(),
        },
      },
    });
  
    for (const tarefa of tarefas) {
      const existeNotificacao = await prisma.notificacao.findFirst({
        where: {
          tarefaId: tarefa.id,
        },
      });
  
      if (!existeNotificacao) {
        const notificacao = await prisma.notificacao.create({
          data: {
            descricao: `Tarefa: ${tarefa.title} - ${tarefa.description}`,
            userId: tarefa.userId,
            tarefaId: tarefa.id,
          },
        });
  
        // Obtenha o token do usuário
        const user = await prisma.user.findUnique({
          where: { id: tarefa.userId },
        });
  
        if (user && user.pushToken) {
          // Envie a push notification
          await sendPushNotification(user.pushToken, 'Nova Tarefa', notificacao.descricao);
        }
      }
    }
  
    for (const agenda of agendas) {
      const existeNotificacao = await prisma.notificacao.findFirst({
        where: {
          agendaId: agenda.id,
        },
      });
  
      if (!existeNotificacao) {
        const notificacao = await prisma.notificacao.create({
          data: {
            descricao: `Agenda: ${agenda.description}`,
            userId: agenda.userId,
            agendaId: agenda.id,
          },
        });
  
        // Obtenha o token do usuário
        const user = await prisma.user.findUnique({
          where: { id: agenda.userId },
        });
  
        if (user && user.pushToken) {
          // Envie a push notification
          await sendPushNotification(user.pushToken, 'Nova Agenda', notificacao.descricao);
        }
      }
    }
}

async function updateNotificacao(id) {
    try {
        const notificacao = await prisma.notificacao.update({
            where: {
              id: parseInt(id),
            },
            data: {
              lida: true,
            },
        });
        return notificacao;
    } catch (error) {
        return error;
    }
};

async function getNotificacoes(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        const userId = decoded.id;
        const notificacoes = await prisma.notificacao.findMany({
            where: {
                userId: userId,
                AND: [
                    { lida: false },
                ],
            },
        });
        if(!notificacoes) {
            return null;
        }
        return notificacoes;
    } catch (error) {
        console.log(error);
        return error;
    }
};

async function salvarToken(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        const userId = decoded.id;
        const user = await prisma.usuario.update({
            where: { id: userId },
            data: { pushToken: token },
          });
          res.status(200).json({ message: 'Token salvo com sucesso.', user });
    } catch (error) {
        res.status(500).json({ error: 'Falha ao salvar o token.' });
    }
}

module.exports = {
    verificarNotificacoes,
    updateNotificacao,
    getNotificacoes,
    salvarToken,
}