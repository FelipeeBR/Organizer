const express = require("express");
const rateLimit = require("express-rate-limit");
const { isValidEmail, isValidPassword, createUser } = require("../controllers/userController");

const router = express.Router();
const registerLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: "Muitas tentativas. Tente novamente mais tarde.",
});

router.post("/register", registerLimiter, async (req, res) => {
    const { email, password } = req.body;
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
        const user = await createUser(email, password);
        if (user && user.error) {
            return res.status(400).json({ error: user.error });
        }
        return res.status(201).json({ message: "Usuário cadastrado com sucesso.", userId: user.id });
    } catch (error) {
        res.status(500).json({error: error});
    }
});

module.exports = router;