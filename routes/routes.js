const express = require("express");
const cors = require('cors')
const Route = express.Router();

Route.use(cors())

const verifyLogin = require("../middlewares/login");
const login = require("../controllers/login");
const userController = require("../controllers/user");
const jobController = require("../controllers/jobPositions");
const feedController = require("../controllers/feed");
const commentController = require("../controllers/comment");
const suggestionController = require("../controllers/suggestion");
const warningController = require("../controllers/warning");
const availableController = require("../controllers/availableJob");
const pointController = require("../controllers/workPoint");

Route
  // Rota de login
  .post("/login", login.index) // Login

Route
  // Rotas de controle de Usuarios.
  .get("/user", verifyLogin, userController.show) // Lista de usuarios
  .post("/user", verifyLogin, userController.createUser) // Cadastra um usuario
  .put("/userup", verifyLogin, userController.update) // altera senha do usuario
  .put("/userupjob", verifyLogin, userController.upJobPosition) // Altera o Cargo de trabalho 
  .delete("/userdel", verifyLogin, userController.destroy) // remove o usuario

Route
  // Rotas de Controle de Cargos
  .get("/job", verifyLogin, jobController.show) // lista Todos os Cargos Cadastrados
  .post("/job", verifyLogin, jobController.createJob) // Cadastro De Cargos

Route
  // Rota de Controle das Publicações
  .get("/feed", verifyLogin, feedController.show) // lista de Todas as Questões
  .post("/feed", verifyLogin, feedController.createPublic) // Cadastro de Questões

Route
  // Rota de Controle dos Comentarios
  .post("/comment", verifyLogin, commentController.createComment) // Cadastro de commentarios

Route
  // Rota de Controle de Sugestoes 
  .get("/suggestion", verifyLogin, suggestionController.show) // lista de Sugestões
  .post("/suggestion", verifyLogin, suggestionController.createSuggestion) // Cadastro de Sugestões
  .delete("/delsuggestion", verifyLogin, suggestionController.destroy) // Delete de Sugestões

Route
  // Rota de Controle de Warnings 
  .get("/warning", verifyLogin, warningController.show) // lista de Warning
  .post("/warning", verifyLogin, warningController.createwarning) // Cadastro de Warnings
  .delete("/delwarning", verifyLogin, warningController.destroy) // Delete de Warnings

Route
  // Rota de Controle de vagas 
  .get("/vacancie", verifyLogin, availableController.show) // lista de Warning
  .post("/vacancie", verifyLogin, availableController.createVacancie) // Cadastro de Warnings
  .delete("/delvacancie", verifyLogin, availableController.destroy) // Delete de Warnings

Route
  // Rota de Ponto
  .get("/point", verifyLogin, pointController.show) // lista de Ponto de todos usuarios
  .post("/point", verifyLogin, pointController.createPoint) // Cadastro de Ponto

// rota publica bloqueada se acessada diretamente ----------------------------------
Route.get('/*', () => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Work Flows api</title>
      <link rel="icon" href="images/favicon.png" sizes="32x32">
      <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Arvo'>
    </head>
    <body>
      <section class="page_404">
        <div class="container">
          <div class="row"> 
          <div class="col-sm-12 ">
          <div class="col-sm-10 col-sm-offset-1  text-center">
          <div class="contant_box_404">
          <h3 class="h2">
            Parace que você está perdido
          </h3>
          
          <p>o endereço que você esta procurando não esta disponível!</p>
          
          <a href="javascript:history.back()" class="link_404">Voltar para o site</a>
        </div>
          </div>
          </div>
          </div>
        </div>
      </section>
    </body>
    </html>
  `
})
module.exports = Route;
