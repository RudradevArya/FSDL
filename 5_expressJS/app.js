
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json()); //jsonn parser

//logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

//static dtaa
let products = [
    { id: 1, name: 'Laptop', price: 1000 },
    { id: 2, name: 'Phone', price: 500 }
];

// CREATE: Add a new product
app.post('/products', (req, res) => {
    const { name, price } = req.body;

    if (!name || !price) {
        return res.status(400).json({ error: 'Name and price are required' });
    }

    const newProduct = { id: products.length + 1, name, price };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// READ: Get all products
app.get('/products', (req, res) => {
    res.json(products);
});

// READ: Get a product by ID
app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
});

// UPDATE: Update a product by ID
app.put('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const { name, price } = req.body;

    const product = products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    if (!name || !price) {
        return res.status(400).json({ error: 'Name and price are required' });
    }

    product.name = name;
    product.price = price;

    res.json(product);
});

// DELETE: Remove a product by ID
app.delete('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === productId);

    if (productIndex === -1) {
        return res.status(404).json({ error: 'Product not found' });
    }

    products.splice(productIndex, 1);
    res.status(204).send(); // 204 No Content, as the product has been deleted
});

// Global error handler for any unexpected errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Default route for base URL
app.get('/', (req, res) => {
    res.send('Welcome to the Products API');
});


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
