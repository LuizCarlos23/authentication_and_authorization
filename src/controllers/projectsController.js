async function projectsController(req, res){
  return res.status(200).send({"id": req.userId})
} 

module.exports = projectsController