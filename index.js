const express = require('express');
const app = express();
const port = 4000;

// Middleware for logging every request
app.use((req, res, next) => {
    console.log(`[INFO] ${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Healthy route
app.get('/', (req, res) => {
    console.log(`[INFO] Healthy request received`);
    res.send('Service is running');
});

// Status check
app.get('/status', (req, res) => {
    console.log(`[INFO] Status checked`);
    res.json({ status: 'OK' });
});


// Simulate random 500 errors
app.get('/error', (req, res) => {
    console.log(`[ERROR] Random server error triggered`);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Simulate app crash
app.get('/crash', (req, res) => {
    console.log(`[CRITICAL] Application crash triggered`);
    process.exit(1);
});


app.listen(port, () => {
    console.log(`[INFO] Server running on port ${port}`);
});

