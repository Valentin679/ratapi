const express = require("express");
const app = express();
const {MongoClient} = require("mongodb");
// const Schema = mongoose.Schema;
const objectId = require("mongodb").ObjectId;
const cors = require('cors');


app.use(express.static("public"));
app.use(express.json());
app.use(cors());

// const menuScheme = new Schema({id: String, title: String}, {versionKey: false});
// const User = mongoose.model("Menu", menuScheme);
const client = new MongoClient("mongodb+srv://admin:12345asd@rat.gk7dz4o.mongodb.net/?appName=rat");
async function server() {

    try{
        await client.connect();
        app.listen(8000);
        console.log("Сервер ожидает подключения...");
        // console.log(navList);
    }
    catch(err) {
        return console.log(err);
    }
}

app.get("/api/users", async (req, res)=>{
    // получаем всех пользователей
    const db = client.db("Menu");
    const collectionNav = db.collection("nav");
    const navList = await collectionNav.find().toArray();
    res.send(navList);
});

app.get("/api/users/:id", async(req, res)=>{

    const id = new objectId(req.params.id);
    const db = client.db("Menu");
    const collectionNav = db.collection("nav");
    const navOne = await collectionNav.findOne({_id: id})
    if(navOne) res.send(navOne);
    else res.sendStatus(404);
});

// app.post("/api/users", async (req, res) =>{
//
//     if(!req.body) return res.sendStatus(400);
//
//     const userName = req.body.name;
//     const userAge = req.body.age;
//     const user = new User({name: userName, age: userAge});
//     // сохраняем в бд
//     await user.save();
//     res.send(user);
// });
//
// app.delete("/api/users/:id", async(req, res)=>{
//
//     const id = req.params.id;
//     // удаляем по id
//     const user = await User.findByIdAndDelete(id);
//     if(user) res.send(user);
//     else res.sendStatus(404);
// });
//
// app.put("/api/users", async (req, res)=>{
//
//     if(!req.body) return res.sendStatus(400);
//     const id = req.body.id;
//     const userName = req.body.name;
//     const userAge = req.body.age;
//     const newUser = {age: userAge, name: userName};
//     // обновляем данные пользователя по id
//     const user = await User.findOneAndUpdate({_id: id}, newUser, {new: true});
//     if(user) res.send(user);
//     else res.sendStatus(404);
// });

server().then(r => console.log('good'));
// прослушиваем прерывание работы программы (ctrl-c)
process.on("SIGINT", async() => {

    await client.close();
    console.log("Приложение завершило работу");
    process.exit();
});