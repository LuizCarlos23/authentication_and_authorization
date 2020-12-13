async function authenticateController(req, res) {
  let formValidatorScheme = require("../schemes/formValidatorScheme")
  let userVerification = require("../models/userVerification")
  let values = req.body
  console.log(values)
  
  if(!await formValidatorScheme.isValid((values))) return res.status(400).send({"okay": "false", "message": "Invalid form!"})

  if(!await userVerification(req, res)) return res.status(400).send({"okay": "false", "message": "Invalid credentials"})
  
  return res.send({"okay": "true", "message": "Successfully logged in", "token": "teste"})
}

module.exports = authenticateController