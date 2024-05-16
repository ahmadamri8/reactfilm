// import { useEffect, useState } from "react";
// import './App.css';
// import searchIcon from "./search.svg";
// import MovieCard from "./MovieCard";

// const API_URL = "http://www.omdbapi.com?apikey=b169cf0";

// function App() {
//   const [movies, setMovies] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   const fetchMovies = async (title = "") => {
//     const response = await fetch(`${API_URL}&s=${title}`);
//     const data = await response.json();

//     setMovies(data.Search || []);
//   };

//   const searchMovies = (title) => {
//     setSearchTerm(title);
//     fetchMovies(title);
//   };

//   useEffect(() => {
//     if (searchTerm.trim() === "") {
//       fetchMovies(); // Tampilkan semua film jika searchTerm kosong
//     } else {
//       fetchMovies(searchTerm);
//     }
//   }, [searchTerm]);

//   return (
//     <>
//       <div className="app">
//         <h1>Rating Film</h1>

//         <div className="search">
//           <input
//             placeholder="Cari Film"
//             value={searchTerm}
//             onChange={(e) => searchMovies(e.target.value)}
//           />

//           <img
//             src={searchIcon}
//             alt="search"
//             onClick={() => searchMovies(searchTerm)}
//           />
//         </div>

//         <div className="container">
//           {movies.length > 0 ? (
//             movies.map((movie) => (
//               <MovieCard movie={movie} key={movie.imdbID} />
//             ))
//           ) : (
//             <div className="empty">
//               <h2>
//                 {searchTerm ? "Film tidak ditemukan" : "Memuat semua film..."}
//               </h2>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;
import React, { useState } from 'react';
import FilmList from './components/FilmList';


const App = () => {
  const [selectedFilmId, setSelectedFilmId] = useState(null);

  const handleFilmSelect = (filmId) => {
    setSelectedFilmId(filmId);
  };

  return (
    <div>
      <h1>Movie Rating App</h1>
      <div style={{ display: 'grid' }}>
        <div style={{ width: '100%', padding: '5px' }}>
          <h2>Film List</h2>
          <FilmList onSelectFilm={handleFilmSelect} />
        </div>
        
        <div>
          
        </div>
      </div>
    </div>
  );
};

export default App;
