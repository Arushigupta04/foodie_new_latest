const Category = require('../models/category');
const Item = require('../models/item');
const express = require("express");
const router = express.Router();

// Fetch food items with categories
router.get('/food-items', async (req, res) => {
    try {
        const categories = await Category.find().populate("food_item");
        res.json(categories);
    } catch (err) {
        console.error('Error fetching food items:', err);
        res.status(500).json({ message: 'Failed to fetch food items' });
    }
});

// Create a new category
router.post('/categories', async (req, res) => {
    try {
        const { category_title, category_description, category_icon } = req.body;
        const newCategory = new Category({
            category_title,
            category_description,
            category_icon,
        });
        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Create a new item
router.post('/items', async (req, res) => {
    try {
        const { item_title, item_type, item_price, item_offer, item_src } = req.body;

        const newItem = new Item({
            item_title,
            item_type,
            item_price,
            item_offer: item_offer || null,  
            item_src,
        });

        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Add an item to a category
router.put('/categories/:categoryId/addItem', async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { itemId } = req.body;

        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const item = await Item.findById(itemId);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        category.food_item.push(item._id);
        await category.save();

        res.json(category);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE: Remove an item by ID
router.delete('/items/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedItem = await Item.findByIdAndDelete(id);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found.' });
        }
        res.json({ message: 'Item deleted successfully.', item: deletedItem });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT: Update an item by ID
router.put('/items/:id', async (req, res) => {
    const { id } = req.params;
    const { item_title, item_type, item_price, item_offer, item_src } = req.body;

    try {
        const updatedItem = await Item.findByIdAndUpdate(
            id,
            { item_title, item_type, item_price, item_offer, item_src },
            { new: true, runValidators: true }
        );
        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found.' });
        }
        res.json({ message: 'Item updated successfully.', item: updatedItem });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



// Get all categories
router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all items
router.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update category by ID
router.put('/categories/:id', async (req, res) => {
    try {
        console.log("in the update");
        const category = await Category.findById(req.params.id);
        console.log(category)
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }   

        // Update the category fields from the request body
        if (req.body.name) {
            category. category_title = req.body.name;
        }

        // Save the updated category
        const updatedCategory = await category.save();
        res.json(updatedCategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete category by ID
router.delete('/categories/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Use findByIdAndDelete instead of remove
        await Category.findByIdAndDelete(req.params.id);

        res.json({ message: 'Category deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



module.exports = router;




















// Delete an item
// router.delete('/items/:itemId', async (req, res) => {
//     try {
//         const { itemId } = req.params;

//         // Find and delete the item
//         const deletedItem = await Item.findByIdAndDelete(itemId);
//         if (!deletedItem) {
//             return res.status(404).json({ message: 'Item not found' });
//         }

//         // Remove the item from all categories
//         await Category.updateMany(
//             { food_item: itemId },
//             { $pull: { food_item: itemId } }
//         );

//         res.json({ message: 'Item deleted successfully', deletedItem });
//     } catch (err) {
//         console.error('Error deleting item:', err);
//         res.status(500).json({ message: 'Failed to delete item' });
//     }
// });