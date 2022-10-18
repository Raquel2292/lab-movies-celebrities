const router = require("express").Router();
const Celebrity = require ("../models/Celebrity.model.js")

// GET ("/celebrities/create")
router.get ("/create", (req, res, next) => {
    res.render("celebrities/new-celebrity.hbs")
})

//POST ("/celebrities/create")
router.post ("/create", (req,res,next) => {
    console.log(req.body)

    const celebrityToAdd = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    }

    Celebrity.create(celebrityToAdd)
    .then((response) => {
        console.log("celebrity añadida correctamente")
        res.redirect("/celebrities")
    })
    .catch((error) => {
        next(error)
        res.redirect("celebrities/new-celebrity")
    })

})

//GET ("/celebrities")
router.get ("/", (req, res, next) => {
    Celebrity.find()
    .then((response) => {
        console.log("todas las celebrities")
        res.render("celebrities/celebrities.hbs", {
            listCelebrity: response
        })
    })
    .catch((error) => {
        next(error)
    })
    
})








module.exports = router;