const express = require("express");
const rateLimit = require("express-rate-limit");
const { isValidEmail, isValidPassword, createUser, getUserName } = require("../controllers/userController");

const router = express.Router();
const registerLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: "Muitas tentativas. Tente novamente mais tarde.",
});

router.post("/register", registerLimiter, async (req, res) => {
    const { name, email, password } = req.body;
    if(!email || !password) {
        return res.sendStatus(400);
    }
    if(!isValidEmail(email)) {
        return res.status(400).json({ error: "Formato de e-mail inválido." });
    }

    if(!isValidPassword(password)) {
        return res.status(400).json({ error: "A senha deve ter pelo menos 8 caracteres." });
    }

    try {
        const user = await createUser(name, email, password);
        if (user && user.error) {
            return res.status(400).json({ error: user.error });
        }
        return res.status(201).json({ message: "Usuário cadastrado com sucesso.", userId: user.id });
    } catch (error) {
        res.status(500).json({error: error});
    }
});

router.get("/user", async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: "Token não fornecido" });
    }
    
    const token = authHeader.split(' ')[1];
    try {
        const user = await getUserName(token);
        return res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Erro ao obter usuário" });
    }
});

module.exports = router;