const express = require("express");
const { sendEmail } = require("../controllers/emailController");

const router = express.Router();

router.post("/email", async (req, res) => {
    const { email } = req.body;
    if(!email) {
        return res.status(400).json({ message: "Campo e-mail está vazio." });
    }

    try {
        const response = await sendEmail(email);
        if(!response) {
            return res.status(400).json({ message: "E-mail não cadastrado." });
        }
        return res.status(200).json({ message: "E-mail enviado com sucesso." });
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

module.exports = router;
  