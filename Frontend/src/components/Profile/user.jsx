import React, { useState, useEffect, useContext } from 'react';
import './style.css';
import { useCookies } from 'react-cookie';
import { CartContext } from '../Cart/CartContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const serverURL = "http://localhost:5000";

function UserProfile() {
  const [user, setUser] = useState({
    fullName: '',
    email: '',
    mobile: '',
    role: '',
    RecentOrders: [],
  });

  const [editMode, setEditMode] = useState(false);
  const [updatedUserInfo, setUpdatedUserInfo] = useState({
    _id: '',
    fullName: '',
    email: '',
    mobile: '',
  });

  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const { clearCart } = useContext(CartContext);

  const fetchUserData = async () => {
    try {
      const token = cookies.token;
      if (!token) {
        console.error('Token not found in cookies');
        return;
      }

      const response = await fetch(`${serverURL}/api/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        const sortedOrders = userData.RecentOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setUser({ ...userData, RecentOrders: sortedOrders });
        setUpdatedUserInfo({
          _id: userData._id,
          fullName: userData.fullName,
          email: userData.email,
          mobile: userData.mobile,
        });
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

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      const token = cookies.token;
      if (!token) {
        console.error('Token not found in cookies');
        return;
      }
  
      const response = await fetch(`${serverURL}/api/user/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUserInfo),
      });
  
      if (response.ok) {
        const updatedUserData = await response.json();
        if (updatedUserData && updatedUserData.user) {
          toast.success('User information updated successfully', { toastId: 'update-success' });
          setEditMode(false);
          setUser(updatedUserData.user);
          fetchUserData();
          // Preserve the RecentOrders in the updated user data
        
        } else {
          console.error('Failed to get updated user data');
        }
      } else {
        console.error('Failed to update user information');
      }
    } catch (error) {
      console.error('Error updating user information:', error);
    }
  };
  

  const handleDeleteAccount = () => {
    toast.info('Are you sure you want to delete your account? This action cannot be undone.', {
      autoClose: false,
      closeButton: true,
      onClose: async () => {
        try {
          const token = cookies.token;
          if (!token) {
            console.error('Token not found in cookies');
            return;
          }

          const response = await fetch(`${serverURL}/api/user/delete`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            removeCookie('token');
            removeCookie('cartItems', { path: '/' });
            clearCart();
            window.location.href = '/sign-up';
          } else {
            console.error('Failed to delete user account');
          }
        } catch (error) {
          console.error('Error deleting user account:', error);
        }
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserInfo({
      ...updatedUserInfo,
      [name]: value,
    });
  };

  if (!cookies.token) {
    return (
      <div className="access-forbidden">
        <h3>Access Forbidden</h3>
        <p>Please log in to access this page.</p>
      </div>
    );
  }

  return (
    <div className="card user-card-full col-xl-8" style={{ margin: '40px auto' }}>

      <div className="row m-l-0 m-r-0">
        <div className="col-sm-4 bg-c-lite-green user-profile">
          <div className="card-block text-center text-white">
            <div className="m-b-25">
              <img
                src="https://img.icons8.com/bubbles/100/000000/user.png"
                className="img-radius"
                alt="User Profile"
              />
            </div>
            <h6 className="f-w-600">{user.role}</h6>
            {editMode ? (
              <div>
                <input
                  type="text"
                  className="form-control"
                  name="fullName"
                  placeholder="Full Name"
                  value={updatedUserInfo.fullName}
                  onChange={handleInputChange}
                />
                <input
                  type="email"
                  className="form-control mt-3"
                  name="email"
                  placeholder="Email"
                  value={updatedUserInfo.email}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className="form-control mt-3"
                  name="mobile"
                  placeholder="Mobile"
                  value={updatedUserInfo.mobile}
                  onChange={handleInputChange}
                />
              </div>
            ) : (
              <div>
                <p>{user.fullName}</p>
                <p>{user.email}</p>
                <p>{user.mobile}</p>
              </div>
            )}
            <button className="btn btn-light mt-3" onClick={editMode ? handleSave : handleEdit}>
              {editMode ? 'Save' : 'Edit'}
            </button>
          </div>
        </div>
        <div className="col-sm-8">
          <div className="card-block">
            <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
            <div className="row">
              <div className="col-sm-6">
                <p className="m-b-10 f-w-600">Email</p>
                <h6 className="text-muted f-w-400">{user.email}</h6>
              </div>
              <div className="col-sm-6">
                <p className="m-b-10 f-w-600">Mobile</p>
                <h6 className="text-muted f-w-400">{user.mobile}</h6>
              </div>
            </div>
            <button type="button" className="btn btn-danger mt-5" onClick={handleDeleteAccount}>
              Delete Account
            </button>
            <h6 className="text-muted mt-5">Recent Orders</h6>
            {user.RecentOrders.length === 0 ? (
              <p>No Recent Orders</p>
            ) : (
              user.RecentOrders.map((order, index) => (
                <div className="card mb-3" key={index}>
                  <div className="row no-gutters">
                    <div className="col-md-4" style={{ alignSelf: "center" }}>
                      {order.image ? (
                        <img src={order.image} className="card-img" alt="Product" />
                      ) : (
                        <p>No Imge Available</p>
                      )}
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{order.name}</h5>
                        <div className="text-container">
                          <h6>Price:</h6>
                          <p>&nbsp;&nbsp;₹{order.price}</p>
                        </div>
                        <div className="text-container">
                          <h6>Address:</h6>
                          <p>&nbsp;&nbsp;{order.address}</p>
                        </div>
                        <div className="text-container">
                          <h6>Ordered At:</h6>
                          <p>&nbsp;&nbsp;{order.createdAt}</p>
                        </div>
                        <div className="text-container">
                          <h6>Status:</h6>
                          <p>&nbsp;&nbsp;{order.status}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
