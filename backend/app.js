require("dotenv").config("./.env");
// console.log(process.env.KEY_ID)
const express = require('express');
const mongoose = require('mongoose');
const CategoryRouter = require('./routers/category.router');
const ProductRouter = require('./routers/product.router');
const cors = require('cors');
const ColorRouter = require('./routers/color.router');
const UserRouter = require('./routers/user.router');
const AdminRouter = require('./routers/admin.router');
const OrderRouter = require('./routers/order.router');
const CartRouter = require('./routers/cart.router');
const TransactionRouter = require('./routers/transaction.router');

const app = express();
app.use(cors({ origin: "*" }))
app.use(express.static('public'));
app.use(express.json());


mongoose.connect('mongodb+srv://admin:admin%40123@cluster0.8atnt.mongodb.net/', { dbName: "wsjp61" }).then(
    () => {
        console.log("connected to db");
    }
).catch(
    (error) => {
        console.log("error connecting to db");
        console.log(error.message)
});


app.use('/category', CategoryRouter);
app.use('/product', ProductRouter);
app.use('/color', ColorRouter);
app.use('/user', UserRouter);
app.use('/admin', AdminRouter);
app.use('/order', OrderRouter);
app.use('/cart', CartRouter)
app.use('/transaction', TransactionRouter)

// app.get(
//     '/',
//     (req, res) =>{
//        res.send({flag:1, message:"Welcome to the server"});
//     }
// );

// server.post(
//     'create',
//     (req, res)=>{

//     }
// )

// server.delete(
//     '/delete/:id',
//     (req, res) =>{

//     }
// )

// server.all(
//     '/*',
//     (req, res)=>{

//     }
// )

app.listen(5000,
    () => {
        console.log("server started")
    }
)