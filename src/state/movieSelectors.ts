// src/store/selectors/movieSelectors.ts
import { RootState } from "../types/movie";

export const selectAllMovies = (state: RootState) => state.movies.movies;
export const selectFilteredMovies = (state: RootState) =>
  state.movies.filteredMovies;
export const selectMoviesLoading = (state: RootState) => state.movies.loading;
export const selectMoviesError = (state: RootState) => state.movies.error;
export const selectSearchQuery = (state: RootState) => state.movies.searchQuery;
export const selectCurrentPage = (state: RootState) => state.movies.currentPage;
export const selectTotalPages = (state: RootState) => state.movies.totalPages;
