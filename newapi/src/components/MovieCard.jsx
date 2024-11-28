import React from "react";
import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <Link
      to={`/movie/${movie.imdbID}`}
      className="block w-full max-w-xs bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
    >
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "default.jpg"}
        alt={movie.Title}
        className="w-full h-80 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{movie.Title}</h3>
        <p className="text-gray-500">{movie.Year}</p>
      </div>
    </Link>
  );
}


















// Purpose: Displays a movie's thumbnail (poster), title, and year. It is used to display the results in the Home page.
// Functionality:
// It takes movie details as props and displays them inside a card format.
// When the card is clicked, it navigates to the MovieDetail page (detailed view of the movie).
// Where it's shown: The MovieCard component is used inside Home to display each movie in a grid-like format. Each card links to a specific movie's detailed view.

