const { PrismaClient } = require("@prisma/client");
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

async function buscarTarefas(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        const userId = decoded.id;

        const tarefasPendentes = await prisma.tarefa.findMany({
            where: {
                userId: userId,
                status: { not: 'COMPLETED' },
            },
            select: {
                id: true,
                title: true,
                date: true,
                status: true,
                priority: true,
                updatedAt: true,
            },
            orderBy: [
                { priority: 'desc' },
                { date: 'asc' }
            ]
        });

        const tarefasCompletadas = await prisma.tarefa.findMany({
            where: {
                userId: userId,
                status: 'COMPLETED',
            }
        });

        const tarefasConcluidasRecentemente = await buscarTarefasConcluidasRecentemente(userId);

        return {
            tarefasPendentes,
            tarefasPendentesCount: tarefasPendentes.length,
            tarefasCompletadasCount: tarefasCompletadas.length,
            tarefasConcluidasRecentemente
        };
    } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
        throw error;
    }
}

async function buscarTarefasConcluidasRecentemente(userId, dias = 7) {
    const dataLimite = new Date();
    dataLimite.setDate(dataLimite.getDate() - dias);

    const tarefasConcluidas = await prisma.tarefa.findMany({
        where: {
            userId: userId,
            status: 'COMPLETED',
            updatedAt: {
                gte: dataLimite,
            }
        }
    });

    return tarefasConcluidas.length;
}

async function avaliarDesempenho(token) {
    try {
        const { tarefasPendentes, tarefasPendentesCount, tarefasCompletadasCount, tarefasConcluidasRecentemente } = await buscarTarefas(token);

        const totalTarefas = tarefasPendentesCount + tarefasCompletadasCount;
        const aproveitamento = totalTarefas > 0 ? ((tarefasCompletadasCount / totalTarefas) * 100).toFixed(2) : 0;

        let recomendacao;
        if (aproveitamento >= 80) {
            recomendacao = "Parabéns! Você está tendo um ótimo desempenho.";
        } else if (aproveitamento >= 50) {
            recomendacao = "Bom trabalho, mas ainda há espaço para melhorias.";
        } else {
            recomendacao = "Você precisa focar mais nas suas tarefas!";
        }

        return {
            aproveitamento,
            recomendacao,
            tarefasPendentes,
            tarefasPendentesCount,
            tarefasCompletadasCount,
            tarefasConcluidasRecentemente
        };

    } catch (error) {
        console.error('Erro ao avaliar desempenho:', error);
        throw error;
    }
}

module.exports = {
    avaliarDesempenho,
}
