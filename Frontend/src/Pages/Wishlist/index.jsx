import { useEffect, useState } from "react";
import "./wishlist.css";
import axios from "../../utils/axios";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

const WishList = () => {
    const [wishItems, setWishItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

    const getWishItems = async () => {
        try {
            const response = await axios.get('/wishlist');
            console.log(response.data);
            setWishItems(response.data.items); 
            setLoading(false); 
        } catch (err) {
            setError("Failed to fetch wishlist items. Please try again.");
            setLoading(false);
        }
    };

    const handleRemoveFromWishlist = async (productId) => {
        if (!productId) {
            console.error("Product ID is undefined");
            return;
        }

        try {
            await axios.delete(`/wishlist/remove/${productId}`);
            setWishItems(prevItems => prevItems.filter(item => item.productId?._id !== productId));
        } catch (err) {
            setError("Failed to remove item from wishlist. Please try again.");
        }
    };

    useEffect(() => {
        getWishItems();
    }, []); 
    if (loading) {
        return <div>Loading...</div>; 
    }

    if (error) {
        return <div>{error}</div>; 
    }

    return (
    <div>
        <Navbar/>
        <div className="wishlist">
            <h1>Wishlist</h1>
            <div className="wishlistcollection">
                {wishItems.length > 0 ? (
                    <ul>
                        {wishItems.map(item => (
                            <li key={item.productId?._id} className="wishlist-item">
                                <img
                                    src={item.productId?.images?.[0] || "https://via.placeholder.com/150"}
                                    alt={item.productId?.name || "Product Image"}
                                    className="wishlist-item-image"
                                />
                                <div className="wishlist-item-details">
                                    <h2>{item.productId?.name || "Product Name"}</h2>
                                    <p>Price: ${item.productId?.price || "N/A"}</p>
                                    <button onClick={() => handleRemoveFromWishlist(item.productId?._id)}>Remove</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Your wishlist is empty</p>
                )}
            </div>
            <Footer/>
        </div>
    </div>
    );
};

export default WishList;
