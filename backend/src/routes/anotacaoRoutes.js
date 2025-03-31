const express = require("express");
const { auth } = require("../middlewares/auth");
const { createAnotacao, updateAnotacao, getAnotacoes, getAnotacao, deleteAnotacao } = require("../controllers/anotacaoController");

const router = express.Router();

router.post("/anotacao", auth, async (req, res) => {
    const { title, description, disciplinaId, token } = req.body;
    if(!title || !description) {
        return res.status(400).json({ message: "Titulo ou descrição estão em branco." });
    }

    try {
        const post = await createAnotacao(title, description, disciplinaId, token);
        res.status(201).json(post);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

router.get("/anotacoes", auth, async (req, res) => {
    try {
        const posts = await getAnotacoes(req.token); 

        if(posts.length === 0) {
            return res.status(404).json({ message: "Não possui anotações" });
        }
        return res.status(200).json(posts); 
    } catch (error) {
        console.error(error);
        res.sendStatus(500); 
    }
});

router.get("/anotacao/:id", auth, async (req, res) => {
    const { id } = req.params; 
    try {
        const post = await getAnotacao(id); 
        res.status(200).json(post); 
    } catch (error) {
        console.error(error);
        res.sendStatus(500); 
    }
});

router.put("/anotacao/:id", auth, async (req, res) => {
    const { id } = req.params; 
    const { title, description, disciplinaId } = req.body;
    
    try {
        const post = await updateAnotacao(id, title, description, disciplinaId); 
        res.status(200).json(post); 
    } catch (error) {
        console.error(error);
        res.sendStatus(500); 
    }
});

router.delete("/anotacao/:id", auth, async (req, res) => {
    const { id } = req.params; 
    try {
        const post = await deleteAnotacao(id); 
        res.status(200).json(post); 
    } catch (error) {
        console.error(error);
        res.sendStatus(500); 
    }
});

module.exports = router;