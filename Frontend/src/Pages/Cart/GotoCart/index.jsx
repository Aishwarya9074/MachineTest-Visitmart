import { useState, useEffect } from 'react';
import axios from '../../../utils/axios';
import "./addcart.css";
import Navbar from '../../../Components/Navbar';
import Footer from '../../../Components/Footer';

const GotoCart = () => {
    const [cart, setCart] = useState(null);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get('/cart');
                setCart(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching cart:', error.response?.data || error.message);
            }
        };

        fetchCart();
    }, []);

    const removeFromCart = async (itemId) => {
        try {
            const response = await axios.delete(`/cart/remove/${itemId}`);
            setCart(response.data.cart);
        } catch (error) {
            console.error('Error removing item from cart:', error.response?.data || error.message);
        }
    };

    if (!cart) {
        return <p>Loading cart...</p>;
    }

    return (
        <div>
            <Navbar/>
            <div className="cart">
            {/* <h1>Cart</h1> */}
            {cart.items && cart.items.length > 0 ? (
                <ul>
                    {cart.items.map(item => (
                        <li key={item._id} className="cart-item">
                            <img 
                                src={item.productId?.imageUrl || "https://via.placeholder.com/150"} 
                                alt={item.productId?.name || "Product"} 
                                className="cart-item-image" 
                            />
                            <div className="cart-item-details">
                                <h2>{item.productId?.name || "No Name"}</h2>
                                <p>Price: ${item.productId?.price || "N/A"}</p>
                                <p>Quantity: {item.quantity}</p>
                                <button onClick={() => removeFromCart(item._id)}>Remove</button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Your cart is empty</p>
            )}
        </div>
        <Footer/>
    
        </div>
    )
};

export default GotoCart;
