require("dotenv/config")
const express = require("express")
const serverConfiguration = require("./src/config/serverConfig")

const {initDatabase} = require("./src/config/database")
const PORT = process.env.SERVER_PORT || 9937 

const app = serverConfiguration(express)

app.listen(PORT, async () => {
  try{
    await initDatabase()
  } catch ( error ){
    console.log(">> Não foi possivel conectar ao banco de dados:\n\n", error,"\n\n")
  }

  console.log(`\nServer open on port ${PORT}\n\n`)
})