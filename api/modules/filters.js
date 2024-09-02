const {MongoClient, ObjectId} = require("mongodb");
const client = new MongoClient("mongodb+srv://admin:12345asd@rat.gk7dz4o.mongodb.net/?appName=rat");
const db = client.db("filtres")


module.exports.getFiltresCategories = async (req, res) => {
    const collection = db.collection("filtres_categories");
    const result = await collection.find().toArray();
    res.send(result);
}