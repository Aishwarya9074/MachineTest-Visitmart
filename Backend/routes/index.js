import express from 'express';
import UserRoutes from "./UserRoutes/index.js"
import ProductRoutes from "./ProductRoutes/index.js"
import CartRoutes from "./CartRoutes/index.js"
import WishlistRoutes from "./WishlistRoutes/index.js"

const router=express.Router()
router.use('/user',UserRoutes)
router.use('/product',ProductRoutes)
router.use('/cart',CartRoutes)
router.use('/wishlist',WishlistRoutes)


export default router;