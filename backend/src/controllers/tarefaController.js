const { PrismaClient } = require("@prisma/client");
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

async function createTarefa(title, description, date, priority, status, disciplinaId, token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        const userId = decoded.id;
        const data = await prisma.tarefa.create({
            data: {
                title: title,
                description: description,
                date: new Date(date),
                priority: priority,
                status: status,
                userId: userId,
                disciplinaId: parseInt(disciplinaId)
            }
        });
        return data;
    } catch (error) {
        console.log(error);
        //throw new Error('Token inválido ou expirado.');
    }
}

async function getTarefas(id, token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        const userId = decoded.id;
        const tarefas = await prisma.tarefa.findMany({
            where: {
                AND: [
                    { userId: userId },
                    { disciplinaId: parseInt(id) },
                ],
            }
        });
        return tarefas;
    } catch (error) {
        return error;
    }
}

async function getTarefa(id) {
    try {
        const tarefa = await prisma.tarefa.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        return tarefa;
    } catch (error) {
        return error;
    }
}

async function deleteTarefa(id) {
    try {
        const tarefa = await prisma.tarefa.delete({
            where: {
                id: parseInt(id)
            }    
        });
        return tarefa;
    } catch (error) {
        return error;
    }
}

async function updateTarefa(id, title, description, date, status) {
    try {
        const tarefa = await prisma.tarefa.update({
            where: {
                id: parseInt(id)
            },
            data: {
                title: title,
                description: description,
                date: date,
                status: status
            }
        });
        return tarefa;
    } catch (error) {
        return error;
    }
}

module.exports = {
    createTarefa,
    getTarefas, 
    getTarefa,
    deleteTarefa,
    updateTarefa
};