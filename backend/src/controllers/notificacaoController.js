const { PrismaClient } = require("@prisma/client");
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

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
            await prisma.notificacao.create({
                data: {
                    descricao: `Tarefa: ${tarefa.title} - ${tarefa.description}`,
                    userId: tarefa.userId,
                    tarefaId: tarefa.id,
                },
            });
        }
    }

    for (const agenda of agendas) {
        const existeNotificacao = await prisma.notificacao.findFirst({
            where: {
                agendaId: agenda.id,
            },
        });

        if (!existeNotificacao) {
            await prisma.notificacao.create({
                data: {
                    descricao: `Agenda: ${agenda.description}`,
                    userId: agenda.userId,
                    agendaId: agenda.id,
                },
            });
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

async function updateNotificacaoApp(id) {
    try {
        const notificacao = await prisma.notificacao.update({
            where: {
              id: parseInt(id),
            },
            data: {
              agendada: true,
            },
        });
        return notificacao;
    } catch (error) {
        return error;
    }
}

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

module.exports = {
    verificarNotificacoes,
    updateNotificacao,
    getNotificacoes,
    updateNotificacaoApp,
}