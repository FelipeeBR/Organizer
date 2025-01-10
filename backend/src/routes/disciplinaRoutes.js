const express = require("express");
const { getDisciplinas, createDisciplina, deleteDisciplina, getDisciplina, updateDisciplina } = require("../controllers/disciplinaController");
const { auth } = require("../middlewares/auth");


const router = express.Router();

router.post("/disciplina", async (req, res) => {
    var { title, content, token } = req.body;

    if (!title || !content) {
        return res.sendStatus(400);
    }

    try {
        const post = await createDisciplina(title, content, token); 
        res.status(201).json(post); 
    } catch (error) {
        console.error(error);
        res.sendStatus(500); 
    }
});

router.get("/disciplinas", auth, async (req, res) => {
    try {
        const posts = await getDisciplinas(req.token); 

        if (posts.length === 0) {
            return res.status(404).json({ message: "Não possui disciplinas" });
        }
        return res.status(200).json(posts); 
    } catch (error) {
        console.error(error);
        res.sendStatus(500); 
    }
});

router.get("/disciplina/:id", auth, async (req, res) => {
    const { id } = req.params; 
    try {
        const post = await getDisciplina(id); 
        res.status(200).json(post); 
    } catch (error) {
        console.error(error);
        res.sendStatus(500); 
    }
});

router.delete("/disciplina/:id", auth, async (req, res) => {
    const { id } = req.params; 
    try {
        const post = await deleteDisciplina(id); 
        res.status(200).json(post); 
    } catch (error) {
        console.error(error);
        res.sendStatus(500); 
    }
});

router.put("/disciplina/:id", auth, async (req, res) => {
    const { id } = req.params; 
    const { title, content } = req.body;
    
    try {
        const post = await updateDisciplina(id, title, content); 
        res.status(200).json(post); 
    } catch (error) {
        console.error(error);
        res.sendStatus(500); 
    }
});

module.exports = router;