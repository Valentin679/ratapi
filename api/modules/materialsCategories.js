const {MongoClient, ObjectId} = require("mongodb");
const client = new MongoClient("mongodb+srv://admin:12345asd@rat.gk7dz4o.mongodb.net/?appName=rat");


module.exports.getMaterialsCategories = async (req, res) => {
    const collectionCategories = await client.db("material").collection("materials_categories");
    // const collectionCategories = db.collection("materials_categories");
    const catList = await collectionCategories.find().toArray();
    res.send(catList);
}

module.exports.addMaterialsCategories = async (req, res) => {
    const collectionCategories = await client.db("material").collection("materials_categories");
    if (!req.body) return res.sendStatus(400);
    const result = await collectionCategories.insertOne(req.body);
    console.log('req.body', req.body)
    res.send(result);
    console.log(result);
}

module.exports.putMaterialsCategories = async (req, res) => {
    const collectionCategories = await client.db("material").collection("materials_categories");
    if (!req.body) return res.sendStatus(400);
    const slug = req.body.slug;
    const title = req.body.title;
    const oldSlug = req.body.oldSlug;
    console.log('req.body', req.body)
    const newCategory = {title: title, slug: slug};
    // обновляем данные
    const result = await collectionCategories.findOneAndUpdate({slug: oldSlug}, {$set: newCategory});
    res.status(200).json({result})
}

module.exports.deleteMaterialsCategories = async (req, res) => {
    const collectionCategories = await client.db("material").collection("materials_categories");
    if (!req.body) return res.sendStatus(400);
    const slug = req.params.id;
    // удаляем по id
    const result = await collectionCategories.deleteOne({slug: slug});
    res.status(200).json({result})
}