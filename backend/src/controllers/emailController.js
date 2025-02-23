const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const nodemailer = require("nodemailer");

async function sendEmail(email) {
    try {
        const user = await prisma.usuario.findUnique({
            where: {
                email: email,
            },
            select: {
                forgot: true,
                email: true
            },
        });
        if(!user) {
            return null;
        }
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com", 
            port: 465,                   
            secure: true,               
            auth: {
                user: process.env.EMAIL, 
                pass: process.env.PASS,               
            },
                tls: {
                rejectUnauthorized: false,
            },
        });

        const mailOptions = {
            from: "felipemendes737@gmail.com",
            to: email,
            subject: "Recuperação de senha",
            text: `Sua senha: ${user.forgot}`,
        };
        await transporter.sendMail(mailOptions);

        return user;
    } catch (error) {
        return null;
    }
}

module.exports = {
    sendEmail
}