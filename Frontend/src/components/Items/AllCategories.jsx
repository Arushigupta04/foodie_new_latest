import React, { useState, useEffect } from 'react';

const AllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/add-new/categories'); // Adjust the API URL accordingly
        const data = await response.json();
        console.log(data)
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCategories();
  }, []);

  // Delete a category by ID
  const deleteCategory = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/add-new/categories/${id}`, {
        method: 'DELETE'
      });
      setCategories(categories.filter(category => category._id !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  // Update a category (for simplicity, we'll prompt for the new name)
  const updateCategory = async (id) => {
    const newName = prompt('Enter the new category name:');
    if (!newName) return; // If no name is entered, cancel the update

    try {
      const response = await fetch(`http://localhost:5000/api/add-new/categories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: newName })
      });
      const updatedCategory = await response.json();
      
      // Update the categories list with the modified category
      setCategories(categories.map(category => 
        category._id === id ? updatedCategory : category
      ));
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  if (isLoading) {
    return <div>Loading categories...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">All Categories</h2>
      {categories.length === 0 ? (
        <p>No categories available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map(category => (
            <div key={category._id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src={category.category_icon}
                alt={category.category_title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{category.category_title}</h3>
                <p className="text-gray-600">{category.category_description}</p>
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => updateCategory(category._id)}
                    className="bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteCategory(category._id)}
                    className="bg-red-500 text-black px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllCategories;
