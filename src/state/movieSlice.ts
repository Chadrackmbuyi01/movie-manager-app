// src/store/slices/moviesSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Movie, MoviesResponse } from "../types/movie";
import { MoviesState } from "../types/movie";
import { movieAPI } from "../services/api";

const initialState: MoviesState = {
  movies: [],
  filteredMovies: [],
  loading: false,
  error: null,
  searchQuery: "",
  currentPage: 1,
  totalPages: 1,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch popular movies
      .addCase(fetchPopularMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.results;
        state.filteredMovies = action.payload.results;
        state.currentPage = action.payload.page;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch movies";
      })
      // Search movies
      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredMovies = action.payload.results;
        state.currentPage = action.payload.page;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to search movies";
      })
      // Add movie
      .addCase(addMovie.fulfilled, (state, action) => {
        state.movies.unshift(action.payload);
        if (
          !state.searchQuery ||
          action.payload.title
            .toLowerCase()
            .includes(state.searchQuery.toLowerCase())
        ) {
          state.filteredMovies.unshift(action.payload);
        }
      })
      // Update movie
      .addCase(updateMovie.fulfilled, (state, action) => {
        const index = state.movies.findIndex(
          (movie) => movie.id === action.payload.id
        );
        if (index !== -1) {
          state.movies[index] = action.payload;

          const filteredIndex = state.filteredMovies.findIndex(
            (movie) => movie.id === action.payload.id
          );
          if (filteredIndex !== -1) {
            state.filteredMovies[filteredIndex] = action.payload;
          }
        }
      });
  },
});

// Async thunks
export const fetchPopularMovies = createAsyncThunk(
  "movies/fetchPopular",
  async (page: number = 1): Promise<MoviesResponse> => {
    const response = await movieAPI.getPopularMovies(page);
    return response;
  }
);

export const searchMovies = createAsyncThunk(
  "movies/search",
  async ({ query, page = 1 }: { query: string; page?: number }): Promise<MoviesResponse> => {
    const response = await movieAPI.searchMovies(query, page);
    return response;
  }
);

export const addMovie = createAsyncThunk(
  "movies/add",
  async (movieData: Omit<Movie, "id">): Promise<Movie> => {
    // Simulate API call - in a real app, this would be a POST request
    return new Promise<Movie>((resolve) => {
      setTimeout(() => {
        const newMovie: Movie = {
          ...movieData,
          id: Math.floor(Math.random() * 10000), // Generate a unique ID
        };
        resolve(newMovie);
      }, 500);
    });
  }
);

export const updateMovie = createAsyncThunk(
  "movies/update",
  async (movie: Movie): Promise<Movie> => {
    // Simulate API call - in a real app, this would be a PUT request
    return new Promise<Movie>((resolve) => {
      setTimeout(() => {
        resolve(movie);
      }, 500);
    });
  }
);

export const { setSearchQuery, clearError } = moviesSlice.actions;
export default moviesSlice.reducer;
