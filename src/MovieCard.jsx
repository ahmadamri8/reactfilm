import { useEffect, useState } from "react";
import './App.css';
import MovieCard from "./MovieCard";

const API_URL = "http://www.omdbapi.com?apikey=b169cf0";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(`${API_URL}&s=`);
      const data = await response.json();

      console.log(data); // Tambahkan log ini untuk memeriksa hasil respons API

      setMovies(data.Search || []);
    };

    fetchMovies();
  }, []);

  return (
    <>
      <div className="app">
        <h1>Rating Film</h1>

        <div className="container">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard movie={movie} key={movie.imdbID} />
            ))
          ) : (
            <div className="empty">
              <h2>Tidak ada film yang ditampilkan</h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
