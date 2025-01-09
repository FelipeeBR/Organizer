const express = require("express");
const router = express.Router();
const { login } = require("../controllers/authController");
const { isValidEmail } = require("../controllers/userController");

const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        return res.status(400).json({ error: "E-mail e senha são obrigatórios." });
    }
    if(!isValidEmail(email)) {
        return res.status(400).json({ error: "E-mail inválido." });
    }

    const response = await login(email, password);
    if(response.error) {
        return res.status(400).json({ error: response.error });
    }
    return res.status(200).json({ token: response.token });
});

router.post("/validate-token", (req, res) => {
    const authToken = req.headers["authorization"];
    if (!authToken) {
        return res.status(401).json({ error: "Token não fornecido" });
    }
    const token = authToken.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Token inválido ou ausente" });
    }
    jwt.verify(token, process.env.JWT_TOKEN, (error, decoded) => {
        if (error) {
            return res.status(401).json({ error: "Token inválido ou expirado" });
        }
        return res.status(200).json({
            message: "Token válido",
            user: { id: decoded.id, email: decoded.email },
        });
    });
});

module.exports = router;