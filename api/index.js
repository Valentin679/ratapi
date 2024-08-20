const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();
app.use(express.urlencoded())
app.use(express.json());
const {MongoClient} = require("mongodb");
// const Schema = mongoose.Schema;
const objectId = require("mongodb").ObjectId;
const client = new MongoClient("mongodb+srv://admin:12345asd@rat.gk7dz4o.mongodb.net/?appName=rat");
const corsOptions = {
    origin: ["http://localhost:3000","https://rat-three.vercel.app"],
    default: "https://rat-three.vercel.app"

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
app.get("/api/categories", async(req, res)=> {
// получаем всех пользователей
    const db = client.db("material");
    const collectionCategories = db.collection("materials_categories");
    const catList = await collectionCategories.find().toArray();
    res.send(catList);
});
app.post("/api/categories", async (req, res) =>{
    const db = await client.db("material");
    const collectionCategories = await db.collection("materials_categories");
    if(!req.body) return res.sendStatus(400);
    const result = await collectionCategories.insertOne(req.body);
    console.log('req.body', req.body)
    res.send(result);
    console.log(result);
});
app.put("/api/categories", async (req, res)=>{
    const db = await client.db("material");
    const collectionCategories = await db.collection("materials_categories");
    if(!req.body) return res.sendStatus(400);
    const id = req.body.id;
    const slug = req.body.slug;
    const title = req.body.title;
    const oldSlug = req.body.title;
    const newCategory = {_id: slug, title: title, slug: slug};
    // обновляем данные пользователя по id
    const category = await collectionCategories.findOneAndUpdate({_id: oldSlug}, newCategory);
    if(category) res.send(category);
    else res.sendStatus(404);
});
app.listen(8800, () => console.log("Server ready on port 3000."));


module.exports = app;