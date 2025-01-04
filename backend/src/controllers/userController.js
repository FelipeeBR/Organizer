const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPassword = (password) => password.length >= 8;

async function createUser(email, password) {
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
            email: email,
            password: hashedPassword
        }
    });
    return user;
}

module.exports = {
    isValidEmail,
    isValidPassword,
    createUser,
};