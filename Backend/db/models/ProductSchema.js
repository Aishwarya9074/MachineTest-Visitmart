import {Schema,model} from 'mongoose';

const ProductSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        required:true,
        default:0
    },
    images:[
        String
    ],
    createdAt:{
        type:Date,
        default:Date.now()
    }
})
const Product=model('Product',ProductSchema)
export default Product;