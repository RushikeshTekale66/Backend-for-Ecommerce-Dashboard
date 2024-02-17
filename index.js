const express = require("express");
require('./db/config');
const User = require('./db/User');
const Product = require('./db/Product');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    res.send(result);
})

app.post("/login", async (req, res) => {
    console.log(req.body);
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            res.send(user);
        }
        else {
            res.send({ result: "No User found" });
        }
    }
    else {
        res.send({ result: "No User found" });
    }
})

app.post('/add-product', async (req, res) => {
    let product = new Product(req.body);
    // const {base64} = req.body;
    // Product.create({image:base64});
    
    let result = await product.save();
    res.send(result);
})

// app.post('/add-product', async (req, res)=>{
//     const {base64} = req.body;
//     try{
//         Product.create({image:base64});
//         res.send({Status:"ok"});
//     }
//     catch(error){(console.error(error))}
// })

app.get('/products', async (req, res) => {
    let products = await Product.find();
    if (products.length > 0) {
        res.send(products);
    }
    else {
        res.send({ result: "No products found" });
    }
})

app.delete('/product/:id', async (req, res) => {
    // res.send(req.params.id);
    const result = await Product.deleteOne({ _id: req.params.id });
    res.send(result);
})

app.get('/product/:id', async (req, res) => {
    const result = await Product.findOne({ _id: req.params.id });
    if (result) {
        res.send(result);
    }
    else {
        res.send({ result: "No record found!!" });
    }
})

app.put('/product/:id', async (req, res) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    res.send(result);
})

app.get('/search/:key', async (req, res) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { price: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },
            { category: { $regex: req.params.key } }
        ]
    })
    res.send(result);
})
console.log("app is ready to go");

app.listen(port);
