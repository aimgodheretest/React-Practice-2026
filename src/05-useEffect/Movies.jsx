import { useState, useEffect } from "react";
import "./Movies.css";

const FIREBASE_URL =
  "https://movies-http-request-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [deletingMovieId, setDeletingMovieId] = useState(null);

  const [movieData, setMovieData] = useState({
    title: "",
    openingText: "",
    releaseDate: "",
  });

  // GET: Fetch movies from Firebase when page loads
  useEffect(() => {
    async function fetchMoviesHandler() {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch(FIREBASE_URL);

        if (!response.ok) {
          const errorData = await response.json();

          console.error("Firebase error:", errorData);

          throw new Error(
            errorData.error || `Request failed: ${response.status}`,
          );
        }

        const data = await response.json();

        if (data) {
          const loadedMovies = Object.entries(data).map(([id, movie]) => ({
            id,
            ...movie,
          }));

          setMovies(loadedMovies);
        } else {
          setMovies([]);
        }
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMoviesHandler();
  }, []);

  // Handle form input
  function handleInputChange(event) {
    const { name, value } = event.target;

    setMovieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  // POST: Add movie to Firebase
  async function addMovieHandler(event) {
    event.preventDefault();

    const NewMovieObj = {
      title: movieData.title,
      openingText: movieData.openingText,
      releaseDate: movieData.releaseDate,
    };

    setIsSaving(true);
    setError("");

    try {
      const response = await fetch(FIREBASE_URL, {
        method: "POST",
        body: JSON.stringify(NewMovieObj),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();

        console.error("Firebase error:", errorData);

        throw new Error(
          errorData.error || `Request failed: ${response.status}`,
        );
      }

      const data = await response.json();

      // Firebase returns the generated database ID in data.name
      const savedMovie = {
        id: data.name,
        ...NewMovieObj,
      };

      // Update UI after successful database save
      setMovies((prevMovies) => [...prevMovies, savedMovie]);

      console.log("New movie saved:", savedMovie);

      setMovieData({
        title: "",
        openingText: "",
        releaseDate: "",
      });
    } catch (error) {
      console.error("Error adding movie:", error);
      setError(error.message);
    } finally {
      setIsSaving(false);
    }
  }

  // DELETE: Remove movie from Firebase
  async function deleteMovieHandler(movieId) {
    setDeletingMovieId(movieId);
    setError("");

    try {
      const deleteUrl = FIREBASE_URL.replace(".json", `/${movieId}.json`);

      const response = await fetch(deleteUrl, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete movie");
      }

      // Update UI after successful deletion
      setMovies((prevMovies) =>
        prevMovies.filter((movie) => movie.id !== movieId),
      );

      console.log("Movie deleted:", movieId);
    } catch (error) {
      console.error("Error deleting movie:", error);
      setError(error.message);
    } finally {
      setDeletingMovieId(null);
    }
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

        <button type="submit" className="add-movie-btn" disabled={isSaving}>
          {isSaving ? "Adding Movie..." : "Add Movie"}
        </button>
      </form>

      {/* Fetch Movies */}
      <div className="fetch-movies-container">
        <button className="fetch-btn" onClick={() => window.location.reload()}>
          Fetch Movies
        </button>
      </div>

      {isLoading && (
        <div className="loader">
          <div className="spinner"></div>
          <p>Loading movies...</p>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}

      {/* Display Movies */}
      {!isLoading && (
        <div className="movies-grid">
          {movies.map((movie) => (
            <div className="movie-card" key={movie.id}>
              <h2 className="movie-title">{movie.title}</h2>

              <p className="movie-crawl">{movie.openingText}</p>

              <div className="movie-details">
                <p>
                  <strong>Release Date:</strong> {movie.releaseDate}
                </p>
              </div>

              <button
                className="delete-movie-btn"
                onClick={() => deleteMovieHandler(movie.id)}
                disabled={deletingMovieId === movie.id}
              >
                {deletingMovieId === movie.id ? "Deleting..." : "Delete Movie"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Movies;
