// import React, { useState, useEffect } from 'react';
// import './FilmList.css'; // Import CSS file

// const FilmList = () => {
//   const [films, setFilms] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     const fetchFilms = async () => {
//       try {
//         const response = await fetch(
//           `https://api.themoviedb.org/3/movie/popular?api_key=e4f45b69ec117db402e92cfc2ab09332`
//         );
//         if (!response.ok) {
//           throw new Error('Failed to fetch films');
//         }
//         const data = await response.json();
//         setFilms(data.results);
//       } catch (error) {
//         console.error('Error fetching films:', error);
//       }
//     };

//     fetchFilms();
//   }, []);

//   const handleSearch = async () => {
//     try {
//       const response = await fetch(
//         `https://api.themoviedb.org/3/search/movie?api_key=e4f45b69ec117db402e92cfc2ab09332&query=${searchTerm}`
//       );
//       if (!response.ok) {
//         throw new Error('Failed to search films');
//       }
//       const data = await response.json();
//       setFilms(data.results);
//     } catch (error) {
//       console.error('Error searching films:', error);
//     }
//   };

//   return (
//     <div className="film-list-container">
//       <div className="search">
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           placeholder="Search films..."
//         />
//         <button onClick={handleSearch}>Search</button>
//       </div>
//       <div className="container">
//         {films.map((film) => (
//           <div key={film.id} className="movie">
//             <div className="overlay">
//               <h3>{film.title}</h3>
//               <span>{film.release_date}</span>
//             </div>
//             <div>
//               <img src={`https://image.tmdb.org/t/p/w300${film.poster_path}`} alt={film.title} />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FilmList;
import React, { useState, useEffect } from 'react';
import './FilmList.css'; // Import CSS file
import FilmDetailModal from './FilmDetailModal'; // Import FilmDetailModal component

const FilmList = ({ onSelectFilm }) => {
  const [films, setFilms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedFilm, setSelectedFilm] = useState(null); // State untuk menyimpan detail film yang dipilih

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=e4f45b69ec117db402e92cfc2ab09332`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch films');
        }
        const data = await response.json();
        setFilms(data.results);
      } catch (error) {
        console.error('Error fetching films:', error);
      }
    };

    const fetchGenres = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=e4f45b69ec117db402e92cfc2ab09332`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch genres');
        }
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchFilms();
    fetchGenres();
  }, []);

  const handleSearch = async () => {
    if (!searchTerm) {
      setFilms([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=e4f45b69ec117db402e92cfc2ab09332&query=${searchTerm}`
      );
      if (!response.ok) {
        throw new Error('Failed to search films');
      }
      const data = await response.json();
      setFilms(data.results);
    } catch (error) {
      console.error('Error searching films:', error);
    }
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  const filterFilmsByGenre = (films) => {
    if (!selectedGenre) {
      return films;
    }
    return films.filter((film) => film.genre_ids.includes(parseInt(selectedGenre)));
  };

  const filteredFilms = filterFilmsByGenre(films);

  const handleFilmClick = (film) => {
    setSelectedFilm(film); // Set detail film yang dipilih ke state
  };

  const closeModal = () => {
    setSelectedFilm(null); // Menutup modal dengan menghapus detail film yang dipilih dari state
  };

  return (
    <div className="film-list-container">
      <div className="search">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search films..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="filter">
        <select value={selectedGenre} onChange={handleGenreChange}>
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>
      </div>
      <div className="film-poster-container">
        {filteredFilms.map((film) => (
          <div key={film.id} className="film-poster" onClick={() => handleFilmClick(film)}>
            <img src={`https://image.tmdb.org/t/p/w300${film.poster_path}`} alt={film.title} />
            <div className="film-info">
              <span className="film-year">{film.release_date.substring(0, 4)}</span>
              <h3 className="film-title">{film.title}</h3>
            </div>
          </div>
        ))}
      </div>
      {selectedFilm && <FilmDetailModal film={selectedFilm} onClose={closeModal} />} {/* Tampilkan modal jika detail film dipilih */}
    </div>
  );
};

export default FilmList;
