const express = require("express");
const cors = require('cors')
const Route = express.Router();

Route.use(express.static('public'));
Route.use(cors())

const verifyLogin = require("../middlewares/login");

const login = require("../controllers/UserControllers/LoginController");
const user = require("../controllers/UserControllers/user");
const location = require("../controllers/LocationController/Points");

Route
  // Rota de login
  .post("/login", login.index) // Login

  // Rotas de usuario
  .get("/bGlzdHVzZXI=", user.show) // Cadastrar usuario
  .post("/Y3JlYXRldXNlcg==", user.createUser) // Cadastrar usuario

  // Rotas de localização
  Route
  .post("/bmVhcmVzdFBvaW50", location.findNearestPoint) // Busca o ponto mais proximo
  

// rota publica bloqueada se acessada diretamente ----------------------------------
Route.get('/*', (req, res) => {
  return res.send(`<!DOCTYPE html>
  <html>
  
  <head>
      <title>Find My Car- API</title>
      <link rel="icon" href="images/favicon.png" sizes="32x32">
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
                              <p>Estamos de olho em você!</p>
  
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>
  </body>
  
  </html>`)
})
module.exports = Route;

// https://www.cleancss.com/base64-encode/?_ga=2.222008272.979171467.1697727012-140852722.1697727012
// bGlzdHVzZXI=     listuser
// Y3JlYXRldXNlcg== createuser

// bmVhcmVzdFBvaW50 nearestPoint
