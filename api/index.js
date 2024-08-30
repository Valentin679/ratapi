const express = require("express");
const cors = require('cors');

const bodyParser = require('body-parser')

const app = express();
app.use(express.urlencoded())
app.use(express.json());
const {MongoClient, ObjectId} = require("mongodb");
// const Schema = mongoose.Schema;
const objectId = require("mongodb");
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
// app.get("/api/materials-categories", async (req, res) => {
// // получаем всех пользователей
//     const collectionCategories = await client.db("material").collection("materials_categories");
//     // const collectionCategories = db.collection("materials_categories");
//     const catList = await collectionCategories.find().toArray();
//     res.send(catList);
// });
// app.post("/api/materials-categories", async (req, res) => {
//     const db = await client.db("material");
//     const collectionCategories = await db.collection("materials_categories");
//     if (!req.body) return res.sendStatus(400);
//     const result = await collectionCategories.insertOne(req.body);
//     console.log('req.body', req.body)
//     res.send(result);
//     console.log(result);
// });
// app.put("/api/materials-categories", async (req, res) => {
//     const db = await client.db("material");
//     const collectionCategories = await db.collection("materials_categories");
//     if (!req.body) return res.sendStatus(400);
//     const slug = req.body.slug;
//     const title = req.body.title;
//     const oldSlug = req.body.oldSlug;
//     console.log('req.body', req.body)
//     const newCategory = {title: title, slug: slug};
//     // обновляем данные
//     const result = await collectionCategories.findOneAndUpdate({slug: oldSlug}, {$set: newCategory});
//     res.status(200).json({result})
// });
//
// app.delete("/api/materials-categories/:id", async (req, res) => {
//     const db = await client.db("material");
//     const collectionCategories = await db.collection("materials_categories");
//     if (!req.body) return res.sendStatus(400);
//     const slug = req.params.id;
//     // удаляем по id
//     const result = await collectionCategories.deleteOne({slug: slug});
//     res.status(200).json({result})
// });

const materialsCategories = require('./modules/materialsCategories')
// Сырье
app.get("/api/materials", materialsCategories.getMaterialsCategories)
app.post("/api/materials", materialsCategories.addMaterialsCategories)
app.put("/api/materials", materialsCategories.putMaterialsCategories)
app.delete("/api/materials/:id", materialsCategories.deleteMaterialsCategories)

const materials = require('./modules/materials')
// Сырье
app.get("/api/materials", materials.getMaterials)
app.post("/api/materials", materials.addMaterials)
app.put("/api/materials", materials.putMaterials)
app.delete("/api/materials/:id", materials.deleteMaterials)








app.listen(8800, () => console.log("Server ready on port 8800."));


module.exports = app;