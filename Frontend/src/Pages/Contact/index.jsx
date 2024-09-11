import "./contact.css";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

const Contact = () => {
    return (
       <div>
        <Navbar/>
        <div className="contact">
            <h1>Contact Us</h1>
            <section className="contact-details">
                <h2>Get in Touch</h2>
                <p>If you have any questions or need assistance, feel free to reach out to us using the information below:</p>
                <ul>
                    <li><strong>Address:</strong> 1234 Market Street, Suite 100, City, State, ZIP Code</li>
                    <li><strong>Phone:</strong> (123) 456-7890</li>
                    <li><strong>Email:</strong> <a href="mailto:support@example.com">support@example.com</a></li>
                </ul>
            </section>
            <section className="contact-form">
                <h2>Send Us a Message</h2>
                <form>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" required />

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />

                    <label htmlFor="message">Message:</label>
                    <textarea id="message" name="message" rows="4" required></textarea>

                    <button type="submit">Send Message</button>
                </form>
            </section>
        </div>
        <Footer/>
       </div>
    );
}

export default Contact;
