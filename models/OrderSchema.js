const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
 productId:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"product",
 }],
 userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"admin",
 },
 price:[{
    type:Number,
    required:true,
 }],
 quantity:[{
    type:Number,
    required:true,
 }],
 totalPrice:{
   type:Number,
   default:"",
 }
},
{timestamps: true}
)
orderSchema.post('save', function(){
   this.productId="1"

})

module.exports = mongoose.model('order', orderSchema);
