import express from 'express';
import Product from '../../db/models/ProductSchema.js';
import upload from '../image.js'; // Adjust path as needed

const router = express.Router();

// Add product details
router.post('/', async (req, res) => {
    const { name, description, category, price, stock,images } = req.body;
    try {
        const newProduct = new Product({ name, description, price, category, stock,images });
        await newProduct.save();
        return res.status(201).json({ message: 'Product added', product: newProduct });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});

// Add product images (upload multiple images)
router.post('/image/:productId', upload.array('file', 5), async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId);
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const fileUrls = req.files.map(file => {
            return { productId, url: `http://localhost:4000/${file.filename}` };
        });

        // Add the image URLs to the product's image array (if using an array for multiple images)
        product.images = [...product.images, ...fileUrls.map(file => file.url)];
        await product.save();

        return res.status(200).json({ message: 'Images uploaded', fileUrls });
    } catch (error) {
        console.error('Error uploading images:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Get product information by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json(product);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json(products);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});

// Update product details
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    try {
        const product = await Product.findByIdAndUpdate(id, body, { new: true });
        return res.status(200).json({ message: 'Product updated', product });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});

// Delete product
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Product removed successfully' });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});

export default router;
