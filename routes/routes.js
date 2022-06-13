const express = require("express");
const cors = require('cors')
const Route = express.Router();

Route.use(cors())

const verifyLogin = require("../middlewares/login");
const login = require("../controllers/login");
const userController = require("../controllers/user");
const jobController = require("../controllers/jobpositions");

Route
  // Rota de login
  .post("/login", login.index) // Login

Route
  // Rotas de controle de Usuarios.
  .get("/user", userController.show) // Lista de usuarios
  .post("/user", userController.createUser) // Cadastra um usuario
  .put("/userup", userController.update) // altera senha do usuario
  .put("/userupjob", userController.upJobPosition) // Altera o Cargo de trabalho 
  .delete("/userdel", userController.destroy) // remove o usuario

Route
  .get("/job", jobController.show)
  .post("/job", jobController.createJob)

// rota publica bloqueada se acessada diretamente ----------------------------------
Route.get('/*', () => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>ApiMaxtec</title>
      <link rel="icon" href="images/favicon.png" sizes="32x32">
      <link rel='stylesheet' href='404/bootstrap.min.css'>
      <link rel='stylesheet' href='404/style.css'>
      <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Arvo'>
    </head>
    <body>
      <section class="page_404">
        <div class="container">
          <div class="row"> 
          <div class="col-sm-12 ">
          <div class="col-sm-10 col-sm-offset-1  text-center">
          <div class="four_zero_four_bg">
            <h1 class="text-center ">4 0 4</h1>
          </div>
          
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
