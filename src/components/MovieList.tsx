// src/components/movies/MovieList.tsx
import React from "react";
import { Movie } from "../types/movie";
import MovieCard from "../components/MovieCard";

interface MovieListProps {
  movies: Movie[];
  onEditMovie: (movie: Movie) => void;
  loading?: boolean;
}

const MovieList: React.FC<MovieListProps> = ({
  movies,
  onEditMovie,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p>No movies found. Try a different search term or add a new movie.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onEdit={onEditMovie} />
      ))}
    </div>
  );
};

export default MovieList;
