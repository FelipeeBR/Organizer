const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./src/routes/userRoutes");
const authRoutes = require("./src/routes/authRoutes");
const disciplinaRoutes = require("./src/routes/disciplinaRoutes");
const tarefaRoutes = require("./src/routes/tarefaRoutes");
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
}));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", disciplinaRoutes);
app.use("/api", tarefaRoutes);

app.listen(4000, () => {
    console.log("API funcionando na porta 4000");
});
