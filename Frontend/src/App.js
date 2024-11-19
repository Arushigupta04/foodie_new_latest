import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './components/Cart/CartContext';
import NavBar from "./components/NavBar/navbar.jsx";
import Home from "./components/Home/home";
import Footer from "./components/Footer/footer";
import MenuPage from "./components/Menu/menu";
import Login from './components/Login/login.jsx';
import SignUp from './components/SignUp/signup.jsx';
import UserProfile from "./components/Profile/user.jsx";
import AddItem from "./components/Items/Form.jsx";
import ShoppingCart from './components/Cart/ShoppingCart.jsx';
import ErrorPage from './components/Error/error'; 
import AdminDashboard from './components/Admin/AdminPage'; 
import AboutUs from "./components/About-Us/aboutpage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AllCategories from './components/Items/AllCategories.jsx';
import AllCategories1 from './components/Items/AllCategories1.jsx';
import { useCookies } from 'react-cookie';

function App() {
  const [cookies] = useCookies(['token']);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data
  const fetchUserData = async () => {
    const token = cookies.token;

    if (!token) {
      console.error('No token found');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/user", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // ProtectedRoute component
  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return <div>Loading...</div>;
    }

    if (!user) {
      return <Navigate to="/sign-in" replace />;
    }

    if (user.role !== 'Admin') {
      return <Navigate to="/" replace />;
    }

    return children;
  };

  return (
    <CartProvider>
      <Router>
        <div className="main-body">
          <NavBar />
          <Routes>
            <Route path="/" element={<><Home /><Footer /></>} />
            <Route path="/menu" element={<><MenuPage /><Footer /></>} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/admin/add-items" element={<><AddItem /><Footer /></>} />
            <Route path="/admin/categories" element={<><AllCategories /><Footer /></>} />
            <Route path="/admin/categories1" element={<><AllCategories1 /><Footer /></>} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <><AdminDashboard /><Footer /></>
                </ProtectedRoute>
              } 
            />
            {/* <Route path="/admin/add-items" element={<ProtectedRoute><><AddItem /><Footer /></></ProtectedRoute>} />
            <Route path="/admin/categories" element={<ProtectedRoute><><AllCategories /><Footer /></></ProtectedRoute>} />
            <Route path="/admin/categories1" element={<ProtectedRoute><><AllCategories1 /><Footer /></></ProtectedRoute>} /> */}
            <Route path="/about-us" element={<><AboutUs /><Footer /></>} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <ToastContainer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
