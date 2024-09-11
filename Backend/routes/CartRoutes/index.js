import express from 'express';
import Product from '../../db/models/ProductSchema.js';
import Cart from '../../db/models/CartSchema.js';
import checkToken from "../../middleware/checkToken.js";

const router = express.Router();

// Add product to cart
router.post('/add',  async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user?.id;

    try {
        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Find or create the user's cart
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({
                user: userId,
                items: [{ productId, quantity: quantity || 1 }]
            });
        } else {
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity || 1;
            } else {
                cart.items.push({ productId, quantity: quantity || 1 });
            }
        }

        await cart.save();
        return res.status(200).json({ message: 'Product added to cart', cart });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Get user's cart with populated product details
router.get('/', async (req, res) => {
    const userId = req.user?.id;

    try {
        const cart = await Cart.findOne({ user: userId })
            .populate({
                path: 'items.productId', // Populate the `productId` field inside `items`
                select: 'name price imageUrl' // Specify which fields you want to return from the Product model
            });

        if (!cart) {
            return res.status(404).json({ message: 'Cart is empty' });
        }

        return res.status(200).json(cart);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});



// Remove item from cart
router.delete('/remove/:itemId',  async (req, res) => {
    const { itemId } = req.params;
    const userId = req.user?.id;

    try {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId);
        if (itemIndex > -1) {
            cart.items.splice(itemIndex, 1);
            await cart.save();
            return res.status(200).json({ message: 'Item removed from cart', cart });
        } else {
            return res.status(404).json({ message: 'Item not found in cart' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default router;
