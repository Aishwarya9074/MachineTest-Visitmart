import {Schema,model, } from "mongoose";


const CartSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    items:[
        {productId:
            { type:Schema.Types.ObjectId,
                ref:'Product',
                required:true
            },
            quantity:{
                type:Number,
                default:1,
                required:true
            }
        }

    ],
    createdAt: { type: Date, default: Date.now }
})

const Cart=model('Cart',CartSchema)
export default Cart