import React, { useEffect, useState } from "react";

function AllCategories1() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    item_title: "",
    item_type: "",
    item_price: "",
    item_offer: "",
    item_src: "",
  });

  // Fetch data from the API
  const fetchItems = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/add-new/items");
      if (!response.ok) throw new Error("Failed to fetch data.");
      const data = await response.json();
      setItems(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Delete item
  const deleteItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/add-new/items/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete item.");
      setItems(items.filter((item) => item._id !== id));
      alert("Item deleted successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  // Update item
  const updateItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/add-new/items/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to update item.");
      const updatedItem = await response.json();
      setItems(
        items.map((item) => (item._id === id ? updatedItem.item : item))
      );
      setEditingItem(null);
      alert("Item updated successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Start editing
  const startEditing = (item) => {
    setEditingItem(item._id);
    setFormData(item);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingItem(null);
    setFormData({
      item_title: "",
      item_type: "",
      item_price: "",
      item_offer: "",
      item_src: "",
    });
  };

  // Fetch items on load
  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-8">
        Explore Delicious Food Items
      </h1>

      {loading && (
        <p className="text-center text-lg text-gray-600">Loading items...</p>
      )}
      {error && <p className="text-center text-lg text-red-500">{error}</p>}

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {!loading &&
          !error &&
          items.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              {/* Image Section */}
              <div className="h-10 bg-gradient-to-r from-purple-300 via-pink-300 to-red-300 flex items-center justify-center">
                <img
                  src={item.item_src}
                  alt={item.item_title}
                  className="h-10 w-14 object-contain"
                />
              </div>

              {/* Details Section */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {item.item_title}
                </h2>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-semibold">Type:</span> {item.item_type}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-semibold">Price:</span> ₹{item.item_price}
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  <span className="font-semibold">Offer:</span> {item.item_offer}
                </p>
                <button
                 className="bg-red-500 text-black px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => deleteItem(item._id)}
                >
                  Delete
                </button>
                <button
                  className="bg-red-500 text-black px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => startEditing(item)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Edit Form */}
      {editingItem && (
        <div className="mt-10 p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-center mb-4">Edit Item</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateItem(editingItem);
            }}
          >
            <input
              type="text"
              name="item_title"
              value={formData.item_title}
              onChange={handleInputChange}
              className="w-full p-3 mb-3 border rounded"
              placeholder="Item Title"
            />
            <input
              type="text"
              name="item_type"
              value={formData.item_type}
              onChange={handleInputChange}
              className="w-full p-3 mb-3 border rounded"
              placeholder="Item Type"
            />
            <input
              type="text"
              name="item_price"
              value={formData.item_price}
              onChange={handleInputChange}
              className="w-full p-3 mb-3 border rounded"
              placeholder="Item Price"
            />
            <input
              type="text"
              name="item_offer"
              value={formData.item_offer}
              onChange={handleInputChange}
              className="w-full p-3 mb-3 border rounded"
              placeholder="Item Offer"
            />
            <input
              type="text"
              name="item_src"
              value={formData.item_src}
              onChange={handleInputChange}
              className="w-full p-3 mb-3 border rounded"
              placeholder="Item Image URL"
            />
            <div className="flex justify-between">
              <button
                type="submit"
                   className="bg-red-500 text-black px-4 py-2 rounded hover:bg-red-600"
              >
                Save
              </button>
              <button
                type="button"
                 className="bg-red-500 text-black px-4 py-2 rounded hover:bg-red-600"
                onClick={cancelEditing}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AllCategories1;
