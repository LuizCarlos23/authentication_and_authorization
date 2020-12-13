const express = require("express")
const routes = express.Router()
const bodyParser = require("body-parser")

const authenticateController = require("../controllers/authenticateController")
const projectsController = require("../controllers/projectsController")

const auth = require("../middlewares/auth")

// Configuração para o body-parser
routes.use(bodyParser.urlencoded({ extended: true }))
routes.use(bodyParser.json())

routes.get("/", (req, res) => {
  console.log("Alguém passou por aqui!")
  //console.log(req.headers)
  return res.send({"msg": "Hello World"})
})


routes.post("/auth", authenticateController)
routes.get("/projects", auth, projectsController)

module.exports = routes