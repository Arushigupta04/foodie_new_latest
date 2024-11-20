import React, { useState, useEffect, useRef } from "react";
import "./EditPopup.css"; // CSS for the popup

function EditPopup({ item, onCancel, onSave }) {
  const [formData, setFormData] = useState({ ...item });
  const [errors, setErrors] = useState({}); // To store validation errors

  // Ref for the popup container
  const popupRef = useRef(null);

  // Handle form input changes with validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update formData
    setFormData({ ...formData, [name]: value });

    // Validate specific fields
    if (name === "item_price") {
      if (!/^\d*\.?\d*$/.test(value)) {
        setErrors({ ...errors, item_price: "Price must be a valid number." });
      } else {
        const updatedErrors = { ...errors };
        delete updatedErrors.item_price;
        setErrors(updatedErrors);
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for validation errors before submission
    if (Object.keys(errors).length > 0) {
      alert("Please fix the validation errors before submitting.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/add-new/items/${item._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) throw new Error("Failed to update item.");
      const updatedItem = await response.json();
      onSave(updatedItem.item); // Pass updated item back to the parent
    } catch (err) {
      alert(err.message);
    }
  };

  // Close the popup if clicked outside
  const handleOutsideClick = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      onCancel(); // Close the popup
    }
  };

  // Add event listener when the component is mounted
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="popup-overlay">
      <div ref={popupRef} className="popup-container">
        <h2 className="popup-title">Edit Item</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="item_title"
            value={formData.item_title}
            onChange={handleInputChange}
            placeholder="Item Title"
          />
          <input
            type="text"
            name="item_type"
            value={formData.item_type}
            onChange={handleInputChange}
            placeholder="Item Type"
          />
          <input
            type="text"
            name="item_price"
            value={formData.item_price}
            onChange={handleInputChange}
            placeholder="Item Price"
          />
          {errors.item_price && (
            <p className="error-message">{errors.item_price}</p>
          )}
          <input
            type="text"
            name="item_offer"
            value={formData.item_offer}
            onChange={handleInputChange}
            placeholder="Item Offer"
          />
          <input
            type="text"
            name="item_src"
            value={formData.item_src}
            onChange={handleInputChange}
            placeholder="Item Image URL"
          />
          <div className="popup-buttons">
            <button
              type="submit"
              className="popup-save-button"
              disabled={Object.keys(errors).length > 0}
            >
              Save
            </button>
            <button
              type="button"
              className="popup-cancel-button"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPopup;
