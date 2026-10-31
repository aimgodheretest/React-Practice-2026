import { useState, useEffect } from "react";
import "./Movies.css";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [movieData, setMovieData] = useState({
    title: "",
    openingText: "",
    releaseDate: "",
  });

  // Automatically fetch movies when component loads
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

  // Handle input changes
  function handleInputChange(event) {
    const { name, value } = event.target;

    setMovieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  // Handle form submission
  function addMovieHandler(event) {
    event.preventDefault();

    const NewMovieObj = {
      title: movieData.title,
      openingText: movieData.openingText,
      releaseDate: movieData.releaseDate,
    };

    console.log(NewMovieObj);

    // Reset form after submission
    setMovieData({
      title: "",
      openingText: "",
      releaseDate: "",
    });
  }

  return (
    <div className="movies-container">
      <h1 className="movies-heading">Star Wars Movies</h1>

      {/* Add Movie Form */}
      <form className="add-movie-form" onSubmit={addMovieHandler}>
        <div className="form-control">
          <label htmlFor="title">Title</label>

          <input
            type="text"
            id="title"
            name="title"
            value={movieData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="openingText">Opening Text</label>

          <textarea
            id="openingText"
            name="openingText"
            rows="4"
            value={movieData.openingText}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="releaseDate">Release Date</label>

          <input
            type="date"
            id="releaseDate"
            name="releaseDate"
            value={movieData.releaseDate}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" className="add-movie-btn">
          Add Movie
        </button>
      </form>

      {/* Fetch Movies Button */}
      <div className="fetch-movies-container">
        <button
          className="fetch-btn"
          onClick={() => {
            console.log("Movies are already fetched automatically.");
          }}
        >
          Fetch Movies
        </button>
      </div>

      {isLoading && (
        <div className="loader">
          <div className="spinner"></div>
          <p>Loading movies, please wait...</p>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}

      {!isLoading && !error && (
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
