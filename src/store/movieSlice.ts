// File: src/store/movieSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Movie, MoviesState } from "../types/Movie";

const API_KEY = "your_tmdb_api_key_here";
const BASE_URL = "https://api.themoviedb.org/3";

// Async thunks for API calls
export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (searchQuery: string = "") => {
    const url = searchQuery
      ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          searchQuery
        )}`
      : `${BASE_URL}/movie/popular?api_key=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  }
);

export const addMovie = createAsyncThunk(
  "movies/addMovie",
  async (movie: Omit<Movie, "id">) => {
    // In a real app, this would be a POST request
    // For demo purposes, we'll simulate an API call
    return new Promise<Movie>((resolve) => {
      setTimeout(() => {
        const newMovie: Movie = {
          ...movie,
          id: Math.random().toString(36).substr(2, 9), // Generate unique ID
        };
        resolve(newMovie);
      }, 500);
    });
  }
);

export const updateMovie = createAsyncThunk(
  "movies/updateMovie",
  async (movie: Movie) => {
    // In a real app, this would be a PUT request
    return new Promise<Movie>((resolve) => {
      setTimeout(() => {
        resolve(movie);
      }, 500);
    });
  }
);

const initialState: MoviesState = {
  movies: [],
  loading: false,
  error: null,
  searchQuery: "",
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch movies
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch movies";
      })
      // Add movie
      .addCase(addMovie.fulfilled, (state, action) => {
        state.movies.unshift(action.payload);
      })
      // Update movie
      .addCase(updateMovie.fulfilled, (state, action) => {
        const index = state.movies.findIndex(
          (movie) => movie.id === action.payload.id
        );
        if (index !== -1) {
          state.movies[index] = action.payload;
        }
      });
  },
});

export const { setSearchQuery } = moviesSlice.actions;
export default moviesSlice.reducer;
