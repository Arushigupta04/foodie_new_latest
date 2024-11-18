
import React, { useState } from 'react';
import './footer.css';
import { Link } from 'react-router-dom'; // Import Link from React Router
import instagramIcon from '../../assets/instagram.svg';
import facebookIcon from '../../assets/facebook.svg';
import twitterIcon from '../../assets/twitter.svg'; // Add Twitter icon import

function Footer() {
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setEmail(''); // Reset email field after submission
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    setFeedback(''); // Reset feedback field after submission
  };

  return (
    <div className="footer">
      <div className="footer1">
        <div className="footer1-grid">
          <div className="footer-list">
            <h4>Quick Links</h4>
            <p><a href="http://localhost:3000">Home</a></p>
            <p><a href="http://localhost:3000/about-us">About Us</a></p>
            <p><a href="http://localhost:3000/menu">Deals</a></p>
          </div>

          
          <div className="footer-list">
            <h4>User Account</h4>
            <p><a href="http://localhost:3000/sign-up">Sign Up</a></p>
            <p><a href="http://localhost:3000/sign-in">Login</a></p>
            <p><a href="http://localhost:3000/cart">Cart</a></p>
          </div>

          <div className="footer-list follow-box">
            <h4>Follow Us</h4>
            <div className="social-media">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <img className="icon-img" src={instagramIcon} alt="Instagram" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <img className="icon-img" src={facebookIcon} alt="Facebook" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <img className="icon-img" src={twitterIcon} alt="Twitter" />
              </a>
            </div>
          </div>

          <div className="footer-list">
            <h4>Contact Us</h4>
            <p>Email: <a href="mailto:info@foodie.com">info@foodie.com</a></p>
            <p>Phone: <a href="tel:+1234567890">+1 234 567 890</a></p>
            <p>Address: 123 Foodie Lane, Foodtown, Chandigarh</p>
          </div>

          <div className="footer-list">
            <h4>Subscribe to our Newsletter</h4>
            <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>

          <div className="footer-list">
            <h4>Feedback</h4>
            <form onSubmit={handleFeedbackSubmit} className="feedback-form">
              <textarea
                placeholder="Your feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>

      <div className="footer2">
        <p id="copyright-txt">All Rights Reserved &copy;2024 Foodie</p>
      </div>
    </div>
  );
}

export default Footer;
