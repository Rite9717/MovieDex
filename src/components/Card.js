import { Link } from "react-router-dom";
import Backup from "../assets/not found.png";

export const Card = ({movie}) => {
  const {id, original_title, overview, poster_path} = movie;
  const image = poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : Backup;
  
  return (
    <div className="font-caveat text-2xl max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-2">
            <Link to={`/movie/${id}`}>
                <div className="w-full h-[750px] overflow-hidden">
                    <img className="rounded-t-lg w-full h-full object-cover" src={image} alt={original_title} />
                </div>
            </Link>
            <div className="p-5">
                <Link to={`/movie/${id}`}>
                    <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{original_title}</h5>
                </Link>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {overview && overview.length > 150 ? `${overview.slice(0, 150)}...` : overview}
                </p>
            </div>
        </div>
  )
}