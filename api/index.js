const express = require("express");
const cors = require('cors');
const app = express();
const {MongoClient} = require("mongodb");
// const Schema = mongoose.Schema;
const objectId = require("mongodb").ObjectId;
const client = new MongoClient("mongodb+srv://admin:12345asd@rat.gk7dz4o.mongodb.net/?appName=rat");
const corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
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
    console.log(req)
    if(!req.body) return res.sendStatus(400);
    const db = client.db("material");
    console.log(db);
    const collectionCategories = db.collection("materials_categories");
    console.log(collectionCategories);
    // const title = req.body.title;
    // const slug = req.body.slug;
    // const category = {title: title, slug:slug};
    const result = await collectionCategories.insertOne(req);
    console.log(result);
    res.send(result);
});
app.listen(8800, () => console.log("Server ready on port 3000."));


module.exports = app;