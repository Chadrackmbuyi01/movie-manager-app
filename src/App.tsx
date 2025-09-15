// File: src/App.tsx
import React from "react";
import { Provider } from "react-redux";
import { store } from "./state/store";
import MovieList from "../src/components/MovieList";
import MovieSearch from "../src/components/MovieSearch";
import MovieForm from "../src/components/MovieForm";
import Header from "./components/layout/Header";
import { Movie } from "./types/movie";

function App() {
  const [editingMovie, setEditingMovie] = React.useState<Movie | null>(null);

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-900 text-white">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg sticky top-4">
                <h2 className="text-xl font-bold mb-4">Manage Movies</h2>
                <MovieSearch />
                <MovieForm
                  editingMovie={editingMovie}
                  setEditingMovie={setEditingMovie}
                />
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <MovieList onEditMovie={setEditingMovie} movies={[]} />
            </div>
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
