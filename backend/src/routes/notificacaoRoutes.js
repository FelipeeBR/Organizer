const express = require("express");
const { auth } = require("../middlewares/auth");
const { verificarNotificacoes, updateNotificacao } = require("../controllers/notificacaoController");

const router = express.Router();

router.post('/notificacoes/verificar', async (req, res) => {
    await verificarNotificacoes();
    res.json({ message: 'Notificações verificadas e criadas' });
});

router.put('/notificacoes/:id', async (req, res) => {
    const { id } = req.params;
    await updateNotificacao(id);
    res.json({ message: 'Notificação atualizada com sucesso' });
});

router.get('/notificacoes', async (req, res) => {
    const notificacoes = await getNotificacoes();
    res.json(notificacoes);
});

module.exports = router;