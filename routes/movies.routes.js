const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model.js");
const Movie = require("../models/Movie.model.js");
const Movies = require("../routes/movies.routes.js");


// GET ("/movies")
router.get ("/" ,  (req, res, next) => {
    Movie.find()
    .then ((response) => {
        res.render("movies/movies.hbs", {
            moviesList: response
        })
    })  
})


// GET ("/movies/create")
router.get ("/create", async (req, res, next) => {
   try {
        const castList = await Celebrity.find()
        res.render("movies/new-movie.hbs", {
          castList
        })
      } catch (error) {
        next(error)
      }
})

//POST ("/movies/create")
router.post ("/create", async (req, res, next) => {
   const {title, genre, plot, cast} = req.body 
   try {
      await Movie.create({title, genre, plot, cast})
      res.redirect("/movies")
}
catch(error) {
    next(error)
}
})

//GET ("/movies/:movieId/movies-details")
router.get ("/:movieId/movies-details", (req, res, next) => {
    const {movieId} = req.params

    Movie.findById(movieId)
    .populate("cast")
    .then((response) => {
        console.log(response)
        res.render("movies/movie-details.hbs", {
            details: response
        })
    })
    .catch((error) => {
        next(error)
    })
})


//POST ("/movies/movieId/delete")
router.post ("/:movieId/delete", (req, res, next) => {
    Movie.findByIdAndDelete(req.params.movieId)
    .then (() => {
        res.redirect("/movies")
    })
    .catch((error) => {
        next(error)
    })
})

//GET ("/movies/:id/edit")
router.get ("/:movieId/edit", (req, res, next) => {
    Movie.findById(req.params.movieId)
    Celebrity.find()
    .then((response) => {
        res.render("edit-movie.hbs", {
            details: response
        })
    })
    .catch((error) => {
        next(error)
    })

  
})
















module.exports = router;