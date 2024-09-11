import React, { useState } from 'react';
import './footer.css';
import instagramIcon from '../../assets/instagram.svg';
import twitterIcon from '../../assets/twitter.svg';
import facebookIcon from '../../assets/facebook.svg';

function Footer() {
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // You can add any further logic here if needed
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    // You can add any further logic here if needed
    setFeedback(''); // Reset feedback field after submission
  };

  return (
    <div className="footer">
      <div className="footer1">
        <div className="footer1-grid">
          <div className="footer-list">
            <h4>Quick Links</h4>
            <p><a href="#">Home</a></p>
            <p><a href="#">Services</a></p>
            <p><a href="#">Products</a></p>
            <p><a href="#">Blog</a></p>
          </div>
          <div className="footer-list">
            <h4>Company</h4>
            <p><a href="#">About Us</a></p>
            <p><a href="#">Careers</a></p>
            <p><a href="#">Press</a></p>
          </div>
          <div className="footer-list follow-box">
            <h4>Follow Us</h4>
            <div className="social-media">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <img className="icon-img" src={instagramIcon} alt="Instagram" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <img className="icon-img" src={twitterIcon} alt="Twitter" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <img className="icon-img" src={facebookIcon} alt="Facebook" />
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
