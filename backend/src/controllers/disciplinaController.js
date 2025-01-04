const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function createDisciplina(title, content) {
    const data = await prisma.disciplina.create({
        data: {
            title: title,
            content: content
        }
    });
    return data;
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