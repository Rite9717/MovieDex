import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTitle } from "../hooks/useTitle";
import Backup from "../assets/moon.png";
import { API_KEY } from "../config";

export const MovieDetail = () => {
  const params = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useTitle(movie.title || "Movie Details");

  const image = movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : Backup;

  useEffect(() => {
    async function fetchMovie() {
      try {
        setLoading(true);
        const response = await fetch(`https://api.themoviedb.org/3/movie/${params.id}?api_key=${API_KEY}`);
        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }
        const json = await response.json();
        setMovie(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMovie();
  }, [params.id]);

  if (loading) {
    return <main className="text-center py-10">Loading...</main>;
  }

  if (error) {
    return <main className="text-center py-10 text-red-500">Error: {error}</main>;
  }

  return (
    <main className="movie-detail-container bg-gray-900 text-white min-h-screen py-10">
      <div className="container mx-auto bg-gray-800 bg-opacity-90 p-10 rounded-lg shadow-lg">
        <div className="movie-content flex flex-col lg:flex-row items-center lg:items-start gap-10">
          <div className="w-full lg:w-1/3">
            <img className="rounded-lg shadow-md" src={image} alt={movie.title} />
          </div>

          <div className="w-full lg:w-2/3 text-lg">
            <h1 className="font-caveat text-5xl font-bold mb-5">{movie.title}</h1>
            <p className="mb-4 font-caveat text-2xl">{movie.overview}</p>
            {movie.genres && (
              <div className="mb-5 font-caveat text-2xl">
                <h3 className="font-semibold">Genres:</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {movie.genres.map((genre) => (
                    <span key={genre.id} className="border border-gray-500 rounded px-3 py-1">
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Ratings */}
            <div className="flex items-center mb-4 font-caveat text-2xl ">
              <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <title>Rating star</title>
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <p className="ml-2">{movie.vote_average}</p>
              <span className="w-1 h-1 mx-2 bg-gray-500 rounded-full"></span>
              <span>{movie.vote_count} reviews</span>
            </div>

            {/* Movie Information */}
            <div className="space-y-3 font-caveat text-2xl">
              <p>
                <span className="font-semibold">Runtime:</span> {movie.runtime} min
              </p>
              <p>
                <span className="font-semibold">Budget:</span> ${movie.budget?.toLocaleString() || 'N/A'}
              </p>
              <p>
                <span className="font-semibold">Revenue:</span> ${movie.revenue?.toLocaleString() || 'N/A'}
              </p>
              <p>
                <span className="font-semibold">Release Date:</span> {movie.release_date}
              </p>
              <p>
                <span className="font-semibold">IMDB Code:</span>{" "}
                <a href={`https://www.imdb.com/title/${movie.imdb_id}`} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">
                  {movie.imdb_id}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
