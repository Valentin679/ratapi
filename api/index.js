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
    origin: ["http://localhost:3000", "https://rat-three.vercel.app"],
    default: "https://rat-three.vercel.app"
    // default: "http://localhost:3000"

};

app.use(cors(corsOptions));

app.get("/", (req, res) => res.send("Express on Vercel"));
app.get("/api/users", async (req, res) => {
    // получаем всех пользователей
    const db = client.db("Menu");
    const collectionNav = db.collection("nav");
    const navList = await collectionNav.find().toArray();
    res.send(navList);
});
// Категории сырья
app.get("/api/materials-categories", async (req, res) => {
// получаем всех пользователей
    const db = client.db("material");
    const collectionCategories = db.collection("materials_categories");
    const catList = await collectionCategories.find().toArray();
    res.send(catList);
});
app.post("/api/materials-categories", async (req, res) => {
    const db = await client.db("material");
    const collectionCategories = await db.collection("materials_categories");
    if (!req.body) return res.sendStatus(400);
    const result = await collectionCategories.insertOne(req.body);
    console.log('req.body', req.body)
    res.send(result);
    console.log(result);
});
app.put("/api/materials-categories", async (req, res) => {
    const db = await client.db("material");
    const collectionCategories = await db.collection("materials_categories");
    if (!req.body) return res.sendStatus(400);
    const slug = req.body.slug;
    const title = req.body.title;
    const oldSlug = req.body.oldSlug;
    console.log('req.body', req.body)
    const newCategory = {title: title, slug: slug};
    // обновляем данные
    const result = await collectionCategories.findOneAndUpdate({slug: oldSlug}, {$set: newCategory});
    res.status(200).json({result})
});

app.delete("/api/materials-categories/:id", async (req, res) => {
    const db = await client.db("material");
    const collectionCategories = await db.collection("materials_categories");
    if (!req.body) return res.sendStatus(400);
    const slug = req.params.id;
    // удаляем по id
    const result = await collectionCategories.deleteOne({slug: slug});
    res.status(200).json({result})
});

// Сырье
app.get("/api/materials", async (req, res) => {
// получаем всех пользователей
    const db = client.db("material");
    const collectionMaterials = db.collection("materials");
    const materialsList = await collectionMaterials.find().toArray();
    res.send(materialsList);
});

app.post("/api/materials", async (req, res) => {
    const db = client.db("material");
    const collectionMaterials = db.collection("materials");
    if (!req.body) return res.sendStatus(400);
    const result = await collectionMaterials.insertOne(req.body);
    console.log('req.body', req.body)
    res.send(result);
    console.log(result);
});

app.put("/api/materials", async (req, res) => {
    const db = client.db("material");
    const collectionMaterials = db.collection("materials");
    if (!req.body) return res.sendStatus(400);
    const id = req.body.id;
    const title = req.body.title;
    const category = req.body.category;
    const categoryTitle = req.body.categoryTitle;
    console.log('req.body', req.body)
    const newMaterial = {title, category, categoryTitle};
    // обновляем данные
    const result = await collectionMaterials.findOneAndUpdate({title: title}, {$set: newMaterial});
    res.status(200).json({result})
});

app.listen(8800, () => console.log("Server ready on port 8800."));


module.exports = app;