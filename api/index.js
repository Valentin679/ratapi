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

const materialsCategories = require('./modules/materialsCategories')
// Категории сырья
app.get("/api/materials-categories", materialsCategories.getMaterialsCategories)
app.post("/api/materials-categories", materialsCategories.addMaterialsCategories)
app.put("/api/materials-categories", materialsCategories.putMaterialsCategories)
app.delete("/api/materials-categories/:id", materialsCategories.deleteMaterialsCategories)

const materials = require('./modules/materials')
// Сырье
app.get("/api/materials", materials.getMaterials)
app.post("/api/materials", materials.addMaterials)
app.put("/api/materials", materials.putMaterials)
app.delete("/api/materials/:id", materials.deleteMaterials)

const settings = require('./modules/settings')
//Настройки
app.get("/api/settings/menu", settings.getAdminMenu)








app.listen(8800, () => console.log("Server ready on port 8800."));


module.exports = app;