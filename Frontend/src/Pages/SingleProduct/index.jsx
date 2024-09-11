import { useEffect, useState } from "react";
import "./singleproduct.css";
import axios from "../../utils/axios";
import { useNavigate, useParams } from "react-router-dom";

const Singleproduct = () => {
    const [details, setDetails] = useState(null);
    const [wishlistStatus, setWishlistStatus] = useState(false); // Track if the product is in the wishlist
    const { id } = useParams();
    const wishnavigate=useNavigate()

    const getSingleProduct = async () => {
        try {
            const response = await axios.get(`/product/${id}`);
            setDetails(response.data);
            checkWishlistStatus(response.data._id); // Check if the product is in the wishlist
        } catch (error) {
            console.error("Error fetching product:", error.response?.data || error.message);
        }
    };

    const checkWishlistStatus = async (productId) => {
        try {
            const response = await axios.get('/wishlist');
            const isInWishlist = response.data.items.some(item => item.productId._id === productId);
            setWishlistStatus(isInWishlist);
        } catch (error) {
            console.error("Error fetching wishlist:", error.response?.data || error.message);
        }
    };
    const wishClick=()=>{
        wishnavigate('/wishlist')
    }

    const handleAddToWishlist = async () => {
        try {
            await axios.post('/wishlist/add', { productId: id });
            setWishlistStatus(true); // Update wishlist status
        } catch (error) {
            console.error("Error adding to wishlist:", error.response?.data || error.message);
        }
    };

    const handleRemoveFromWishlist = async () => {
        try {
            await axios.delete(`/wishlist/remove/${id}`);
            setWishlistStatus(false); // Update wishlist status
        } catch (error) {
            console.error("Error removing from wishlist:", error.response?.data || error.message);
        }
    };

    useEffect(() => {
        getSingleProduct();
    }, [id]);

    if (!details) {
        return <div>Loading...</div>;
    }

    return (
        <div className="singleproduct">
            <h1>{details.name}</h1>
            <img
                src={details.images?.[0] || "https://via.placeholder.com/300"}
                alt={details.name}
                className="product-image"
            />
            <p>{details.description}</p>
            <p>Price: ${details.price}</p>
            <p>Stock: {details.stock}</p>
            {wishlistStatus ? (
                <button onClick={handleRemoveFromWishlist}>Remove from Wishlist</button>
            ) : (
                <button onClick={handleAddToWishlist}>Add to Wishlist</button>
            )}
            <button onClick={wishClick}>Collection</button>
        </div>
    );
};

export default Singleproduct;
