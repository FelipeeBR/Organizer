const express = require("express");
const { auth } = require("../middlewares/auth");
const { verificarNotificacoes, updateNotificacao, getNotificacoes } = require("../controllers/notificacaoController");

const router = express.Router();

router.post('/notificacoes/verificar', auth, async (req, res) => {
    await verificarNotificacoes();
    res.json({ message: 'Notificações verificadas e criadas' });
});

router.put('/notificacoes/:id', async (req, res) => {
    const { id } = req.params;
    await updateNotificacao(id);
    res.json({ message: 'Notificação atualizada com sucesso' });
});

router.get('/notificacoes', auth, async (req, res) => {
    try {
        const notificacoes = await getNotificacoes(req.token);
        if(notificacoes.length === 0) {
            return res.status(404).json({ message: "Não possui agendas" });
        }
        return res.status(200).json(notificacoes); 
    } catch (error) {
        res.sendStatus(500);  
    }
});

module.exports = router;