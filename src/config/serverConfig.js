function serverConfiguration(express){
  const limiter = require("../middlewares/rateLimit")

  const routes = require("./routes")
  const cors = require("cors")
  const helmet = require("helmet")

  
  const app = express()

  // Ativar o cors
  app.use(cors())
  // Helmet para configurar melhor os header de response -> Mais segurança
  app.use(helmet())
  // Adicionar middleware para limitar as requisições de um mesmo ip
  app.use(limiter)
  // Adicionando as rotas
  app.use("/", routes)

  // Configuração para o express reconhcer objetos json
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  return app
}

module.exports = serverConfiguration