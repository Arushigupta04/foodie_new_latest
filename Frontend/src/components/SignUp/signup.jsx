// import React, { useState } from 'react';
// import "./signup.css";
// import SignUpImage from "../../assets/register.jpg";
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const serverURL = "http://localhost:5000";

// const SignUp = () => {
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [repeatedPassword, setRepeatedPassword] = useState('');
//   const [mobile, setMobile] = useState('');
//   const [role, setRole] = useState('User');
//   const [passwordStrength, setPasswordStrength] = useState('');
//   const [validationErrors, setValidationErrors] = useState({});

//   // Helper functions for validation
//   const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   const validateMobile = (mobile) => /^[0-9]{10}$/.test(mobile);
//   const validateName = (name) => name.length <= 30;

//   const assessPasswordStrength = (password) => {
//     if (password.length < 6) return "Weak";
//     if (/^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(password)) {
//       if (/^(?=.*[A-Za-z]{4,})(?=.*\d{2,}).{6,}$/.test(password)) {
//         if (/^(?=.*[A-Za-z]{4,})(?=.*\d{2,})(?=.*[!@#$%^&*]).{6,}$/.test(password)) {
//           return "Very Strong";
//         }
//         return "Strong";
//       }
//       return "Moderate";
//     }
//     return "Weak";
//   };

//   const handlePasswordChange = (e) => {
//     const newPassword = e.target.value;
//     setPassword(newPassword);
//     setPasswordStrength(assessPasswordStrength(newPassword));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const errors = {};
//     if (!validateName(fullName)) errors.fullName = 'Full name should not exceed 30 characters.';
//     if (!validateEmail(email)) errors.email = 'Invalid email format.';
//     if (!validateMobile(mobile)) errors.mobile = 'Mobile number must be exactly 10 digits.';
//     if (passwordStrength === "Weak") errors.password = 'Password is too weak.';
//     if (password !== repeatedPassword) errors.repeatedPassword = 'Passwords do not match.';

//     setValidationErrors(errors);

//     if (Object.keys(errors).length > 0) return;

//     try {
//       const response = await fetch(`${serverURL}/api/signup`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ fullName, email, password, mobile, role }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         toast.success('Registration successful! Redirecting to sign-in...');
//         setFullName('');
//         setEmail('');
//         setPassword('');
//         setRepeatedPassword('');
//         setMobile('');
//         setRole('User');
//         setPasswordStrength('');
//         setTimeout(() => window.location.href = '/sign-in', 2000);
//       } else {
//         toast.error(data.error || 'Something went wrong');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       toast.error('An error occurred, please try again later');
//     }
//   };

//   const handleSignInClick = () => {
//     window.location.href = '/sign-in';
//   };

//   return (
//     <div className="signup-content">
//       <div className="signup-form">
//         <h2 className="form-title">Sign up</h2>
//         <form onSubmit={handleSubmit} className="register-form" id="register-form">
//           <div className="form-group">
//             <input
//               type="text"
//               name="fullName"
//               id="name"
//               placeholder="Your Name"
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//               className="border p-2 rounded w-full"
//             />
//             {validationErrors.fullName && <p className="error-text">{validationErrors.fullName}</p>}
//           </div>
//           <div className="form-group">
//             <input
//               type="email"
//               name="email"
//               id="email"
//               placeholder="Your Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="border p-2 rounded w-full"
//             />
//             {validationErrors.email && <p className="error-text">{validationErrors.email}</p>}
//           </div>
//           <div className="form-group">
//             <input
//               type="text"
//               name="mobile"
//               id="mobile"
//               placeholder="Mobile"
//               value={mobile}
//               onChange={(e) => setMobile(e.target.value)}
//               className="border p-2 rounded w-full"
//             />
//             {validationErrors.mobile && <p className="error-text">{validationErrors.mobile}</p>}
//           </div>
//           <div className="form-group">
//             <input
//               type="password"
//               name="password"
//               id="pass"
//               placeholder="Password"
//               value={password}
//               onChange={handlePasswordChange}
//               className="border p-2 rounded w-full"
//             />
//             <p className={`password-strength ${passwordStrength.toLowerCase()}`}>
//               {passwordStrength && `Password Strength: ${passwordStrength}`}
//             </p>
//             {validationErrors.password && <p className="error-text">{validationErrors.password}</p>}
//           </div>
//           <div className="form-group">
//             <input
//               type="password"
//               name="re_pass"
//               id="re_pass"
//               placeholder="Repeat your password"
//               value={repeatedPassword}
//               onChange={(e) => setRepeatedPassword(e.target.value)}
//               className="border p-2 rounded w-full"
//             />
//             {validationErrors.repeatedPassword && <p className="error-text">{validationErrors.repeatedPassword}</p>}
//           </div>
//           <div className="form-group checkbox-group">
//             <label>
//               <input
//                 type="checkbox"
//                 name="role"
//                 value="Admin"
//                 checked={role === 'Admin'}
//                 onChange={(e) => setRole(e.target.checked ? 'Admin' : 'User')}
//               />
//               Admin
//             </label>
//           </div>
//           <div className="form-group form-button">
//             <input type="submit" name="signup" id="signup" className="form-submit" value="Register" />
//           </div>
//         </form>
//       </div>
//       <div className="signup-image">
//         <figure><img src={SignUpImage} alt="sign up" /></figure>
//         <div className='already-signup'>
//           <div>Already a Member?</div>
//           <button onClick={handleSignInClick} className="signup-image-link">SignIn</button>
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default SignUp;
import React, { useState } from 'react';
import "./signup.css";
import SignUpImage from "../../assets/register.jpg";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const serverURL = "http://localhost:5000";

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [role, setRole] = useState('User');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateMobile = (mobile) => /^[0-9]{10}$/.test(mobile);
  const validateName = (name) => name.length <= 30;

  const assessPasswordStrength = (password) => {
    if (password.length < 6) return "Weak";
    if (/^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(password)) {
      if (/^(?=.*[A-Za-z]{4,})(?=.*\d{2,}).{6,}$/.test(password)) {
        if (/^(?=.*[A-Za-z]{4,})(?=.*\d{2,})(?=.*[!@#$%^&*]).{6,}$/.test(password)) {
          return "Very Strong";
        }
        return "Strong";
      }
      return "Moderate";
    }
    return "Weak";
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(assessPasswordStrength(newPassword));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!validateName(fullName)) errors.fullName = 'Full name should not exceed 30 characters.';
    if (!validateEmail(email)) errors.email = 'Invalid email format.';
    if (!validateMobile(mobile)) errors.mobile = 'Mobile number must be exactly 10 digits.';
    if (passwordStrength === "Weak") errors.password = 'Password is too weak.';
    if (password !== repeatedPassword) errors.repeatedPassword = 'Passwords do not match.';

    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) return;

    try {
      const response = await fetch(`${serverURL}/api/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
        setPasswordStrength('');
        setTimeout(() => window.location.href = '/sign-in', 2000);
      } else {
        setValidationErrors((prev) => ({
          ...prev,
          email: data.error || 'Something went wrong.',
        }));
      }
    } catch (error) {
      console.error('Error:', error);
      setValidationErrors((prev) => ({
        ...prev,
        email: 'An error occurred, please try again later.',
      }));
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
              className="border p-2 rounded w-full"
            />
            {validationErrors.fullName && <p className="error-text">{validationErrors.fullName}</p>}
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded w-full"
            />
            {validationErrors.email && <p className="error-text">{validationErrors.email}</p>}
          </div>
          <div className="form-group">
            <input
              type="text"
              name="mobile"
              id="mobile"
              placeholder="Mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="border p-2 rounded w-full"
            />
            {validationErrors.mobile && <p className="error-text">{validationErrors.mobile}</p>}
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              id="pass"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              className="border p-2 rounded w-full"
            />
            <p className={`password-strength ${passwordStrength.toLowerCase()}`}>
              {passwordStrength && `Password Strength: ${passwordStrength}`}
            </p>
            {validationErrors.password && <p className="error-text">{validationErrors.password}</p>}
          </div>
          <div className="form-group">
            <input
              type="password"
              name="re_pass"
              id="re_pass"
              placeholder="Repeat your password"
              value={repeatedPassword}
              onChange={(e) => setRepeatedPassword(e.target.value)}
              className="border p-2 rounded w-full"
            />
            {validationErrors.repeatedPassword && <p className="error-text">{validationErrors.repeatedPassword}</p>}
          </div>
          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="role"
                value="Admin"
                checked={role === 'Admin'}
                onChange={(e) => setRole(e.target.checked ? 'Admin' : 'User')}
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
