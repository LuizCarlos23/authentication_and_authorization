const RateLimit = require("express-rate-limit")

const limiter = new RateLimit({
  windowMs: 5000,
  max: 5,
  message: { error: "Too many requests, please try again later." }
})

module.exports = limiter