// routes/wishlist.js
import express from 'express';
import Product from '../../db/models/ProductSchema.js';
import Wishlist from '../../db/models/WishlistSchema.js';
import checkToken from "../../middleware/checkToken.js";

const router = express.Router();

// Add product to wishlist
router.post('/add',  async (req, res) => {
    const { productId } = req.body;
    const userId = req.user?.id;

    try {
        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Find or create the user's wishlist
        let wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {
            wishlist = new Wishlist({
                user: userId,
                items: [{ productId }]
            });
        } else {
            const itemExists = wishlist.items.some(item => item.productId.toString() === productId);

            if (!itemExists) {
                wishlist.items.push({ productId });
            }
        }

        await wishlist.save();
        return res.status(200).json({ message: 'Product added to wishlist', wishlist });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Get user's wishlist
// Get user's wishlist and manually populate product details
router.get('/', async (req, res) => {
    const userId = req.user?.id;

    try {
        const wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist is empty' });
        }

        const productIds = wishlist.items.map(item => item.productId);

        const products = await Product.find({ _id: { $in: productIds } }).select('name price imageUrl');

        const populatedItems = wishlist.items.map(item => {
            const product = products.find(prod => prod._id.toString() === item.productId.toString());
            return {
                ...item,
                productId: product
            };
        });

        return res.status(200).json({ ...wishlist._doc, items: populatedItems });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Remove item from wishlist
// Remove item from wishlist
router.delete('/remove/:productId', async (req, res) => {
    const { productId } = req.params;
    const userId = req.user?.id;

    try {
        const wishlist = await Wishlist.findOne({ user: userId });
        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }

        const itemIndex = wishlist.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex > -1) {
            wishlist.items.splice(itemIndex, 1);
            await wishlist.save();
            return res.status(200).json({ message: 'Item removed from wishlist', wishlist });
        } else {
            return res.status(404).json({ message: 'Item not found in wishlist' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


export default router;
