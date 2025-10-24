"use client"

import { useState } from "react"
import axios from "axios"
import NavBar from "@/Components/Navbar"
import "@/App.css"

export default function Page() {
  const [movieName, setMovieName] = useState("")
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const fetchRecommendations = async () => {
    if (!movieName.trim()) {
      setError("Please enter a movie name")
      return
    }

    try {
      setLoading(true)
      setError("")
      const encodedMovieName = encodeURIComponent(movieName)
      const response = await axios.get(`http://127.0.0.1:3050/api/movies/${encodedMovieName}`)
      setRecommendations(response.data)
    } catch (error) {
      setError("Movie not found. Try another title.")
      setRecommendations([])
      console.error("Error fetching recommendations", error)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchRecommendations()
    }
  }

  return (
    <>
      <NavBar />
      <div className="app-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Discover Your Next Favorite Movie</h1>
            <p className="hero-subtitle">Search for any movie and get personalized recommendations</p>

            {/* Search Bar */}
            <div className="search-container">
              <div className="search-input-wrapper">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Enter a movie title..."
                  value={movieName}
                  onChange={(e) => setMovieName(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button className="search-button" onClick={fetchRecommendations} disabled={loading}>
                  {loading ? "Searching..." : "Search"}
                </button>
              </div>
              {error && <p className="error-message">{error}</p>}
            </div>
          </div>
        </section>

        {/* Recommendations Section */}
        {recommendations.length > 0 && (
          <section className="recommendations-section">
            <div className="section-header">
              <h2>Recommended For You</h2>
              <p className="result-count">{recommendations.length} movies found</p>
            </div>

            <div className="movies-grid">
              {recommendations.map((movie) => (
                <div key={movie._id} className="movie-card">
                  <div className="movie-card-header">
                    <h3 className="movie-title">{movie.title}</h3>
                  </div>

                  <div className="movie-card-body">
                    {movie.tagline ? (
                      <p className="movie-tagline">"{movie.tagline}"</p>
                    ) : (
                      <p className="movie-tagline no-tagline">No tagline available</p>
                    )}

                    <div className="movie-info">
                      <div className="info-item">
                        <span className="info-label">Release Date</span>
                        <span className="info-value">{movie.release_date.slice(0, 10)}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Duration</span>
                        <span className="info-value">{movie.runtime} min</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {recommendations.length === 0 && !loading && (
          <section className="empty-state">
            <div className="empty-state-content">
              <div className="empty-icon">🎬</div>
              <h3>Start Exploring</h3>
              <p>Search for a movie to get personalized recommendations</p>
            </div>
          </section>
        )}
      </div>
    </>
  )
}
