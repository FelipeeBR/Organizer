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

async function getDisciplinas() {
    try {
        const disciplinas = await prisma.disciplina.findMany();
        if(!disciplinas) {
            return null;
        }
        return disciplinas;
    } catch (error) {
        return error;
    }
}

module.exports = {
    createDisciplina,
    getDisciplinas,
};