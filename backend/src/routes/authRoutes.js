const express = require("express");
const router = express.Router();
const { login } = require("../controllers/authController");
const { isValidEmail } = require("../controllers/userController");

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

module.exports = router;