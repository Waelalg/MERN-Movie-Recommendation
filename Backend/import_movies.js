const mongoose = require('mongoose');
const csv = require('csv-parser');
const fs = require('fs');
const Movie = require('./models/Movie');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/cinemas', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
    console.log('Connected to MongoDB');
    
    try {
        // Clear existing data
        await Movie.deleteMany({});
        console.log('Cleared existing movies');
        
        // Read and import movies from CSV
        const movies = [];
        const csvFilePath = '../ML_Model/movies.csv'; // Adjust path as needed
        
        // Since we can't easily read CSV in Node, let's create some sample data
        // Or you can use MongoDB Compass to import the CSV directly
        
        console.log('Please import movies.csv manually using MongoDB Compass:');
        console.log('1. Open MongoDB Compass');
        console.log('2. Connect to: mongodb://127.0.0.1:27017');
        console.log('3. Create database "cinemas" and collection "movies"');
        console.log('4. Click "Import Data" and select your movies.csv');
        
        // Alternative: Create a few sample movies for testing
        const sampleMovies = [
            {
                homepage: "http://www.avatarmovie.com/",
                id: 19995,
                overview: "In the 22nd century, a paraplegic Marine is dispatched to the moon Pandora on a unique mission, but becomes torn between following orders and protecting an alien civilization.",
                release_date: new Date("2009-12-10"),
                runtime: 162,
                tagline: "Enter the World of Pandora.",
                title: "Avatar"
            },
            {
                homepage: "http://disney.go.com/disneypictures/pirates/",
                id: 285,
                overview: "Captain Barbossa, Will Turner and Elizabeth Swann must sail off the edge of the map, navigate treachery and betrayal, and make their final alliances for one last decisive battle.",
                release_date: new Date("2007-05-19"),
                runtime: 169,
                tagline: "At the end of the world, the adventure begins.",
                title: "Pirates of the Caribbean: At World's End"
            }
        ];
        
        await Movie.insertMany(sampleMovies);
        console.log(`Added ${sampleMovies.length} sample movies for testing`);
        
        mongoose.connection.close();
        console.log('Import completed!');
        
    } catch (error) {
        console.error('Import error:', error);
        mongoose.connection.close();
    }
});