const express = require("express");
const { auth } = require("../middlewares/auth");
const { avaliarDesempenho } = require("../controllers/desempenhoController");

const router = express.Router();


router.get("/desempenho", auth, async (req, res) => {
    try {
        const posts = await avaliarDesempenho(req.token);  
        if (posts.length === 0) {
            return res.status(404).json({ message: "Nenhum desempenho encontrado" });
        }
        res.status(200).json(posts); 
    } catch (error) {
        console.error(error);
        res.sendStatus(500); 
    }
});

module.exports = router;