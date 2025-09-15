// src/hooks/useMovies.ts (update the existing hook)
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  fetchPopularMovies,
  searchMovies,
  addMovie,
  updateMovie,
  setSearchQuery,
  clearError,
} from "../state/movieSlice";
import {
  selectAllMovies,
  selectFilteredMovies,
  selectMoviesLoading,
  selectMoviesError,
  selectSearchQuery,
  selectCurrentPage,
  selectTotalPages,
} from "../state/movieSelectors";
import { Movie, MovieFormData } from "../types/movie";

export const useMovies = () => {
  const dispatch = useAppDispatch();

  const movies = useAppSelector(selectAllMovies);
  const filteredMovies = useAppSelector(selectFilteredMovies);
  const loading = useAppSelector(selectMoviesLoading);
  const error = useAppSelector(selectMoviesError);
  const searchQuery = useAppSelector(selectSearchQuery);
  const currentPage = useAppSelector(selectCurrentPage);
  const totalPages = useAppSelector(selectTotalPages);

  const getPopularMovies = useCallback(
    (page: number = 1) => {
      return dispatch(fetchPopularMovies(page) as any);
    },
    [dispatch]
  );

  const searchMoviesByQuery = useCallback(
    (query: string, page: number = 1) => {
      if (query.trim()) {
        return dispatch(searchMovies({ query, page }) as any);
      }
    },
    [dispatch]
  );

  const addNewMovie = useCallback(
    (movieData: MovieFormData) => {
      return dispatch(addMovie(movieData) as any).unwrap();
    },
    [dispatch]
  );

  const updateExistingMovie = useCallback(
    (movie: Movie) => {
      return dispatch(updateMovie(movie) as any).unwrap();
    },
    [dispatch]
  );

  const setSearch = useCallback(
    (query: string) => {
      dispatch(setSearchQuery(query));
    },
    [dispatch]
  );

  const clearMoviesError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    movies,
    filteredMovies,
    loading,
    error,
    searchQuery,
    currentPage,
    totalPages,
    getPopularMovies,
    searchMoviesByQuery,
    addNewMovie,
    updateExistingMovie,
    setSearch,
    clearError: clearMoviesError,
  };
};
