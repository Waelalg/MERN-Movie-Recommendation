const mongoose = require('mongoose');
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3050;

const Movie = require('./models/Movie');

app.use(cors());

// Updated connection without deprecated options
mongoose.connect('mongodb://127.0.0.1:27017/cinemas')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

app.get('/api/movies/:movieName', async (req, res) => {
    const { movieName } = req.params;

    try {
        console.log(`Searching for movie: ${movieName}`);

        const movie = await Movie.findOne({ title: new RegExp(movieName, 'i') });

        if (!movie) {
            console.log(`Movie not found: ${movieName}`);
            return res.status(404).json({ error: 'Movie not found' });
        }

        console.log(`Movie found: ${movie.title} with ID: ${movie.id}`);

        // Make sure Django server is running on port 8000
        const djangoResponse = await axios.get(`http://127.0.0.1:8000/api/recommended/${movie.id}/`);
        const recommendedMovieIds = djangoResponse.data.recommended_movies;

        const recommendedMovies = await Movie.find({ id: { $in: recommendedMovieIds } });

        res.json(recommendedMovies);
    } catch (error) {
        console.error(`An error occurred: ${error.message}`);
        
        if (error.response && error.response.status === 404) {
            res.status(404).json({ error: 'Recommended movies not found in the Django API.' });
        } else {
            res.status(500).json({ error: 'An error occurred while fetching recommended movies.' });
        }
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});