const { PrismaClient } = require("@prisma/client");
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

async function createAgenda(description, date, tipo, token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        const userId = decoded.id;
        let dateBrazil = new Date(date);
        dateBrazil.setHours(dateBrazil.getHours() - 3);
        const data = await prisma.agenda.create({
            data: {
                description: description,
                date: new Date(dateBrazil),
                tipo: tipo,
                userId: userId,
            }
        });
        console.log("Agenda criada: ", data);
        return data;
    } catch(error) {
        console.log("Ocorreu um erro: ",error);
        return error;
    }
};

async function updateAgenda(id, description, tipo, date) {
    try {
        let dateBrazil = new Date(date);
        dateBrazil.setHours(dateBrazil.getHours() - 3);
        const data = await prisma.agenda.update({
            where: {
                id: parseInt(id)
            },
            data: {
                description: description,
                date: new Date(dateBrazil),
                tipo: tipo
            }
        });
        console.log("Agenda atualizada: ", data)
        return data;
    } catch(error) {
        console.log("Ocorreu um erro: ",error);
        return error;
    }
};

async function getAgendas(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        const userId = decoded.id;
        const data = await prisma.agenda.findMany({
            where: {
                userId: userId,
            }
        });
        if(!data) {
            return null;
        }
        return data;
    } catch(error) {
        return error;
    }
};

async function getAgenda(id) {
    try {
        const data = await prisma.agenda.findUnique({
            where: {
                id: parseInt(id),
            }
        });
        return data;
    } catch(error) {
        return error;
    }
};

async function deleteAgenda(id) {
    try {
        const data = await prisma.agenda.delete({
            where: {
                id: parseInt(id),
            }
        });
        return data;
    } catch(error) {
        return error;
    }
};

module.exports = {
    createAgenda,
    updateAgenda,
    getAgenda,
    getAgendas,
    deleteAgenda,
}