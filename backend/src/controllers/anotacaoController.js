const { PrismaClient } = require("@prisma/client");
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();


async function createAnotacao(title, description, disciplinaId, token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        const userId = decoded.id;
        const data = await prisma.anotacao.create({
            data: {
                title: title,
                description: description,
                disciplinaId: parseInt(disciplinaId),
                userId: userId
            }
        });
        return data;
    }catch(error) {
        return error;
    }
};

async function updateAnotacao(id, title, description, disciplinaId) {
    try {
        const data = await prisma.anotacao.update({
            where: {
                id: parseInt(id)
            },
            data: {
                title: title,
                description: description,
                disciplinaId: parseInt(disciplinaId)
            }
        });
        return data;
    } catch (error) {
        return error;
    }
};

async function getAnotacoes(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        const userId = decoded.id;
        const data = await prisma.anotacao.findMany({
            where: {
                userId: userId,
            }
        });
        if(!data) {
            return null;
        }
        return data;
    } catch (error) {
        return error;
    }
};

async function getAnotacao(id) {
    try {
        const data = await prisma.anotacao.findUnique({
            where: {
                id: parseInt(id),
            }
        });
        return data;
    } catch (error) {
        return error;
    }
};

async function deleteAnotacao(id) {
    try {
        const data = await prisma.anotacao.delete({
            where: {
                id: parseInt(id)
            }
        });
        return data;
    } catch (error) {
        return error;
    }
}

module.exports = {
    createAnotacao,
    updateAnotacao,
    getAnotacoes,
    getAnotacao,
    deleteAnotacao,
};