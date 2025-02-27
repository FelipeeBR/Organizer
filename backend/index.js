const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./src/routes/userRoutes");
const authRoutes = require("./src/routes/authRoutes");
const disciplinaRoutes = require("./src/routes/disciplinaRoutes");
const tarefaRoutes = require("./src/routes/tarefaRoutes");
const anotacaoRoutes = require("./src/routes/anotacaoRoutes");
const agendaRoutes = require("./src/routes/agendaRoutes");
const notificacaoRoutes = require("./src/routes/notificacaoRoutes");
const desempenhoRoutes = require("./src/routes/desempenhoRoutes");
const emailRoutes = require("./src/routes/emailRoutes");
const cors = require('cors');

const app = express();

const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [process.env.URL_ORIGIN];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`Bloqueado pelo CORS: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", disciplinaRoutes);
app.use("/api", tarefaRoutes);
app.use("/api", anotacaoRoutes);
app.use("/api", agendaRoutes);
app.use("/api", notificacaoRoutes);
app.use("/api", desempenhoRoutes);
app.use("/api", emailRoutes);
app.use('/public', express.static(path.join(__dirname, 'public')));

app.listen(4000, () => {
    console.log("API funcionando na porta 4000");
});
