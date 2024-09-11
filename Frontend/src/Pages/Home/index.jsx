import React from "react";
import "./home.css";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

const Home = () => {
    return (
        <div>
            <Navbar />
            <div className="page-container">
                <div id="home" className="home">
                    <div className="home-content">
                        <h1>Welcome to Our Store</h1>
                        <p>Discover the best products at unbeatable prices.</p>
                        <button className="shop-now-btn">Shop Now</button>
                    </div>
                    {/* <div className="home-banner">
                        <img src="/path/to/your/banner-image.jpg" alt="Banner" />
                    </div> */}
                </div>

                <div id="products" className="section">
                    <h2>Our Products</h2>
                    <p>Explore our latest collection of products.</p>
                    <div className="product-gallery">
                        <img src="/src/assets/images/pro1.jpg" alt="Product 1" />
                        <img src="/src/assets/images/pro2.webp" alt="Product 2" />
                        <img src="/src/assets/images/pro3.jpg" alt="Product 3" />
                    </div>
                </div>

                <div id="about" className="section">
                    <h2>About Us</h2>
                    <p>Learn more about our mission and values.</p>
                    <div className="about-image">
                        <img src="/src/assets/images/pro4.webp" alt="About Us" />
                    </div>
                </div>

                <div id="contact" className="section">
                    <h2>Contact Us</h2>
                    <p>We'd love to hear from you.</p>
                    <div className="contact-image">
                        <img src="/src/assets/images/cont.jpg" alt="Contact Us" />
                    </div>
                </div>

                
            </div>
            <Footer/>
        </div>
    );
};

export default Home;
