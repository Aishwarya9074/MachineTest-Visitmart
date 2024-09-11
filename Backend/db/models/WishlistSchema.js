import {Schema,model} from 'mongoose';

const WishlistSchema=new Schema({
    user:{
          type:Schema.Types.ObjectId,
        ref:'User'

    },
    items:[
        {productId: { type: Schema.Types.ObjectId,
             ref: 'Product',
              required: true }}
    ],
    createdAt: { type: Date, default: Date.now }


})
const Wishlist=model('Wishlist',WishlistSchema)
export default Wishlist;