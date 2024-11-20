import React, { useState, useEffect } from "react";
import "./AllCategories.css"; // Import the custom CSS file
import UpdatePopup from "./UpdatePopup"; // Import the UpdatePopup component

const AllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/add-new/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const deleteCategory = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/add-new/categories/${id}`, {
        method: "DELETE",
      });
      setCategories(categories.filter((category) => category._id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const updateCategory = async (updatedCategory) => {
    try {
        console.log(updateCategory)
      // Make the PUT request to update the category
      const response = await fetch(
        `http://localhost:5000/api/add-new/categories/${updatedCategory._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: updatedCategory.category_title, // Assuming `category_title` is updated
          }),
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to update the category");
      }
  
      const updatedData = await response.json();
  
      // Update the categories state
      setCategories(
        categories.map((category) =>
          category._id === updatedData._id ? updatedData : category
        )
      );
  
      // Close the popup
      setSelectedCategory(null);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleUpdateClick = (category) => {
    setSelectedCategory(category); // Open the update popup with the selected category
  };

  if (isLoading) {
    return <div className="loading">Loading categories...</div>;
  }

  return (
    <div className="container">
      <h2 className="title">All Categories</h2>
      {categories.length === 0 ? (
        <p className="no-categories">No categories available.</p>
      ) : (
        <div className="grid">
          {categories.map((category) => (
            <div key={category._id} className="card">
              <img
                src={category.category_icon}
                alt={category.category_title}
                className="card-image"
              />
              <div className="card-content">
                <h3 className="card-title">{category.category_title}</h3>
                <p className="card-description">{category.category_description}</p>
                <div className="card-actions">
                  <button
                    onClick={() => handleUpdateClick(category)}
                    className="button update-button"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteCategory(category._id)}
                    className="button delete-button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Show UpdatePopup if a category is selected */}
      {selectedCategory && (
        <UpdatePopup
          category={selectedCategory}
          onClose={() => setSelectedCategory(null)} // Close the popup
          onUpdate={updateCategory} // Update the category in the list
        />
      )}
    </div>
  );
};

export default AllCategories;
