async function connect(){
  const  { Sequelize } = require("sequelize")
  const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    "postgres",
    process.env.DATABASE_PASSWORD,
    {
      host: "localhost",
      dialect: "postgres"
    }
  )

  return sequelize
}

async function initDatabase(){
  const { QueryTypes, DataTypes } = require("sequelize")
  const registerUserAdmin = require("./registerUserAdmin")
  let db = await connect()
  const queryInterface = db.getQueryInterface()

  try {
    // Função propria sequelize que testa a conexão com o banco de dados
    await db.authenticate({logging: false})
    console.log(">> Conexão com o banco de dados estabelecida com sucesso.\n")
  } catch (error) {
    console.log("!! Error ao conectar com o banco de dados !!")
    console.log(error)
    return 
  }
  
  // Query apra verificar se a tabela user_admin existe
  let queryText = "SELECT EXISTS(SELECT FROM information_schema.tables WHERE table_name = 'user_admins' )"
  let results = await db.query(queryText, { type: QueryTypes.SELECT, logging: false })

  // Se NÃO existir, criarar
  if (!results[0].exists) {
    console.log("!! Tabela user_admins não existe, será criada agora !!")
    try {
      let tableScheme = require("../schemes/tableScheme")
      results = await queryInterface.createTable("user_admins", tableScheme)
      console.log(">> Tabela user_admins criada com sucesso.\n")

    } catch (error) {
      console.log("\n!! Houve um error ao criar a tabela user_admins !!")
      console.log(error)
    }
  }
  
  await registerUserAdmin()

}

module.exports = {connect, initDatabase}