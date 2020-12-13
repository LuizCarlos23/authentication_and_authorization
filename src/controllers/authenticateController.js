async function authenticateController(req, res) {
  const jwt = require("jsonwebtoken")
  let formValidatorScheme = require("../schemes/formValidatorScheme")
  let userVerification = require("../models/userVerification")
  let values = req.body
  console.log(values)
  
  // Valdiar o formulario
  if(!await formValidatorScheme.isValid((values))) return res.status(400).send({"okay": "false", "message": "Invalid form!"})
  
  // Retorna um array que pode ter Um ou DOIS elementos, dependendo do resultado.
  // Se as credenciais estiverem certas será retornado um array com os valores [true, id_usuario] 
  // Se não será retornado apenas [false]
  let result = await userVerification(req, res) 
  if(!result[0]) return res.status(400).send({"okay": "false", "message": "Invalid credentials"})
  
  // console.log(result[1])
  let token = jwt.sign({id: result[1]}, process.env.SECRET, {expiresIn: 24 * 60 * 60})

  return res.send({"okay": "true", "message": "Successfully logged in", "token": token})


}

module.exports = authenticateController