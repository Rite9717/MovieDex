import React, { useState, useEffect } from "react";
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
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  // Trigger fade-in animation on page load
  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  const handleChange = (event) => {
    setSelectedMovie(encodeURI(event.target.value));
  };

  return (
    <div className={`min-h-screen bg-gray-900 text-white py-12 px-4 transition-opacity duration-500 ${
      isPageLoaded ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 font-caveat animate-fadeIn">
          Watch Now
        </h1>

        <div className="mb-10 flex flex-col items-center animate-slideInUp">
          {/* Movie Selection Label */}
          <label htmlFor="movie-selector" className="text-xl font-semibold text-gray-300 mb-3 transition-colors duration-200">
            Select Your Movie
          </label>
          
          {/* Movie Selection Dropdown with enhanced transitions */}
          <select
            id="movie-selector"
            onChange={handleChange}
            className="bg-gray-800 text-white text-lg px-5 py-3 rounded-lg border-2 border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none hover:border-gray-600 hover:bg-gray-750 transition-all duration-200 cursor-pointer transform hover:scale-105"
          >
            {movies.map((movie, idx) => (
              <option key={idx} value={movie.url}>
                {movie.name}
              </option>
            ))}
          </select>
        </div>

        {/* HLS Player with smooth transition on movie change */}
        <div className="transition-all duration-300 ease-in-out">
          <HlsPlayer key={selectedMovie} src={selectedMovie} />
        </div>
      </div>
    </div>
  );
};
