// src/services/api.ts
import { Movie, MoviesResponse } from "../types/movie";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

if (!API_KEY) {
  console.error(
    "TMDB API key is missing. Please set REACT_APP_TMDB_API_KEY in your environment variables."
  );
}

export const movieAPI = {
  // Fetch popular movies
  getPopularMovies: async (page: number = 1): Promise<MoviesResponse> => {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch popular movies");
    }
    return response.json();
  },

  // Search movies
  searchMovies: async (
    query: string,
    page: number = 1
  ): Promise<MoviesResponse> => {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        query
      )}&page=${page}`
    );
    if (!response.ok) {
      throw new Error("Failed to search movies");
    }
    return response.json();
  },

  // Get movie details
  getMovieDetails: async (id: number): Promise<Movie> => {
    const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
    if (!response.ok) {
      throw new Error("Failed to fetch movie details");
    }
    return response.json();
  },
};
