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

router.put('/salvar-token', auth, async (req, res) => {
    const { expoToken, token } = req.body;
    try {
        await salvarToken(expoToken, req.token);
        res.status(200).json({ message: 'ExpoToken salvo com sucesso' });
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

router.put('/remover-token', auth, async (req, res) => {
    const { token } = req.body;
    try {
        await salvarToken(null, req.token);
        res.status(200).json({ message: 'ExpoToken removido com sucesso' });
    } catch (error) {
        res.sendStatus(500);
    }
});

module.exports = router;