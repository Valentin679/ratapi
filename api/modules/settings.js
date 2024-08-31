const {MongoClient, ObjectId} = require("mongodb");
const client = new MongoClient("mongodb+srv://admin:12345asd@rat.gk7dz4o.mongodb.net/?appName=rat");


module.exports.getAdminMenu = async (req, res) => {
    const collectionMenu = await client.db("settings").collection("admin-menu");
    const menuList = collectionMenu.find().toArray();
    res.send(menuList);
}

// module.exports.addMaterials = async (req, res) => {
//     const db = client.db("material");
//     const collectionMaterials = db.collection("materials");
//     if (!req.body) return res.sendStatus(400);
//     const result = await collectionMaterials.insertOne(req.body);
//     console.log('req.body', req.body)
//     res.send(result);
// }
//
// module.exports.putMaterials = async (req, res) => {
//     const db = client.db("material");
//     const collectionMaterials = db.collection("materials");
//     if (!req.body) return res.sendStatus(400);
//     const oldTitle = req.body.oldTitle;
//     const title = req.body.title;
//     const category = req.body.category;
//     const categoryTitle = req.body.categoryTitle;
//     const price = req.body.price;
//     console.log('req.body', req.body)
//     const newMaterial = {title, category, categoryTitle, price};
//     // обновляем данные
//     const result = await collectionMaterials.findOneAndUpdate({title: oldTitle}, {$set: newMaterial});
//     res.status(200).json({result})
// }
//
// module.exports.deleteMaterials = async (req, res) => {
//     const db = client.db("material");
//     const collectionMaterials = db.collection("materials");
//     if (!req.body) return res.sendStatus(400);
//     const id = req.params.id;
//     const newId = new ObjectId(id)
//     // удаляем по id
//     const result = await collectionMaterials.deleteOne({_id: newId});
//     res.status(200).json({result})
// }