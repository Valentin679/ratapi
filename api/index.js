const express = require("express");
const app = express();
const {MongoClient} = require("mongodb");
// const Schema = mongoose.Schema;
const objectId = require("mongodb").ObjectId;
const client = new MongoClient("mongodb+srv://admin:12345asd@rat.gk7dz4o.mongodb.net/?appName=rat");


app.get("/", (req, res) => res.send("Express on Vercel"));
app.get("/api/users", async (req, res)=>{
    // получаем всех пользователей
    const db = client.db("Menu");
    const collectionNav = db.collection("nav");
    const navList = await collectionNav.find().toArray();
    res.send(navList);
});
app.get("/api/categories", async (req, res)=>{
    // получаем всех пользователей
    const db = client.db("material");
    const collectionCategories = db.collection("materials_categories");
    const catList = await collectionCategories.find().toArray();
    res.send(catList);
});
app.post("/api/categories", async (req, res) =>{

    if(!req.body) return res.sendStatus(400);

    const userName = req.body.name;
    const userAge = req.body.age;
    const user = new User({name: userName, age: userAge});
    // сохраняем в бд
    await user.save();
    res.send(user);
});
app.listen(8800, () => console.log("Server ready on port 3000."));


module.exports = app;