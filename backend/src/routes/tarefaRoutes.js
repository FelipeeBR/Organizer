const express = require("express");
const { auth } = require("../middlewares/auth");
const { createTarefa, getTarefas, getTarefa, updateTarefa, deleteTarefa, getAllTarefas } = require("../controllers/tarefaController");

const router = express.Router();

router.post("/tarefa", auth, async (req, res) => {
    const { title, description, date, priority, status } = req.body;
    const { disciplinaId } = req.body;
    try {
        const post = await createTarefa(title, description, date, priority, status, disciplinaId, req.token); 
        res.status(201).json(post); 
    } catch (error) {
        console.error(error);
        res.sendStatus(500); 
    }
});

router.get("/tarefas", auth, async (req, res) => {
    const { id } = req.query;
    try {
        const posts = await getTarefas(id, req.token);  
        if (posts.length === 0) {
            return res.status(404).json({ message: "Nenhuma tarefa encontrada" });
        }
        res.status(200).json(posts); 
    } catch (error) {
        console.error(error);
        res.sendStatus(500); 
    }
});

router.get("/tarefa/:id", auth, async (req, res) => {    
    const { id } = req.params; 
    try {
        const post = await getTarefa(id); 
        res.status(200).json(post); 
    } catch (error) {
        console.error(error);
        res.sendStatus(500); 
    }
});

router.put("/tarefa/:id", auth, async (req, res) => {    
    const { id } = req.params; 
    const { title, description, date, status, priority } = req.body;
    try {
        const post = await updateTarefa(id, title, description, date, status, priority, req.token); 
        res.status(200).json(post); 
    } catch (error) {
        console.error(error);
        res.sendStatus(500); 
    }
});

router.delete("/tarefa/:id", auth, async (req, res) => {    
    const { id } = req.params; 
    try {
        const post = await deleteTarefa(id, req.token); 
        res.status(200).json(post); 
    } catch (error) {
        console.error(error);
        res.sendStatus(500); 
    }
});

router.get("/tarefasUser", auth,  async (req, res) => {
    try {
        const posts = await getAllTarefas(req.token);  
        if (posts.length === 0) {
            return res.status(404).json({ message: "Nenhuma tarefa encontrada" });
        }
        res.status(200).json(posts); 
        console.log(posts);
    } catch (error) {
        console.error(error);
        res.sendStatus(500); 
    }
});

module.exports = router;