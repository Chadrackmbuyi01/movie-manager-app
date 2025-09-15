import React, { useState, useEffect, useCallback } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useMovies } from "../hooks/useMovies";

const MovieSearch: React.FC = () => {
  const [localQuery, setLocalQuery] = useState("");
  const {
    searchQuery,
    setSearch,
    searchMoviesByQuery,
    getPopularMovies,
    loading,
  } = useMovies();

  // Initialize with popular movies on first render
  useEffect(() => {
    if (!searchQuery) {
      getPopularMovies();
    }
  }, [getPopularMovies, searchQuery]);

  // Debounce the search query to avoid excessive API calls
  const debouncedQuery = useDebounce(localQuery, 500);

  // Handle the debounced search
  useEffect(() => {
    if (debouncedQuery.trim() === "") {
      getPopularMovies();
    } else {
      searchMoviesByQuery(debouncedQuery);
    }
  }, [debouncedQuery, searchMoviesByQuery, getPopularMovies]);

  // Sync local state with Redux state
  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setLocalQuery(value);
      setSearch(value);
    },
    [setSearch]
  );

  const handleClearSearch = useCallback(() => {
    setLocalQuery("");
    setSearch("");
    getPopularMovies();
  }, [setSearch, getPopularMovies]);

  return (
    <div className="mb-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <input
          type="text"
          value={localQuery}
          onChange={handleInputChange}
          placeholder="Search for movies..."
          className="block w-full pl-10 pr-12 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          aria-label="Search movies"
        />

        {localQuery && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button
              onClick={handleClearSearch}
              className="text-gray-400 hover:text-white focus:outline-none"
              aria-label="Clear search"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="mt-2 flex items-center text-sm text-blue-400">
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Searching...
        </div>
      )}
    </div>
  );
};

export default MovieSearch;
