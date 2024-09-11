import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./signup.css";
import SignUpImage from "../../assets/register.jpg";

const serverURL = "http://localhost:5000";

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [role, setRole] = useState('User');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !password || !repeatedPassword || !mobile) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password !== repeatedPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`${serverURL}/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, email, password, mobile, role }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Registration successful! Redirecting to sign-in...');
        setFullName('');
        setEmail('');
        setPassword('');
        setRepeatedPassword('');
        setMobile('');
        setRole('User');
        setTimeout(() => window.location.href = '/sign-in', 2000);
      } else {
        toast.error(data.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred, please try again later');
    }
  };

  const handleSignInClick = () => {
    window.location.href = '/sign-in';
  };

  return (
    <div className="signup-content">
      <div className="signup-form">
        <h2 className="form-title">Sign up</h2>
        <form onSubmit={handleSubmit} className="register-form" id="register-form">
          <div className="form-group">
            <input
              type="text"
              name="fullName"
              id="name"
              placeholder="Your Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="mobile"
              id="mobile"
              placeholder="Mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              id="pass"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="re_pass"
              id="re_pass"
              placeholder="Repeat your password"
              value={repeatedPassword}
              onChange={(e) => setRepeatedPassword(e.target.value)}
              required
              className="border p-2 rounded w-full"
            />
          </div>

          {/* Role Selection */}
          <div className="form-group checkbox-group">
  {/* <label> */}
    {/* <input
      type="checkbox"
      name="role"
      value="User"
      checked={role === 'User'}
      onChange={(e) => setRole(e.target.value)}
    />
    User
  </label> */}
  <label>
    <input
      type="checkbox"
      name="role"
      value="Admin"
      checked={role === 'Admin'}
      onChange={(e) => setRole(e.target.value)}
    />
    Admin
  </label>
</div>


          <div className="form-group form-button">
            <input type="submit" name="signup" id="signup" className="form-submit" value="Register" />
          </div>
        </form>
      </div>
      <div className="signup-image">
        <figure><img src={SignUpImage} alt="sign up" /></figure>
        <div className='already-signup'>
          <div>Already a Member?</div>
          <button onClick={handleSignInClick} className="signup-image-link">SignIn</button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;