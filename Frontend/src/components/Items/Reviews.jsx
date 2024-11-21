import React, { useState, useEffect } from "react";
import axios from "axios";
const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/review");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log(response)
        const data = await response.json();
        console.log(data)
        setReviews(data);
      } catch (err) {
        setError("Failed to fetch reviews. Please check the API endpoint.");
        console.error(err);
      }
    };

    fetchReviews();
  }, []);


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Reviews List
      </h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-4">
        {reviews.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {reviews.map((review) => (
              <li
                key={review.email}
                className="py-4 flex flex-col md:flex-row justify-between"
              >
                <div>
                  <p className="text-lg font-semibold">{review.email}</p>
                  <p className="text-lg font-semibold">{review.title}</p>
                  <p className="text-gray-600">{review.reviewText}</p>
                  <p className="text-gray-600">{review.rating}</p>
                </div>
                {/* <span className="text-sm text-gray-500 mt-2 md:mt-0">
                  {new Date(review.date).toLocaleDateString()}
                </span> */}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No reviews available.</p>
        )}
      </div>
    </div>
  );
}

export default Reviews