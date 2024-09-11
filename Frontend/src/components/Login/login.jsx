import React, { useState } from 'react';
import './login.css';
import SignInImage from "../../assets/log.jpg";
import { useCookies } from 'react-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// const serverURL = "http://192.168.54.63:5000"
const serverURL = "http://localhost:5000"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [cookies, setCookie] = useCookies(['token']);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${serverURL}/api/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setCookie('token', data.token, { path: '/' });
        toast.success('Login successful! Redirecting...');
        setTimeout(() => window.location.href = '/menu', 2000);
      } else {
        toast.error(data.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred, please try again later');
    }
  };

  return (
    <>
      <section className="sign-in">
        <div className="container">
          <div className="signin-content">
            <div className="signin-image">
              <figure><img src={SignInImage} alt="sign in" /></figure>
              <a href="/sign-up" className="signup-image-link">Create an account</a>
            </div>

            <div className="signin-form">
              <h2 className="form-title">Sign in</h2>
              <form onSubmit={handleSubmit} className="register-form" id="login-form">
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group form-button">
                  <input type="submit" name="signin" id="signin" className="form-submit" value="Log in" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default Login;
