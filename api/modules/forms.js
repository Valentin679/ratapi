const {MongoClient, ObjectId} = require("mongodb");
const client = new MongoClient("mongodb+srv://admin:12345asd@rat.gk7dz4o.mongodb.net/?appName=rat");
const db = client.db("products")


module.exports.getForms = async (req, res) => {
    const collection = db.collection("forms");
    const result = await collection.find().toArray();
    res.send(result);
}