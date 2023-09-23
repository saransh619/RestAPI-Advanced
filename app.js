require("dotenv").config();
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000;
const connectDB = require("./db/connect");

const products_routes = require("./routes/products");

app.get("/",(req,res)=>{
    res.send("Hello world")
})

// middleware or to set router
app.use("/api/products",products_routes)

const start = async () => {
    try{
      await connectDB(process.env.MONGODB_URL);
      app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`);
      }  );  
    }catch(err){
        console.log(err);
    }
};
start();