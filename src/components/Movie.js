import React from "react";

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";

const Movie = ({ movie, search, watch }) => {
  const poster =
    movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;

  const favFunction = (e) => {
    search(movie.Title);
  };

  const watchedFunction = (e) => {
    watch(movie.Title);
  };

  return (
    <div className="movie">
      <h2 className="movieTitle">{movie.Title}</h2>
      <div>
        <img
          width="200"
          alt={`The movie titled: ${movie.Title}`}
          src={poster}
        />
      </div>
      <p>{movie.Year}</p>
      <button className="movie-button" onClick={favFunction}>
        Add to Favourites
      </button>
      <button className="movie-button" onClick={watchedFunction}>
        Add to Watched List
      </button>
    </div>
  );
};

export default Movie;
