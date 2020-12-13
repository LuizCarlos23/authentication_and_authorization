async function userVerification(req, res){
  try {
    let { email, password } = req.body
    const { QueryTypes, Model } = require('sequelize');
    let { connect } = require("../config/database")
    let db = await connect()
    
    const bcrypt = require("bcrypt")

    // Verificar se o EMAIL existe no banco de dados
    let user_admin = db.define("user_admins")
    let results = await user_admin.findAll({attributes: ["password", "id"], where: {email: email}, logging:false})
    if (results[0] == undefined) return [false]
    
    // Verificar se as senhas são iguais 
    let passwordHash = results[0].dataValues.password
    if (!await bcrypt.compare(password, passwordHash))  return [false]
    
    return [true, results[0].dataValues.id]

  } catch (error) {
    console.log(error)
    return [false]
  }
} 

module.exports = userVerification