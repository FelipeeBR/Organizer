const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./src/routes/userRoutes");
const authRoutes = require("./src/routes/authRoutes");
const disciplinaRoutes = require("./src/routes/disciplinaRoutes");
const tarefaRoutes = require("./src/routes/tarefaRoutes");
const anotacaoRoutes = require("./src/routes/anotacaoRoutes");
const agendaRoutes = require("./src/routes/agendaRoutes");
const notificacaoRoutes = require("./src/routes/notificacaoRoutes");
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors({
  origin: process.env.URL_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
}));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", disciplinaRoutes);
app.use("/api", tarefaRoutes);
app.use("/api", anotacaoRoutes);
app.use("/api", agendaRoutes);
app.use("/api", notificacaoRoutes);

app.listen(4000, () => {
    console.log("API funcionando na porta 4000");
});
