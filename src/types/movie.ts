// src/types/movie.ts
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path?: string;
  backdrop_path?: string;
  release_date?: string;
  vote_average?: number;
  vote_count?: number;
  popularity?: number;
  genre_ids?: number[];
  adult?: boolean;
  video?: boolean;
  original_language?: string;
  original_title?: string;
}

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface MovieFormData {
  title: string;
  overview: string;
  poster_path?: string;
  release_date?: string;
}

export interface MoviesState {
  movies: Movie[];
  filteredMovies: Movie[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  currentPage: number;
  totalPages: number;
}

export interface RootState {
  movies: MoviesState;
}
