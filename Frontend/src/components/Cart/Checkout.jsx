
import React, { useState,useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useCookies } from 'react-cookie';
const Checkout = ({ totalAmount, handlePayment }) => {
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState(''); // New state for email
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [loading, setLoading] = useState(false);
  const [id,setid]=useState(0);
  const [message, setMessage] = useState(''); // State for messages

  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };
  //const handleEmailChange = (e) => setEmail(e.target.value);

  const fetchUserData = async () => {
    try {
      const token = cookies.token;
      if (!token) {
        console.error('Token not found in cookies');
        return;
      }

      const response = await fetch(`http://localhost:5000/api/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setid(userData._id)
        
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  

  useEffect(() => {
    fetchUserData();
  }, []);
  console.log("sdddd"+id)
    

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };
  const isValidEmail = (email) => {
    // Regex for validating email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
    const handleCheckout = async () => {
    setMessage(''); // Clear previous 
  
    if (address.trim() === '' || email.trim() === '') {
      setMessage('Please enter your delivery address and email.');

      return;
    }
    if (!isValidEmail(email)) {
      setMessage('Please enter a valid email address.');
      return;
    }
    if (paymentMethod === 'COD') {
      setMessage('Order placed successfully with Cash on Delivery!');
      handlePayment({ address, paymentMethod, email });
      return;
    }

    
    const amount = totalAmount * 100; // Convert amount to paise
    try {
      const response = await fetch('http://localhost:5000/api/v1/pay/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, currency: 'INR' }),
      });
      const data = await response.json();
      const { order } = data;


        console.log("insdie try2")
        // Initialize Razorpay payment
        const options = {
            key: 'rzp_test_XaigqT7nptLPme', // Replace with your Razorpay API key
            amount: order.amount, // Amount in paise
            currency: order.currency,
            name: 'Foodie', // Your company or website name
            description: 'Invoice Payment', // A brief description
            order_id: order.id, // The Razorpay order ID created on the server
            handler: async function (response) {
              console.log("inside the handler function")
                console.log("sdcvfewsxdcv dswdcfv"+response)
                // Log the response to ensure you're getting the correct data
                console.log("start")
                console.log("Razorpay Response: ", response);

                const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

                if (razorpay_payment_id && razorpay_order_id && razorpay_signature) {
                  setMessage('Payment successful!');

                    // Send payment details to your server for verification using fetch
                    try {
                        console.log("dcswdxcdxccfvdwecf")
                        const verificationResponse = await fetch(
                            'http://localhost:5000/api/v1/pay/paymentverification',
                            {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    razorpay_order_id, // Razorpay field names must match
                                    razorpay_payment_id,
                                    razorpay_signature,
                                    amount,
                                    id
                                }),
                            }
                        );

                        const verificationData = await verificationResponse.json();
                                      if (verificationData.success) {
                                        handlePayment({ address, paymentMethod, email });
                                      } else {
                                        setMessage('Payment verification failed!');
                                      }
                                    } catch (error) {
                                      setMessage('Error during payment verification.');
                                    }
                                  } else {
                                    setMessage('Payment failed or incomplete response.');
                                  }
                                },
                              };
                        
                              const razorpay = new window.Razorpay(options);
                              razorpay.open();
                            } catch (error) {
                              setMessage('Payment failed. Please try again.');
                            }
                          };
                        
                        

                           return (
                                <div className="card">
                                  <div className="card-header">
                                    <h5 className="mb-0">Checkout</h5>
                                  </div>
                                  <div className="card-body">
                                    {message && <div className="alert alert-info">{message}</div>} {/* Message display */}
                                    <form>
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
              <option value="Pay On Delivery">Pay Online</option>
</select>
           </div>
         <p><strong>Total Amount: ₹{totalAmount}</strong></p>
        <button
type="button"
className="btn btn-primary"
disabled={loading}
onClick={handleCheckout}
      >
{loading ? 'Processing...' : 'Place Order'}
           </button>
       </form>
     </div>    </div>
  );
 };

 export default Checkout; 