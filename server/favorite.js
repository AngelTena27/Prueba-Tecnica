const mongoose = require("mongoose");

const FavoriteShema = mongoose.Schema({
    name: String,
    image: String
})

const Favorite = mongoose.model("favorite", FavoriteShema)

module.exports = Favorite