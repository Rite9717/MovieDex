import { useState, useEffect } from "react";
import { API_KEY } from "../config";

export const useFetch = (apiPath, queryTerm="") => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const url = `https://api.themoviedb.org/3/${apiPath}?api_key=${API_KEY}&query=${queryTerm}`;

    useEffect(() => {
        async function fetchMovies(){
          try {
            setLoading(true);
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error("Failed to fetch data");
            }
            const json = await response.json();
            setData(json.results || []);
          } catch (err) {
            setError(err.message);
            setData([]);
          } finally {
            setLoading(false);
          }
        }
        fetchMovies();
      }, [url])

  return { data, loading, error }
}