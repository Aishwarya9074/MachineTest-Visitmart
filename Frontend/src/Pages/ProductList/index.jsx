import { useState, useEffect } from "react";
import "./productlist.css";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer";
import Navbar from "../../Components/Navbar";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const productnavigate = useNavigate();

  // Fetch product list
  const getProductList = async () => {
    try {
      const response = await axios.get("/product");
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch products. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductList();
  }, []);

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.category === selectedCategory);

  // Add product to cart
  const addToCart = async (productId, quantity = 1) => {
    try {
      const response = await axios.post('/cart/add', { productId, quantity });
      alert(response.data.message);
    } catch (err) {
      console.error('Error adding product to cart:', err.response?.data || err.message);
      alert('Failed to add product to cart. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
   <div>
    <Navbar/>
    <div className="product-list">
      {/* <h1>Product List</h1> */}
      <label>
        Filter by category:
        <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
          <option value="All">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothes">Clothes</option>
          <option value="Home Items">Home Items</option>
        </select>
      </label>
      <div className="product-container">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="product-card" onClick={() => productnavigate(`/product/${product._id}`)} key={product._id}>
              <img
                src={product.images?.[0] || "https://via.placeholder.com/150"}
                alt={product.name}
                className="product-image"
              />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Stock: {product.stock}</p>
              <button onClick={(e) => { e.stopPropagation(); addToCart(product._id); }}>Add to Cart</button>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
      <Footer/>
    
    </div>
   </div>
  );
};

export default ProductList;
