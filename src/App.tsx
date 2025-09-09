// File: src/App.tsx
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import MovieList from "./components/MovieList";
import MovieSearch from "./components/MovieSearch";
import MovieForm from "./components/MovieForm";
import Header from "./components/Header";

function App() {
  const [editingMovie, setEditingMovie] = React.useState(null);

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
              <MovieList onEditMovie={setEditingMovie} />
            </div>
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
