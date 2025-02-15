const { PrismaClient } = require("@prisma/client");
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

async function createDisciplina(title, content, obrigatoria, dependencia, token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN); 
        const userId = decoded.id;
        const data = await prisma.disciplina.create({
            data: {
                name: title,
                details: content,
                obrigatoria: parseInt(obrigatoria),
                dependencia: parseInt(dependencia),
                userId: userId
            }
        });
        return data;
    } catch (error) {
        throw new Error('Token inválido ou expirado.');
    }
    
}

async function updateDisciplina(id, title, content, obrigatoria, dependencia) {
    try {
        const disciplina = await prisma.disciplina.update({
            where: {
                id: parseInt(id)
            },
            data: {
                name: title,
                details: content,
                obrigatoria: parseInt(obrigatoria),
                dependencia: parseInt(dependencia)
            }
        });
        return disciplina;
    } catch (error) {
        return error;
    }
}

async function getDisciplinas(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        const userId = decoded.id;
        const disciplinas = await prisma.disciplina.findMany({
            where: {
                userId: userId
            }
        });
        if(!disciplinas) {
            return null;
        }
        return disciplinas;
    } catch (error) {
        return error;
    }
}

async function getDisciplina(id) {
    try {
        const disciplina = await prisma.disciplina.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        return disciplina;
    } catch (error) {
        return error;
    }
}

async function deleteDisciplina(id) {
    try {
        const disciplina = await prisma.disciplina.delete({
            where: {
                id: parseInt(id)
            }
        });
        return disciplina;
    } catch (error) {
        return error;
    }
}

module.exports = {
    createDisciplina,
    getDisciplinas,
    deleteDisciplina,
    getDisciplina,
    updateDisciplina,
};