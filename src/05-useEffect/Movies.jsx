import { useEffect, useState } from "react";
import "./Movies.css";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMoviesHandler() {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch("https://swapi.info/api/films");

        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }

        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMoviesHandler();
  }, []);

  return (
    <div className="movies-container">
      <h1 className="movies-heading">Star Wars Movies</h1>

      {/* <button
        className="fetch-btn"
        onClick={fetchMoviesHandler}
        disabled={isLoading}
      >
        {isLoading ? "Fetching Movies..." : "Fetch Movies"}
      </button> */}

      {isLoading && (
        <div className="loader">
          <div className="spinner"></div>
          <p>Loading movies, please wait...</p>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}

      {!isLoading && (
        <div className="movies-grid">
          {movies.map((movie) => (
            <div className="movie-card" key={movie.episode_id}>
              <div className="movie-card-header">
                <span className="episode-badge">
                  Episode {movie.episode_id}
                </span>

                <span className="movie-year">
                  {movie.release_date?.slice(0, 4)}
                </span>
              </div>

              <h2 className="movie-title">{movie.title}</h2>

              <p className="movie-crawl">{movie.opening_crawl}</p>

              <div className="movie-details">
                <p>
                  <strong>Director:</strong> {movie.director}
                </p>

                <p>
                  <strong>Release Date:</strong> {movie.release_date}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Movies;
