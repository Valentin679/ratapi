const {MongoClient, ObjectId} = require("mongodb");
const client = new MongoClient("mongodb+srv://admin:12345asd@rat.gk7dz4o.mongodb.net/?appName=rat");
const db = client.db("sets")


module.exports.getSets = async (req, res) => {
    const collection = db.collection("sets");
    const result = await collection.find().toArray();
    res.send(result);
}
module.exports.addSets = async (req, res) => {
    const collection = db.collection("sets");
    if (!req.body) return res.sendStatus(400);
    const result = await collection.insertOne(req.body);
    console.log('req.body', req.body)
    res.send(result);
}
