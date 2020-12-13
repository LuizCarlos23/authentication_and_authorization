const yup = require("yup")

// O formulario deve conter um name, email e passwod
// O name deve ser string, campo obrigatório 
// O email deve ser string e com formato de email, campo obrigatório
// o password deve ser string com, no minimo, 8 caractere, campo obrigatório 
let formValidatorScheme = yup.object().shape({
  name: yup.string().required(),
  // age: yup.number().required().positive().integer(),
  email: yup.string().required().email(),
  password: yup.string().min(8).required()
})

module.exports = formValidatorScheme