# Movie Recommendation System

A full-stack web application that provides movie recommendations using content-based filtering. The system combines a React frontend with Node.js/Express backend and Python/Django for machine learning recommendations.

## System Architecture

![Movie Recommendation App Workflow](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/movie-workflow-diagram-1udoIUcfeIxgyRma0s5jncrECOrLSm.png)

The workflow shows how the user interacts with the React frontend, which communicates with the Express backend, queries MongoDB for movie data, and uses Django with machine learning models to generate personalized recommendations.

## Application Interface

![MovieFinder Application](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-10-24%20155330-9hYUZSEdwm1HTvGgi4Pyku2JetdW07.png)

The frontend provides an intuitive interface where users can search for movies and receive personalized recommendations based on content similarity.

## Project Structure

\`\`\`
MERN_Movie_Recomendation/
├── Backend/                 # Node.js + Express API
│   ├── models/
│   │   └── Movie.js        # MongoDB schema
│   └── server.js           # Main server file
├── frontend/               # React application
│   ├── app/
│   │   └── page.jsx        # Main page component
│   ├── node_modules/       # Dependencies
│   ├── public/             # Static assets
│   │   ├── index.html      # HTML entry point
│   │   ├── logo.png        # App logo
│   │   ├── logo512.png     # Logo variant
│   │   ├── manifest.json   # PWA manifest
│   │   └── robots.txt      # SEO robots file
│   ├── src/
│   │   ├── Components/     # React components
│   │   │   ├── logo.png    # Component assets
│   │   │   └── Navbar.jsx  # Navigation component
│   │   ├── styles/         # Stylesheets
│   │   │   ├── Navbar.css  # Navbar styles
│   │   │   ├── App.css     # App styles
│   │   │   └── index.css   # Global styles
│   │   ├── App.jsx         # Main App component
│   │   ├── App.test.js     # App tests
│   │   ├── index.js        # React entry point
│   │   └── reportWebVitals.js # Performance monitoring
│   └── package.json        # Frontend dependencies
├── Movie_Python/           # Django recommendation API
│   ├── movie_api/
│   │   ├── views.py        # Recommendation logic
│   │   ├── config.py       # ML model configuration
│   │   └── urls.py         # API routes
│   └── manage.py           # Django management
├── ML_Model/              # Data and ML development
│   ├── movies.csv         # Movie dataset
│   ├── credits.csv        # Credits dataset
│   └── Movie_Recommender.ipynb # ML notebook
└── README.md              # This file
\`\`\`

## Frontend Structure

![Frontend File Structure](https://blob.v0.app/DyXSS.txt)

The frontend is organized as a React application with:
- **app/** - Main application page
- **public/** - Static files and assets
- **src/Components/** - Reusable React components (Navbar, etc.)
- **src/styles/** - CSS stylesheets for components and global styles
- **src/** - Core React files (App.jsx, index.js, etc.)

## Prerequisites

Before running this project, make sure you have installed:

- **Node.js** (v14 or higher)
- **Python** (v3.8 or higher)
- **MongoDB**
- **npm** (comes with Node.js)

## Installation & Setup

### 1. Backend Setup

\`\`\`bash
cd Backend
npm install
\`\`\`

### 2. Frontend Setup

\`\`\`bash
cd frontend
npm install
\`\`\`

### 3. Python Dependencies

\`\`\`bash
cd Movie_Python
pip install -r requirements.txt
\`\`\`

### 4. Database Setup

- Start MongoDB service: `mongod`
- Import movie data into MongoDB (use the provided CSV files)

### 5. Generate ML Model Files

\`\`\`bash
cd Movie_Python
python generate_pkl_files.py
\`\`\`

## Running the Application

Run these commands in separate terminals:

### Start Django ML API

\`\`\`bash
cd Movie_Python
python manage.py runserver
\`\`\`

Runs on: `http://localhost:8000`

### Start Node.js Backend

\`\`\`bash
cd Backend
npm start
\`\`\`

Runs on: `http://localhost:3050`

### Start React Frontend

\`\`\`bash
cd frontend
npm start
\`\`\`

Runs on: `http://localhost:3000`

## How to Use

1. Open `http://localhost:3000` in your browser
2. Enter a movie name in the search box
3. Click "Get Recommendations" to see similar movies
4. The system will display movies based on content similarity

## API Endpoints

- **Backend**: `GET /api/movies/:movieName` - Get movie recommendations
- **Django**: `GET /api/recommended/:movieId/` - Get similar movie IDs

## How It Works

1. User searches for a movie in the React frontend
2. Node.js backend searches MongoDB for the movie
3. Backend sends movie ID to Django API
4. Django uses pre-trained ML model to find similar movies
5. Backend fetches details of recommended movies from MongoDB
6. Frontend displays the recommendations to user

## Machine Learning

The recommendation system uses content-based filtering with:

- **TF-IDF vectorization** of movie features
- **Cosine similarity** for measuring movie similarity
- **Combined features**: overview, genres, keywords, cast, and director

## Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB connection error | Make sure MongoDB is running (`mongod`) |
| Movie not found | Check if the movie exists in your database |
| Port conflicts | Ensure ports 3000, 3050, and 8000 are available |
| PKL files missing | Run the `generate_pkl_files.py` script |

## Important Notes

- The system requires movie data to be imported into MongoDB
- ML model files (`movie_dict.pkl` and `similarity.pkl`) must be generated before use
- The frontend expects the backend to be running on port 3050 and Django on port 8000
- Ensure all three services (Frontend, Backend, Django) are running simultaneously for full functionality

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **ML/Recommendations**: Python, Django, scikit-learn
- **Styling**: CSS

---

