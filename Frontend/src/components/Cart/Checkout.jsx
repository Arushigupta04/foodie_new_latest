import React, { useState } from 'react';

const Checkout = ({ totalAmount, handlePayment }) => {
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState(''); // New state for email
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [loading, setLoading] = useState(false);

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (address.trim() === '' || email.trim() === '') {
      alert('Please enter your delivery address and email.');
      return;
    }

    setLoading(true);

    try {
      await handlePayment({ address, paymentMethod, email }); // Pass email to handlePayment
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Failed to process payment. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">Checkout</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Delivery Address</label>
            <textarea
              className="form-control"
              id="address"
              rows="3"
              value={address}
              onChange={handleAddressChange}
              placeholder="Enter your delivery address..."
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email..."
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="paymentMethod" className="form-label">Payment Method</label>
            <select
              className="form-select"
              id="paymentMethod"
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
            >
              <option value="COD">Cash on Delivery</option>
              <option value="Pay On Delivery">Pay on Delivery</option>
            </select>
          </div>
          <p><strong>Total Amount: ₹{totalAmount}</strong></p>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Place Order'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
