
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const filmeRoutes = require('./routes/filme');
const reviewRoutes = require('./routes/review');

app.use(cors()); 
app.use(express.json());
app.use(express.static('public'));

app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self'; style-src 'self';");
    next();
});

app.use('/filme', filmeRoutes);
app.use('/review', reviewRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

