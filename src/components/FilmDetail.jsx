// import React, { useState, useEffect } from 'react';

// const FilmDetail = ({ filmId }) => {
//   const [film, setFilm] = useState(null);
//   const [rating, setRating] = useState(0);

//   useEffect(() => {
//     const fetchFilmDetail = async () => {
//       try {
//         const response = await fetch(
//           `https://api.themoviedb.org/3/movie/${filmId}?api_key=e4f45b69ec117db402e92cfc2ab09332`
//         );
//         if (!response.ok) {
//           throw new Error('Failed to fetch film detail');
//         }
//         const data = await response.json();
//         setFilm(data);
//       } catch (error) {
//         console.error('Error fetching film detail:', error);
//       }
//     };

//     fetchFilmDetail();
//   }, [filmId]);

//   const handleRate = async () => {
//     try {
//       // Simpan rating film ke API TMDB
//       console.log(`Rating ${film.title}: ${rating}`);
//     } catch (error) {
//       console.error('Error rating film:', error);
//     }
//   };

//   return (
//     <div>
//       {film && (
//         <div>
//           <h2>{film.title}</h2>
//           <p>{film.overview}</p>
//           <p>Release Date: {film.release_date}</p>
//           <p>Rating: {film.vote_average}</p>
//           <input
//             type="number"
//             min="0"
//             max="10"
//             value={rating}
//             onChange={(e) => setRating(parseInt(e.target.value))}
//           />
//           <button onClick={handleRate}>Rate</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FilmDetail;
import React, { useState, useEffect } from 'react';
import './FilmDetail.css'; // Import CSS file

const FilmDetail = ({ filmId }) => {
  const [film, setFilm] = useState(null);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchFilmDetail = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${filmId}?api_key=e4f45b69ec117db402e92cfc2ab09332`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch film detail');
        }
        const data = await response.json();
        setFilm(data);
      } catch (error) {
        console.error('Error fetching film detail:', error);
      }
    };

    fetchFilmDetail();
  }, [filmId]);

  const handleRate = async () => {
    try {
      // Simpan rating film ke API TMDB
      console.log(`Rating ${film.title}: ${rating}`);
    } catch (error) {
      console.error('Error rating film:', error);
    }
  };

  return (
    <div className="film-detail-container">
      {film && (
        <div className="film-detail">
          <h2>{film.title}</h2>
          <p>{film.overview}</p>
          <p>Release Date: {film.release_date}</p>
          <p>Rating: {film.vote_average}</p>
          <input
            type="number"
            min="0"
            max="10"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
          />
          <button onClick={handleRate}>Rate</button>
        </div>
      )}
    </div>
  );
};

export default FilmDetail;
