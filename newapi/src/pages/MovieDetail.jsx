import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const API_KEY = "5b59f372";
const BASE_URL = "http://www.omdbapi.com/";

export default function MovieDetail() {
  const { id } = useParams(); //  Retrieves the movie's imdbID from the URL
  const [movie, setMovie] = useState(null); //// State to store the movie details

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}?i=${id}&apikey=${API_KEY}`
        );
        const data = await response.json();
        if (data.Response === "True") {
          setMovie(data);
          // Limit to 10 movies per page explicitly (if needed)
        // setMovies(data.Search.slice(0, 10));
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <p className="text-center text-xl font-semibold text-gray-600">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row items-center">
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="w-64 h-auto mb-6 md:mb-0 md:w-80 md:h-auto rounded-lg shadow-md"
          />
          <div className="ml-0 md:ml-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{movie.Title}</h1>
            <p className="text-lg text-blue-700 mb-4">{movie.Plot}</p>
            <p className="text-lg text-blue-700 mb-2"><strong>Year:</strong> {movie.Year}</p>
            <p className="text-lg text-blue-700 mb-2"><strong>Genre:</strong> {movie.Genre}</p>
            <p className="text-lg text-blue-700 mb-2"><strong>IMDb Rating:</strong> {movie.imdbRating}</p>
            <p className="text-lg text-blue-700 mb-2"><strong>Director:</strong> {movie.Director}</p>
            <p className="text-lg text-blue-700 mb-2"><strong>Actors:</strong> {movie.Actors}</p>
            <p className="text-lg text-blue-700 mb-2"><strong>Production:</strong> {movie.Production}</p>
          </div>
        </div>
      </div>
    </div>
  );
}













//back option below 

// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// const API_KEY = "5b59f372";
// const BASE_URL = "http://www.omdbapi.com/";

// export default function MovieDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate(); // To navigate programmatically
//   const [movie, setMovie] = useState(null);

//   useEffect(() => {
//     const fetchMovieDetails = async () => {
//       try {
//         const response = await fetch(
//           `${BASE_URL}?i=${id}&apikey=${API_KEY}`
//         );
//         const data = await response.json();
//         if (data.Response === "True") {
//           setMovie(data);
//         }
//       } catch (error) {
//         console.error("Error fetching movie details:", error);
//       }
//     };

//     fetchMovieDetails();
//   }, [id]);

//   if (!movie) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="relative min-h-screen bg-gray-100 p-6">
//       {/* Back Button */}
//       <button
//         onClick={() => navigate(-1)} // Navigate back to the previous page
//         className="absolute top-6 right-6 bg-gray-800 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-700 transition duration-300"
//       >
//         Back
//       </button>

//       {/* Movie Details */}
//       <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
//         <h1 className="text-3xl font-bold mb-4">{movie.Title}</h1>
//         <p className="text-lg mb-4">{movie.Plot}</p>
//         <p className="text-sm mb-2">Year: {movie.Year}</p>
//         <p className="text-sm mb-2">Genre: {movie.Genre}</p>
//         <p className="text-sm mb-2">IMDb Rating: {movie.imdbRating}</p>
//         {/* Add any additional movie information here */}
//       </div>
//     </div>
//   );
// }


// Purpose: Displays detailed information about a movie when the user clicks on a movie card in the Home page.
// Functionality:
// Fetches detailed data about a movie from the OMDb API using its imdbID.
// Shows details like title, plot, genre, IMDb rating, and other information about the movie.
// There is a Back button at the top-right corner to allow the user to go back to the previous page (search results or home page).
