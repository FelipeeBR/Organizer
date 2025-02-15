const { PrismaClient } = require("@prisma/client");
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

async function buscarTarefas(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        const userId = decoded.id;
        //const userId = 1;
        const tarefas = await prisma.tarefa.findMany({
            where: {
                userId: userId,
                date: {
                    lte: new Date(),
                },
                status: { not: 'COMPLETED' },
            },
            select: {
                id: true,
                date: true,
                status: true,
                priority: true,
                updatedAt: true,
            }
        });
        return {
            quantidadeTarefas: tarefas.length,
            tarefas: tarefas,
        };
    } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
        throw error;
    }
}

async function avaliarDesempenho(token) {
    try {
        const { quantidadeTarefas, tarefas } = await buscarTarefas(token);

        let pontuacaoTotal = 0;
        for (const tarefa of tarefas) {
            const pontuacao = calcularPontuacao(tarefa, quantidadeTarefas);
            pontuacaoTotal += pontuacao;
        }

        const desempenho = classificarDesempenho(pontuacaoTotal);

        return {
            quantidadeTarefas,
            pontuacaoTotal,
            desempenho,
        };
    } catch (error) {
        console.error('Erro ao avaliar desempenho:', error);
        throw error;
    }
}

function calcularPontuacao(tarefa, quantidadeTarefas) {
    let pontuacao = 0;

    // Critério 1: Data de conclusão
    const dataAtual = new Date();
    const dataConclusao = new Date(tarefa.updatedAt);

    if(dataConclusao < dataAtual) {
        pontuacao += 1; // Atrasada
    } else if (dataConclusao.toDateString() === dataAtual.toDateString()) {
        pontuacao += 2; // no dia mas não concluida
    } else {
        pontuacao += 3; // Concluída
    }

    switch (tarefa.priority) {
        case "ALTA":
            pontuacao += 3;
            break;
        case "MEDIA":
            pontuacao += 2;
            break;
        case "BAIXA":
            pontuacao += 1;
            break;
        default:
            pontuacao += 0;
    }

    if (quantidadeTarefas < 3) {
        pontuacao += 2;
    } else if (quantidadeTarefas >= 3 && quantidadeTarefas <= 5) {
        pontuacao += 1;
    } else {
        pontuacao += 0;
    }

    return pontuacao;
}

function classificarDesempenho(pontuacao) {
    if (pontuacao >= 0 && pontuacao <= 5) {
        return "RUIM";
    } else if (pontuacao >= 6 && pontuacao <= 8) {
        return "REGULAR";
    } else if (pontuacao >= 9 && pontuacao <= 10) {
        return "BOM";
    } else {
        return "Pontuação inválida";
    }
}


module.exports = {
    avaliarDesempenho,
}
