// src/components/TrackingPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Replace with your backend URL

const TrackingPage = () => {
    const { id } = useParams();
    const [tracking, setTracking] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState(null);

    const fetchTracking = async () => {
        try {
            const response = await axios.get(`${API_URL}/items/${id}/tracking`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            console.log(tracking)
            setTracking(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching tracking data:', error);
            setLoading(false);
        }
    };

    const fetchUserRole = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/user`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            console.log(response.data.role)
            setUserRole(response.data.role);
        } catch (error) {
            console.error('+Error fetching user role:', error);
        }
    };

    const handleLogAction = async (action) => {
        try {
            const response = await fetch(`http://localhost:5000/api/tracking/items/${id}/${action}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({}) // Empty object as body if required
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            // Re-fetch the tracking data
            fetchTracking();
        } catch (error) {
            console.error('Error logging action:', error);
        }
    };
    

    useEffect(() => {
        fetchTracking();
        fetchUserRole();
    }, [id]);

    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Tracking Information</h1>
            {userRole === 'Admin' && (
                <div className="mb-4">
                    <button
                        className="bg-red-500 text-black px-4 py-2 rounded mr-2"
                        onClick={() => handleLogAction('preparation')}
                    >
                        Log Preparation
                    </button>
                    <button
                        className="bg-red-500 text-black px-4 py-2 rounded mr-2"
                        onClick={() => handleLogAction('delivery')}
                    >
                        Log Delivery
                    </button>
                    <button
                        className="bg-red-500 text-black px-4 py-2 rounded mr-2"
                        onClick={() => handleLogAction('order')}
                    >
                        Log Order
                    </button>
                    <button
                        className="bg-red-500 text-black px-4 py-2 rounded mr-2"
                        onClick={() => handleLogAction('out-for-delivery')}
                    >
                        Log Out for Delivery
                    </button>
                    <button
                        className="bg-purple-500 text-black px-4 py-2 rounded"
                        onClick={() => handleLogAction('delivered')}
                    >
                        Log Delivered
                    </button>
                </div>
            )}
            <div className="bg-black shadow-md rounded p-4">
                <h2 className="text-xl font-semibold mb-2">Tracking History</h2>
                <ul>
                    {tracking.map((track) => (
                        <li key={track._id} className="mb-2">
                            <span className="font-bold">{track.action}</span> by {track.user} at{' '}
                            {new Date(track.timestamp).toLocaleString()}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TrackingPage;