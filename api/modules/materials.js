const {MongoClient, ObjectId} = require("mongodb");
const client = new MongoClient("mongodb+srv://admin:12345asd@rat.gk7dz4o.mongodb.net/?appName=rat");


module.exports.getMaterials = async (req, res) => {
    const db = client.db("material");
    const collectionMaterials = db.collection("materials");
    const materialsList = await collectionMaterials.find().toArray();
    res.send(materialsList);
}

module.exports.addMaterials = async (req, res) => {
    const db = client.db("material");
    const collectionMaterials = db.collection("materials");
    if (!req.body) return res.sendStatus(400);
    const result = await collectionMaterials.insertOne(req.body);
    console.log('req.body', req.body)
    res.send(result);
}