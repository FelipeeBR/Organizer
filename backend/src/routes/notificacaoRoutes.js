const express = require("express");
const { auth } = require("../middlewares/auth");
const { verificarNotificacoes, updateNotificacao, getNotificacoes, salvarToken } = require("../controllers/notificacaoController");

const router = express.Router();

router.post('/notificacoes/verificar', auth, async (req, res) => {
    await verificarNotificacoes();
    res.json({ message: 'Notificações verificadas e criadas' });
});

router.put('/notificacoes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const notificacao = await updateNotificacao(id);
        res.status(200).json(notificacao); 
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

router.get('/notificacoes', auth, async (req, res) => {
    try {
        const notificacoes = await getNotificacoes(req.token);
        if(notificacoes.length === 0) {
            return res.status(404).json({ message: "Não possui notificações" });
        }
        return res.status(200).json(notificacoes); 
    } catch (error) {
        res.sendStatus(500);  
    }
});

router.post('/salvar-token', async (req, res) => {
    const { token } = req.body;
    try {
        await salvarToken(token);
        res.status(200).json({ message: 'Token salvo com sucesso.' });
    } catch (error) {
        res.status(500).json({ error: 'Falha ao salvar o token.' });
    }
});

module.exports = router;