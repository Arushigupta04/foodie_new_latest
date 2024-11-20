import React, { useState } from 'react';
import './footer.css';
import instagramIcon from '../../assets/instagram.svg';
import facebookIcon from '../../assets/facebook.svg';
import twitterIcon from '../../assets/twitter.svg';

function Footer() {
  const [email, setEmail] = useState('');
  const [reviewEmail, setReviewEmail] = useState(''); // State for email in review form
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [thankYouMessage, setThankYouMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Newsletter form submission
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage('Please enter a valid email address for the newsletter.');
      return;
    }

    console.log(`Newsletter subscription: ${email}`);
    setEmail('');
    setErrorMessage('');
    setThankYouMessage('Thanks for subscribing to our newsletter!');
    setTimeout(() => setThankYouMessage(''), 3000);
  };

  // Review form submission
  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!reviewEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reviewEmail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (rating === 0 || !review) {
      setErrorMessage('Rating and review are required.');
      return;
    }

    const reviewData = {
      email: reviewEmail,
      rating: rating,
      reviewText: review,
    };

    try {
      const response = await fetch('http://localhost:5000/api/review/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      const result = await response.json();

      if (response.ok) {
        setReviewEmail('');
        setReview('');
        setRating(0);
        setThankYouMessage('Thanks for your feedback!');
        setErrorMessage('');
        setTimeout(() => setThankYouMessage(''), 3000);
      } else {
        setErrorMessage(result.message || 'Failed to submit review. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setErrorMessage('There was an error submitting your review. Please try again.');
    }
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
            <h4>Product Review</h4>
            <form onSubmit={handleReviewSubmit} className="review-form">
              <input
                type="email"
                placeholder="Enter your email"
                value={reviewEmail}
                onChange={(e) => setReviewEmail(e.target.value)}
                required
              />
              <div className="rating">
                {[...Array(5)].map((_, index) => {
                  const ratingValue = index + 1;
                  return (
                    <span
                      key={ratingValue}
                      className={`star ${ratingValue <= (hover || rating) ? 'filled' : ''}`}
                      onClick={() => setRating(ratingValue)}
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(0)}
                    >
                      &#9733;
                    </span>
                  );
                })}
              </div>
              <textarea
                placeholder="Share your thoughts about our products"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
              />
              <button type="submit">Submit</button>
            </form>

            {thankYouMessage && <p className="thank-you-message">{thankYouMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
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
