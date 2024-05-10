const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const Favorite = require("./favorite")

mongoose.connect("mongodb+srv://angeltena2742:zxZkUaVhgrepQWZR@cluster0.xpqvqzk.mongodb.net/")
    .then(() => console.log("conexion exitosa"))
    .catch((err) => {
        console.log(err);
    })

const corsOptions =
{
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}

app.use(cors(
    corsOptions
))

app.use(express.json())

app.get("/favorites", async (req, res) => {
    const personajes = await Favorite.find()
    res.json(personajes).status(200)
})

app.post("/favorites/create", (req, res) => {
    const { name, image } = req.body

    const user = new Favorite({ name, image})

    user.save()

    res.json({ user, message: "se creo" }).status(201)

})

app.listen(4000, () => {
    console.log("server listo");
})