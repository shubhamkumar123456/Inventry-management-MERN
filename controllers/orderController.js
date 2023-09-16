
const Order = require('../models/OrderSchema');
const Product = require('../models/ProductSchema')

const createOrder = async(req,res)=>{
   try {
    let userId=req.user.id;
    let price=[];
    const {productId,quantity}= req.body;
    let acceptedProducts=[];
    let acceptedProductQuantity=[];
    let rejectedProducts=[];
    let rejectedProductsQuantity=[];
    let rejectedProductsPrice=[]
    for(let i=0; i<productId.length; i++) {
        let product = await Product.findById(productId[i]);
        if(product.quantity<quantity[i]){
            rejectedProducts.push(productId[i]);
            rejectedProductsPrice.push(product.price);
            rejectedProductsQuantity.push(quantity[i]);
                continue;
        }else{
            
            price.push(product.price);
            let updatedQuantity=product.quantity-quantity[i];
           let updateProduct= await Product.findByIdAndUpdate(productId[i],{$set:{quantity:updatedQuantity}})
           acceptedProducts.push(productId[i]);
           acceptedProductQuantity.push(quantity[i]);
        }
      
    //    console.log(updateProduct)
    }
    let order = await Order.create({
        productId:acceptedProducts,
        userId,
        quantity:acceptedProductQuantity,
        price
    }) 

    let rejectedOrdersList={
        msg:"product quantity is less than order quantity",
        productId:rejectedProducts,
        userId,
        quantity:rejectedProductsQuantity,
        price:rejectedProductsPrice,
        
    }
    
    res.status(200).json({msg:"order created successfully",order,rejectedList:rejectedOrdersList})
   } catch (error) {
    res.send(error.message)
   }
    
}
const getOrder = async(req,res)=>{
    let userId=req.user.id
    let order= await Order.find({userId: userId});
    // let order= await Order.find({userId: userId}).populate({path:"productId"});
    if(!order){
        res.status(404).send("no order found");
    }else{
        res.status(200).json(order);
    }
}
const getAllorders = async(req,res)=>{
    let orders = await Order.find({});
    if(orders){
        res.status(200).json(orders);
    }else{
        res.status(404).send("no orders found");
    }
}
const updateOrder = async(req,res)=>{
    let price=req.body.price
    let order = await Order.findByIdAndUpdate(req.params.id,{$set:{totalPrice:price}},{new:true})
    res.status(200).json(order)
}
const deleteOrder = async(req,res)=>{
    let order = await Order.findById(req.params.id)
    const {productId,price,quantity}=order
    console.log(productId,price,quantity)

    for(let i=0; i<productId.length;i++){
        let product = await Product.findById(productId[i]);
        let updatedQuantity=product.quantity+quantity[i]
        let update = await Product.findByIdAndUpdate(productId[i],{$set:{quantity:updatedQuantity}});
    }
    res.send("order cancelled successfully")
}

module.exports={
    createOrder,
    getOrder,
    updateOrder,
    deleteOrder,
    getAllorders
}