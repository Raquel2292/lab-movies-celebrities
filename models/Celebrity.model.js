//  Add your code here
//Iteración 2
const mongoose = require("mongoose")

const celebritySchema = new mongoose.Schema({
    name: String, 
    occupation: String,
    catchPhrase: String,
})

const Celebrity = mongoose.model("Celebrity", celebritySchema)

module.exports = Celebrity