import express from 'express'; 
import shortid from 'shortid'; 
import Url from '../models/url.js'; 

const router = express.Router(); 

router.post('/shorten', async (req, res) => {
    const { destination } = req.body; 
    if (!destination) {
        return res.status(400).json({
            error: "Original URL is required"
        });
    }

    const shortenedUrl = shortid.generate(); 

    const newUrl = new Url({
        originalUrl: destination,
        shortenedUrl: shortenedUrl,
    });

    try {
        await newUrl.save(); 
        res.status(201).json({ 
            originalUrl: destination, 
            shortUrl: `https://localhost:${3001}/${shortenedUrl}`
        });        
    } catch (err) {
        console.error('Error saving URL:', err);
        res.status(500).send('Failed to save the URL. Please try again later.');
    }
});

router.get('/:shortenedUrl', async (req, res) => {
    const { shortenedUrl } = req.params; 

    try {
        const urlEntry = await Url.findOne({ shortenedUrl });

        if (urlEntry) {
            return res.redirect(urlEntry.originalUrl);
        }

        res.status(404).send('Not Found: The shortened URL does not exist.');
    } catch (err) {
        console.error('Error finding URL:', err);
        res.status(500).send('Server error while trying to find the URL.');
    }
});

export default router; 
