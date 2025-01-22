const express = require('express');
const router = express.Router();

// Display cart items
router.get('/', (req, res) => {
    const cart = req.session.cart || []; // Get cart from session or set to empty
    res.render('cart', { cart }); // Render the cart page with the cart items
});

// Add items to the cart
router.post('/add', (req, res) => {
    const { item, description, price } = req.body;

    // Initialize cart if it doesn't exist
    if (!req.session.cart) {
        req.session.cart = [];
    }

    // Add the item to the cart
    req.session.cart.push({ item, description, price });

    res.redirect('/cart'); // Redirect to the cart page
});

// Clear the cart
router.post('/clear', (req, res) => {
    req.session.cart = []; // Clear the cart in the session
    res.redirect('/cart'); // Redirect to the cart page
});

module.exports = router;
