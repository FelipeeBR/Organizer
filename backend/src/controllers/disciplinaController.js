const { PrismaClient } = require("@prisma/client");
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

 

async function createDisciplina(title, content, token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN); 
        const userId = decoded.id;
        const data = await prisma.disciplina.create({
            data: {
                name: title,
                details: content,
                userId: userId
            }
        });
        return data;
    } catch (error) {
        throw new Error('Token inválido ou expirado.');
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

async function deleteDisciplina(id) {
    const disciplina = await prisma.disciplina.delete({
        where: {
            id: id
        }
    });
    return disciplina;
}

module.exports = {
    createDisciplina,
    getDisciplinas,
    deleteDisciplina,
};