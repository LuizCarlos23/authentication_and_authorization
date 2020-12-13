async function registerUserAdmin(){
  const bcrypt = require("bcrypt")
  const { QueryTypes } = require("sequelize")
  const { connect } = require("./database")
  const db = await connect()
  let password = await bcrypt.hash("paoebaum", 10) // Criptografar a senha para envir ao banco de dados
  
  // É preciso pelo menos UM "usuario" para que a segurança seja testa corretamente
  // Query para verificar se existe algum "usuario" no user_admin
  let queryText = "SELECT EXISTS(SELECT * FROM user_admins )"
  let results = await db.query(queryText, { type: QueryTypes.SELECT, logging: false })
  if (results[0].exists) return

  // Se não existir, será criado agora
  console.log("!! Não há um user admin, será criado agora !!")
    try {
      let values =  ["pao", "pao@gmail.com", password] // Valores padões -- Pode ser alterado sem afetar o resto do algoritmo 
      queryText = "INSERT INTO user_admins (name, email, password) values (?, ?, ?)"
      await db.query(queryText, {replacements:values, logging: false})
      console.log(">> O user admin foi criado com sucesso. Valores: ",values)
    } catch (error) {
      console.log("\n!! Houve um error ao criar o user admin !!")
      console.log(error)
    }
}

module.exports = registerUserAdmin