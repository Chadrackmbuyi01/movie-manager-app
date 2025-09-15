// File: src/components/MovieForm.tsx
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addMovie, updateMovie } from "../state/movieSlice";
import { Movie } from "../types/movie";

interface MovieFormProps {
  editingMovie: Movie | null;
  setEditingMovie: (movie: Movie | null) => void;
}

const MovieForm: React.FC<MovieFormProps> = ({
  editingMovie,
  setEditingMovie,
}) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [posterPath, setPosterPath] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingMovie) {
      setTitle(editingMovie.title);
      setOverview(editingMovie.overview);
      setPosterPath(editingMovie.poster_path || "");
      setReleaseDate(editingMovie.release_date || "");
    } else {
      resetForm();
    }
  }, [editingMovie]);

  const resetForm = () => {
    setTitle("");
    setOverview("");
    setPosterPath("");
    setReleaseDate("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const movieData = {
      title,
      overview,
      poster_path: posterPath,
      release_date: releaseDate,
    };

    try {
      if (editingMovie) {
        await dispatch(updateMovie({ ...editingMovie, ...movieData }) as any);
        setEditingMovie(null);
      } else {
        await dispatch(addMovie(movieData) as any);
      }
      resetForm();
    } catch (error) {
      console.error("Failed to save movie:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <h3 className="text-lg font-medium mb-4">
        {editingMovie ? "Edit Movie" : "Add New Movie"}
      </h3>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-300"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="overview"
            className="block text-sm font-medium text-gray-300"
          >
            Description
          </label>
          <textarea
            id="overview"
            rows={4}
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="poster"
            className="block text-sm font-medium text-gray-300"
          >
            Poster URL (optional)
          </label>
          <input
            type="url"
            id="poster"
            value={posterPath}
            onChange={(e) => setPosterPath(e.target.value)}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="releaseDate"
            className="block text-sm font-medium text-gray-300"
          >
            Release Date (optional)
          </label>
          <input
            type="date"
            id="releaseDate"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex space-x-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isSubmitting
              ? "Saving..."
              : editingMovie
              ? "Update Movie"
              : "Add Movie"}
          </button>

          {editingMovie && (
            <button
              type="button"
              onClick={() => setEditingMovie(null)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default MovieForm;
