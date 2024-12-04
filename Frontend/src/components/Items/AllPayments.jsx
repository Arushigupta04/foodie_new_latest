import React, { useEffect, useState } from "react";
import axios from "axios";

const AllPayments = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/pay/getAllUserPayments");
        const allPayments = response.data.userPayments || [];

        // Calculate the date 7 days ago
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        // Filter payments from the last 7 days
        const recentPayments = allPayments.filter((payment) => {
          const paymentDate = new Date(payment.date);
          return paymentDate >= sevenDaysAgo;
        });

        // Sort payments by date in descending order (most recent first)
        recentPayments.sort((a, b) => new Date(b.date) - new Date(a.date));

        setOrders(recentPayments);
        setLoading(false);
      } catch (err) {
        console.error("Error Fetching Payments:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-xl">Loading payments...</p>
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
      <h1 className="text-3xl font-bold mb-6 text-center">Payments from Last 7 Days</h1>
      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No payments found for the last 7 days.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              {/* Divide amount by 100 if it's in cents */}
              <h2 className="text-xl font-semibold mb-2">
                Amount: {order.amount ?order.amount : "N/A"}
              </h2>
              <h2 className="text-xl font-semibold mb-2">Date: {new Date(order.date).toLocaleDateString()}</h2>
              <p className="text-gray-700">User ID: {order.user?._id || "Not Available"}</p>
              <p className="text-gray-700">Email: {order.user?.email || "Not Available"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPayments;
