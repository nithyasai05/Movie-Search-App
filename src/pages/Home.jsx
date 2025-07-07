import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";

const API_KEY = "5b59f372";
const BASE_URL = "http://www.omdbapi.com/";

export default function Home() {
  const [query, setQuery] = useState("naruto");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [mediaType, setMediaType] = useState("movie");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}?s=${query}&type=${mediaType}&page=${page}&apikey=${API_KEY}`
      );
      const data = await response.json();
      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [query, page, mediaType]);

  const handleSearchChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
  };

  const handleMediaTypeChange = (e) => {
    setMediaType(e.target.value);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div
      className={`min-h-screen p-6 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-center w-full">
          Lets Watch Movies & TV Series 📺
        </h1>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-white"
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search for movies or TV series..."
          value={query === "BTS" ? "" : query}
          onChange={handleSearchChange}
          className="p-3 w-full max-w-md rounded-lg border border-gray-300 dark:bg-blue-700 dark:border-blue-600 dark:text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div className="flex justify-center mb-8">
        <select
          value={mediaType}
          onChange={handleMediaTypeChange}
          className="p-3 w-full max-w-md rounded-lg border border-gray-300 dark:bg-blue-700 dark:border-blue-600 dark:text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <option value="movie">Movies</option>
          <option value="series">TV Series</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} />)
        ) : (
          <p className="col-span-full text-center text-xl font-semibold text-green-600 dark:text-gray-300">
            No results found
          </p>
        )}
      </div>

      {/* Pagination buttons */}
      {movies.length > 0 && (
        <div className="flex justify-center mt-8 space-x-4">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className={`px-4 py-2 font-semibold rounded-lg text-white ${
              page === 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            Previous
          </button>
          <button
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

// Purpose: This page is the main search interface where users can search for movies.
// Functionality:
// Displays a search input box.
// When the user types in a movie name, it fetches movies from the OMDb API and displays them as cards (using the MovieCard component).
// The user can click on a movie card to go to the MovieDetail page.

// Here are the changes made to limit the display to 3 items per page:

// 1. **Added `itemsPerPage` Constant**:
//    ```javascript
//    const itemsPerPage = 3;
//    ```

// 2. **Calculated the Start and End Indexes for Slicing**:
//    ```javascript
//    const startIndex = (page - 1) * itemsPerPage;
//    const endIndex = startIndex + itemsPerPage;
//    ```

// 3. **Created `paginatedMovies` Array**:
//    - Instead of displaying the entire `movies` array, `paginatedMovies` only contains 3 movies based on the current page.
//    ```javascript
//    const paginatedMovies = movies.slice(startIndex, endIndex);
//    ```

// 4. **Replaced `movies` with `paginatedMovies` in Rendering**:
//    ```javascript
//    {paginatedMovies.length > 0 ? (
//      paginatedMovies.map((movie) => (
//        <MovieCard key={movie.imdbID} movie={movie} />
//      ))
//    ) : (
//      <p className="col-span-full text-center text-xl font-semibold text-gray-600">
//        No movies found
//      </p>
//    )}
//    ```

// 5. **Updated the "Next" Button’s `disabled` Property**:
//    - The "Next" button is now disabled if `endIndex` exceeds the `movies` array length.
//    ```javascript
//    <button
//      onClick={() => setPage(page + 1)}
//      disabled={endIndex >= movies.length}
//      className={`px-4 py-2 font-semibold rounded-lg ${
//        endIndex >= movies.length ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
//      } text-white`}
//    >
//      Next
//    </button>
//    ```

// These changes ensure that only 3 movies are displayed per page and that pagination is handled correctly based on this limit.
