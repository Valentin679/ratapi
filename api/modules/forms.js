const {MongoClient, ObjectId} = require("mongodb");
const client = new MongoClient("mongodb+srv://admin:12345asd@rat.gk7dz4o.mongodb.net/?appName=rat");
const db = client.db("products")


module.exports.getForms = async (req, res) => {
    const collection = db.collection("forms");
    const result = await collection.find().toArray();
    res.send(result);
}

module.exports.addForm = async (req, res) => {
    const collection = db.collection("forms");
    if (!req.body) return res.sendStatus(400);
    const result = await collection.insertOne(req.body);
    console.log('req.body', req.body)
    res.send(result);
}