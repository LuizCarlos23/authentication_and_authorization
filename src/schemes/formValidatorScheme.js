const yup = require("yup")

let formValidatorScheme = yup.object().shape({
  name: yup.string().required(),
  // age: yup.number().required().positive().integer(),
  email: yup.string().required().email(),
  password: yup.string().min(8).required()
})

module.exports = formValidatorScheme