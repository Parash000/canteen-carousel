
const express = require('express');
const MenuItem = require('../models/MenuItem');

const router = express.Router();

// Get all menu items
router.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.find({ isAvailable: true });
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get menu items by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const menuItems = await MenuItem.find({ 
      category: category.charAt(0).toUpperCase() + category.slice(1),
      isAvailable: true 
    });
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific menu item
router.get('/:id', async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Seed some initial data (development only)
router.post('/seed', async (req, res) => {
  try {
    // Delete existing items
    await MenuItem.deleteMany({});
    
    // Sample data from FoodCarousel.tsx
    const sampleItems = [
      {
        name: "Avocado Toast",
        image: "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        description: "Freshly baked sourdough topped with smashed avocado, poached eggs, and microgreens",
        price: "$8.99",
        category: "Breakfast",
      },
      {
        name: "Quinoa Power Bowl",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        description: "Protein-packed quinoa bowl with roasted vegetables, kale, and tahini dressing",
        price: "$10.99",
        category: "Lunch",
      },
      {
        name: "Margherita Pizza",
        image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        description: "Classic Neapolitan pizza with tomato sauce, fresh mozzarella, and basil",
        price: "$12.99",
        category: "Dinner",
      },
      {
        name: "Fresh Fruit Parfait",
        image: "https://images.unsplash.com/photo-1590135987412-4d891cb76cc1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        description: "Layers of Greek yogurt, seasonal fruits, and granola drizzled with honey",
        price: "$6.99",
        category: "Breakfast",
      },
      {
        name: "Poke Bowl",
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        description: "Fresh ahi tuna, cucumber, avocado, and pickled vegetables on a bed of rice",
        price: "$14.99",
        category: "Lunch",
      },
    ];
    
    await MenuItem.insertMany(sampleItems);
    res.status(201).json({ message: 'Database seeded successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
