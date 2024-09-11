// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { CartProvider } from './components/Cart/CartContext';
// import NavBar from "./components/NavBar/navbar.jsx";
// import Home from "./components/Home/home";
// import Footer from "./components/Footer/footer";
// import MenuPage from "./components/Menu/menu";
// import Login from './components/Login/login.jsx';
// import SignUp from './components/SignUp/signup.jsx';
// import UserProfile from "./components/Profile/user.jsx";
// import AddItem from "./components/Items/Form.jsx"
// import ShoppingCart from './components/Cart/ShoppingCart.jsx';
// import ErrorPage from './components/Error/error'; 
// import AdminDashboard from './components/Admin/AdminPage'; 
// import AboutUs from "./components/About-Us/aboutpage"


// function App() {
  
//   return (
//     <CartProvider>
//       <Router>
//         <div className="main-body">
//           <NavBar />
//           <Routes>
//             <Route exact path="/" element={<><Home /><Footer /></>} />
//             <Route exact path="/menu" element={<><MenuPage /><Footer /></>} />
//             <Route path="/sign-in" element={<Login />} />
//             <Route path="/sign-up" element={<SignUp />} />
//             <Route path="/profile" element={<UserProfile />} />
//             <Route path="/cart" element={<ShoppingCart />} />


//             <Route path="/admin/" element={<><AdminDashboard /><Footer /></>} />
//             <Route path="/admin/add-items" element={<><AddItem /><Footer /></>} />
//             <Route path="/about-us" element={<><AboutUs /><Footer /></>} />
            
//             <Route path="*" element={<ErrorPage />} />
//           </Routes>
//         </div>

//       </Router>
//     </CartProvider>
    
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import Toast styles

function App() {
  
  return (
    <CartProvider>
      <Router>
        <div className="main-body">
          <NavBar />
          <Routes>
            <Route exact path="/" element={<><Home /><Footer /></>} />
            <Route exact path="/menu" element={<><MenuPage /><Footer /></>} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/admin" element={<><AdminDashboard /><Footer /></>} />
            <Route path="/admin/add-items" element={<><AddItem /><Footer /></>} />
            <Route path="/about-us" element={<><AboutUs /><Footer /></>} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <ToastContainer /> {/* Add ToastContainer here */}
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
