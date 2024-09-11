import React, { useState } from 'react';
import './style1.css';

const AddItemForm = ({ categories, onAddItem }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('veg');
  const [price, setPrice] = useState('');
  const [offer, setOffer] = useState('');
  const [image, setImage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      item_title: title,
      item_type: type,
      item_price: price,
      item_offer: offer,
      item_src: image,
    };
    if (selectedCategory) {
      onAddItem(selectedCategory, newItem);
      setTitle('');
      setType('veg');
      setPrice('');
      setOffer('');
      setImage('');
      setSelectedCategory('');
    } else {
      console.error('Please select a category.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container add-item">
      <div className="form-group">
        <label htmlFor="title" className="form-label">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="type" className="form-label">Type:</label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="form-select"
        >
          <option value="veg">Veg</option>
          <option value="nonveg">Non-Veg</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="price" className="form-label">Price:</label>
        <input
          type="text"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="offer" className="form-label">Offer:</label>
        <input
          type="text"
          id="offer"
          value={offer}
          onChange={(e) => setOffer(e.target.value)}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="image" className="form-label">Image:</label>
        <input
          type="text"
          id="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="category" className="form-label">Select Category:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          required
          className="form-select"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.category_title}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn-submit">Add Item</button>
    </form>
  );
};

export default AddItemForm;