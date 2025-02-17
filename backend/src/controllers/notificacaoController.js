const { PrismaClient } = require("@prisma/client");
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

async function enviarNotificacaoExpo(pushToken, mensagem, title) {
    const message = {
        to: pushToken,
        sound: 'default',
        title: title,
        body: mensagem,
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(message),
    });
}

/*async function verificarNotificacoes() {
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
}*/

async function verificarNotificacoes() {
    const tarefas = await prisma.tarefa.findMany({
        where: { date: { lte: new Date() }, status: { not: 'COMPLETED' } },
    });

    const agendas = await prisma.agenda.findMany({
        where: {
            date: {
                lte: new Date(),
            },
        },
    });

    for(const tarefa of tarefas) {
        const existeNotificacao = await prisma.notificacao.findFirst({
            where: { tarefaId: tarefa.id },
        });

        if(!existeNotificacao) {
            const user = await prisma.usuario.findUnique({ where: { id: tarefa.userId } });
            if(user?.expoPushToken) {
                await enviarNotificacaoExpo(user.expoPushToken, `Tarefa: ${tarefa.title} - ${tarefa.description}`, tarefa.title);
            }

            await prisma.notificacao.create({
                data: {
                    descricao: `Tarefa: ${tarefa.title} - ${tarefa.description}`,
                    userId: tarefa.userId,
                    tarefaId: tarefa.id,
                },
            });
        }
    }

    for(const agenda of agendas) {
        const existeNotificacao = await prisma.notificacao.findFirst({
            where: {
                agendaId: agenda.id,
            },
        });

        if(!existeNotificacao) {
            const user = await prisma.usuario.findUnique({ where: { id: agenda.userId } });
            if(user?.expoPushToken) {
                await enviarNotificacaoExpo(user.expoPushToken, `Agenda: ${agenda.title} - ${agenda.description}`, agenda.title);
            }

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

async function salvarToken(expoToken, token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        const userId = decoded.id;
        const user = await prisma.usuario.update({
            where: {
                id: userId
            },
            data: {
                expoPushToken: expoToken
            }
        });
        if(!user) {
            return null;
        }
        return user;
    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports = {
    verificarNotificacoes,
    updateNotificacao,
    getNotificacoes,
    salvarToken,
}