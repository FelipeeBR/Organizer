const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPassword = (password) => password.length >= 8;

async function createUser(name, email, password) {
    const isUserExists = await prisma.usuario.findUnique({
        where: { email: email.toLowerCase() },
    });

    if(isUserExists) {
        return { error: "Alguém já possui uma conta com este e-mail." };
    }

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await prisma.usuario.create({
        data: {
            name: name,
            email: email,
            password: hashedPassword
        }
    });
    return user;
}

async function getUserName(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        const userId = decoded.id;
        const user = await prisma.usuario.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new Error("Usuário não encontrado");
        }
        return user.name;
    } catch (error) {
        console.error("Erro ao verificar token ou buscar usuário:", error.message);
        throw new Error("Token inválido ou erro ao buscar usuário");
    }
}

module.exports = {
    isValidEmail,
    isValidPassword,
    createUser,
    getUserName,
};