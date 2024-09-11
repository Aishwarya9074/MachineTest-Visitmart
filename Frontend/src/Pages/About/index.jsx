import "./about.css";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

const About = () => {
    return (
        <div>
            <Navbar/>
            <div className="about">
            <h1>About Us</h1>
            <section className="about-section">
                <h2>Our Story</h2>
                <p>
                    Welcome to VisitaMart! Founded in 2021, we embarked on a mission to
                    revolutionize the online shopping experience. Our team is dedicated to bringing you a curated
                    selection of high-quality products at competitive prices, with a focus on excellent customer service.
                </p>
            </section>
            <section className="about-section">
                <h2>What We Offer</h2>
                <ul>
                    <li><strong>Extensive Product Range:</strong> From the latest fashion trends to cutting-edge electronics, our diverse product selection caters to all your needs.</li>
                    <li><strong>Exceptional Quality:</strong> We collaborate with trusted brands and suppliers to ensure that every product meets our rigorous quality standards.</li>
                    <li><strong>User-Friendly Experience:</strong> Our website is designed for ease of use, featuring intuitive navigation, robust search functionality, and a secure checkout process.</li>
                </ul>
            </section>
            <section className="about-section">
                <h2>Our Commitment</h2>
                <p>
                    At VisitMart, we are committed to delivering a shopping experience that is as enjoyable and
                    hassle-free as possible. Our dedicated customer support team is here to assist you with any questions or concerns.
                </p>
            </section>
            <section className="about-section">
                <h2>Stay Connected</h2>
                <p>
                    Follow us on social media and subscribe to our newsletter to stay updated on the latest products, exclusive offers,
                    and exciting news. We love staying connected with our community and keeping you informed about what's new.
                </p>
            </section>
        </div>
        <Footer/>
        </div>
    );
}

export default About;
