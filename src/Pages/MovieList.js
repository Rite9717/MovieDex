import { useFetch } from "../hooks/useFetch";
import { useTitle } from "../hooks/useTitle";
import { Card } from "../components";

export const MovieList = ({apiPath, title}) => {
  const { data: movies, loading, error } = useFetch(apiPath);
  useTitle(title || "Home");

  return (
    <main>
      <section className="max-w-7xl mx-auto py-7">
        {error && <div className="text-red-500 text-center">Error: {error}</div>}
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="flex justify-start flex-wrap other:justify-evenly">       
            {movies && movies.length > 0 ? (
              movies.map((movie) => (
                <Card key={movie.id} movie={movie} />
              ))
            ) : (
              <div className="text-center w-full">No movies found</div>
            )}          
          </div>
        )}
      </section>
    </main>
  )
}