const { response } = require('express');
const Product = require('../models/ProductSchema');
const { v2 } = require("cloudinary");
v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });

const createProduct= async(req,res)=>{
  try {
    let imgPath = "";
  req.files?.img &&
    (await v2.uploader.upload(req.files.img.tempFilePath, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        imgPath = result.url;
      }
    }));
    const {name,description,quantity,price}=req.body;
    let product = await Product.create({
        name,
        description,
        quantity,
        price,
        img:imgPath?imgPath:"https://as1.ftcdn.net/v2/jpg/02/57/42/72/1000_F_257427286_Lp7c9XdPnvN46TyFKqUaZpPADJ77ZzUk.jpg"
    });
    res.status(200).json({product});
  } catch (error) {
    res.send(error.message);
  }

}
const getProduct= async(req,res)=>{
    let products = await Product.find({});
    if(!products){
        res.status(404).send({message: 'Product not found'});
    }else{
        res.status(200).send({products});
    }
}
const updateProduct= async(req,res)=>{
    const {name,description,price,quantity} = req.body;
    let obj={};
    if(name){obj.name = name};
    if(price){obj.price = price};
    if(quantity){obj.quantity = quantity}
    if(description){obj.description = description}
    let product =await Product.findByIdAndUpdate(req.params.id,{$set:obj},{new:true});
    if(!product){
        res.status(404).send("Product not found");
    }else{
        res.status(200).json(product);
    }
}
const deleteProduct= async(req,res)=>{
    let product = await Product.findByIdAndDelete(req.params.id);
    if(product===null){
        res.status(404).send("Product not found");
    }else{
        res.status(200).send("product deleted successfully");
    }
}

module.exports ={
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
}