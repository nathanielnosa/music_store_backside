const express = require('express')
const router = express.Router()
const stripe = require('stripe')(process.env.STRIPE_KEY)

router.post('/payment', async (req, res) => {
  try {
    // Check if req.body.products exists and is an array
    if (!req.body.products || !Array.isArray(req.body.products)) {
      throw new Error('Invalid request body: "products" property is missing or not an array');
    }

    // Map over each product in the array
    const lineItems = req.body.products.map(product => ({
      price_data: {
        currency: 'usd',
        unit_amount: product.amount * 100,
        product_data: {
          name: product.name || 'Unnamed Product',
          images: [product.image].filter(Boolean), // Filter out undefined or null values
        },
      },
      quantity: product.quantity || 1, // Default quantity to 1 if not provided
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/cancel',
    });
    // Include payment-related data in the response
    const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);

    res.status(200).json({ id: session.id, paymentData: paymentIntent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;