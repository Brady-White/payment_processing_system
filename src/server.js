// filepath: /Users/bradywhite/Desktop/payment_processing_systemj/server.js
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/api/checkout', (req, res) => {
    const { amount, paymentMethodId } = req.body;
    // Add your payment processing logic here
    console.log(`Received payment request: amount=${amount}, paymentMethodId=${paymentMethodId}`);
    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});