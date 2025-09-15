import React, { useState } from "react";
import { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
  onEdit: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onEdit }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleEditClick = () => {
    onEdit(movie);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Unknown date";

    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Invalid date";
    }
  };

  const getRatingColor = (rating?: number) => {
    if (!rating) return "bg-gray-500";

    if (rating >= 8) return "bg-green-500";
    if (rating >= 6) return "bg-yellow-500";
    if (rating >= 4) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Movie Poster */}
      <div className="relative h-48 overflow-hidden">
        {!imageError && movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full bg-gray-700 flex items-center justify-center">
            <div className="text-gray-400 text-center p-4">
              <svg
                className="w-12 h-12 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-sm">No image available</p>
            </div>
          </div>
        )}

        {/* Rating Badge */}
        {movie.vote_average && (
          <div
            className={`absolute top-2 right-2 ${getRatingColor(
              movie.vote_average
            )} text-white text-xs font-bold px-2 py-1 rounded-full`}
          >
            {movie.vote_average.toFixed(1)}
          </div>
        )}
      </div>

      {/* Movie Info */}
      <div className="p-4">
        <h3
          className="font-bold text-lg mb-2 line-clamp-2 h-14"
          title={movie.title}
        >
          {movie.title}
        </h3>

        <div className="flex justify-between items-center mb-3 text-sm text-gray-400">
          <span>{formatDate(movie.release_date)}</span>
          {movie.vote_count && (
            <span>{movie.vote_count.toLocaleString()} votes</span>
          )}
        </div>

        <p className="text-gray-300 text-sm mb-4 line-clamp-3 h-16">
          {movie.overview || "No description available."}
        </p>

        {/* Edit Button */}
        <button
          onClick={handleEditClick}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          Edit Description
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
