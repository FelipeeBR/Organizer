const { PrismaClient } = require("@prisma/client");
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();


async function createAnotacao(title, description, token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        const userId = decoded.id;
        const data = await prisma.anotacao.create({
            data: {
                title: title,
                description: description,
                userId: userId
            }
        });
        return data;
    }catch(error) {
        return error;
    }
};

async function updateAnotacao(id, title, description) {
    try {
        const data = await prisma.anotacao.update({
            where: {
                id: parseInt(id)
            },
            data: {
                title: title,
                description: description
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