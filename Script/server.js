import express from 'express';
import https from 'https';
import fs from 'fs';
import mongoose from 'mongoose';
import Url from './models/url.js';
import urlRoutes from './routes/urlRoutes.js';

const app = express();
const PORT = 3001;

// SSL Certificate and Private Key
const options = {
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.cert')
};

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/link-short', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected successfully');
})
.catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});

// Register the URL routes
app.use('/', urlRoutes);

// Start the HTTPS server
https.createServer(options, app).listen(PORT, () => {
    console.log(`Server running on https://localhost:${PORT}`);
});
