const { PrismaClient } = require("@prisma/client");
const { compare } = require("bcrypt"); 
const { signToken } = require("../middlewares/auth");

const prisma = new PrismaClient();


async function login(email, password) {
    const user = await prisma.usuario.findUnique({
        where: {
            email: email.toLowerCase(),
        },
    });
    if(!user) {
        return { error: "Este e-mail não possui uma conta." };
    }
    if(!(await compare(password, user.password))) {
        return { error: "A senha está incorreta." };
    }

    try {
        const token = await signToken({ id: user.id, email: user.email }, process.env.JWT_TOKEN, { expiresIn: "7d" });
        return { token };
    } catch {
        return { error: "Internal Error" };
    }
}

module.exports = {
    login,
};

