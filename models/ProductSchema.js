const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
      type:String,
      required:true,  
    }, 
    quantity:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true
    },
    expirationDate:{
        type:Date,
    },
    img:{
        type:String,
    }
        

},
{timestamps: true}
)
module.exports = mongoose.model('product', productSchema);
