import React, { useState } from 'react';
import './FilmDetailModal.css'; // Import CSS file for modal

const FilmDetailModal = ({ film, onClose }) => {
  const [rating, setRating] = useState(film.vote_average / 2); // State untuk menyimpan rating yang diinput
  const totalRating = film.vote_count; // Total rating film

  // Fungsi untuk mengonversi rating ke bintang
  const renderStars = () => {
    const stars = [];
    const filledStars = Math.floor(rating); // Jumlah bintang yang diisi penuh
    const hasHalfStar = rating % 1 !== 0; // Apakah ada setengah bintang

    // Tambahkan bintang yang diisi penuh
    for (let i = 0; i < filledStars; i++) {
      stars.push(<span key={i} className="star filled" onClick={() => setRating(i + 1)}>&#9733;</span>);
    }

    // Tambahkan setengah bintang jika ada
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half" onClick={() => setRating(Math.ceil(rating))}>&#9733;</span>);
    }

    // Tambahkan bintang yang kosong hingga jumlah bintang mencapai 5
    while (stars.length < 5) {
      stars.push(<span key={stars.length} className="star" onClick={() => setRating(stars.length + 0.5)}>&#9733;</span>);
    }

    return stars;
  };

  return (
    <div className="film-detail-modal">
  <div className="modal-content">
    <span className="close" onClick={onClose}>&times;</span>
    <div className="film-details">
      <img className="film-poster" src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} alt={film.title} /><h2>{film.title}</h2>
        <div className="film-rating">{renderStars()}</div>
        <p><strong>Sinopsis:</strong> {film.overview}</p>
        <p><strong>Total Rating:</strong> {totalRating}</p>
      <div className="film-info">
        <h2>{film.title}</h2>
        <div className="film-rating">{renderStars()}</div>
        
        <p><strong>Total Rating:</strong> {totalRating}</p>
      </div>
    </div>
  </div>
</div>



  );
};

export default FilmDetailModal;
