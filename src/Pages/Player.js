import React, { useState } from "react";
import HlsPlayer from "../components/HlsPlayer";

// Example movie list
const movies = [
  {
    name: "Fantastic Four",
    url: "https://storage.googleapis.com/ritesh_movies/movie/Fantastic four/master.m3u8",
  },
  {
    name: "Conjuring The Last Rites/ Man",
    url: "https://storage.googleapis.com/ritesh_movies/movie/Conjuring The Last Rites/master.m3u8",
  }
];

export const Player = () => {
  const [selectedMovie, setSelectedMovie] = useState(movies[0].url);

  const handleChange = (event) => {
    setSelectedMovie(encodeURI(event.target.value));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f0f0",
        padding: "20px",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Select a Movie</h2>

      {/* Movie Selection Dropdown */}
      <select
        onChange={handleChange}
        style={{
          marginBottom: "30px",
          padding: "10px 15px",
          fontSize: "16px",
          borderRadius: "5px",
        }}
      >
        {movies.map((movie, idx) => (
          <option key={idx} value={movie.url}>
            {movie.name}
          </option>
        ))}
      </select>

      {/* HLS Player */}
      <HlsPlayer src={selectedMovie} />
    </div>
  );
};
