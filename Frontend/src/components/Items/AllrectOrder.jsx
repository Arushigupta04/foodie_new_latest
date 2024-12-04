import React, { useEffect, useState } from "react";
import axios from "axios";

const AllrectOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/orders");
        const allOrders = response.data;

        // Filter orders for the past 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const recentOrders = allOrders.filter((order) => {
          const orderDate = new Date(order.createdAt);
          return orderDate >= sevenDaysAgo;
        });

        // Sort the orders in descending order based on the createdAt field
        recentOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setOrders(recentOrders);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-xl">Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-xl">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Orders from the Past 7 Days</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {orders.length === 0 ? (
          <p className="text-center text-gray-500">No orders in the last 7 days.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2">{order.name}</h2>
              <p className="text-gray-700">Order ID: {order._id}</p>
              <p className="text-gray-700">Total: {order.price}Rs</p>
              <p className="text-gray-700">Quantity: {order.quantity}</p>
              <p className="text-gray-700">Payment Method: {order.payment_method}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllrectOrder;
