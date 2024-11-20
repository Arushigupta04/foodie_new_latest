import React, { useState, useEffect } from "react";
import "./UpdatePopup.css"; // Add your CSS styles for the popup

const UpdatePopup = ({ category, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    category_title: category.category_title,
    category_description: category.category_description,
    category_icon: category.category_icon,
  });

  useEffect(() => {
    // Initialize form data when category prop changes
    setFormData({
      category_title: category.category_title,
      category_description: category.category_description,
      category_icon: category.category_icon,
    });
  }, [category]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/add-new/categories/${category._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) throw new Error("Failed to update category.");
      const updatedCategory = await response.json();
      onUpdate(updatedCategory); // Pass updated category to parent
      onClose(); // Close the popup after update
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <h2>Update Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="category_title">Category Name</label>
            <input
              type="text"
              name="category_title"
              value={formData.category_title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category_description">Category Description</label>
            <textarea
              name="category_description"
              value={formData.category_description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category_icon">Category Image URL</label>
            <input
              type="text"
              name="category_icon"
              value={formData.category_icon}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="button update-button">
              Update
            </button>
            <button
              type="button"
              className="button cancel-button"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePopup;
