const express = require("express");
const { auth } = require("../middlewares/auth");
const { createAgenda, updateAgenda, getAgenda, getAgendas, deleteAgenda } = require("../controllers/agendaController");

const router = express.Router();

router.post("/agenda", auth, async (req, res) => {
    const { description, date, token } = req.body;
    if(!date|| !description) {
        return res.status(400).json({ message: "Data ou descrição estão em branco." });
    }
    try {
        const post = await createAgenda(description, date, token);
        res.status(201).json(post);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

router.get("/agendas", auth, async (req, res) => {
    try {
        const posts = await getAgendas(req.token);
        if(posts.length === 0) {
            return res.status(404).json({ message: "Não possui agendas" });
        }
        return res.status(200).json(posts); 
    } catch (error) {
        console.error(error);
        res.sendStatus(500); 
    }
});

router.get("/agenda/:id", auth, async (req, res) => {
    const { id } = req.params;
    try {
       const post = await getAgenda(id); 
       res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

router.put("/agenda/:id", auth, async (req, res) => {
    const { id } = req.params; 
    const { description, date } = req.body;
    try {
        const post = await updateAgenda(id, description, date);
        res.status(200).json(post); 
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

router.delete("/agenda/:id", auth, async (req, res) => {
    const { id } = req.params;
    try {
        const post = await deleteAgenda(id);
        res.status(200).json(post); 
    } catch (error) {
        console.error(error);
        res.sendStatus(500); 
    }
});

module.exports = router;