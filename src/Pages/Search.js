import { useSearchParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useTitle } from "../hooks/useTitle";
import { Card } from "../components";

export const Search = ({apiPath}) => {
  const [searchParams] = useSearchParams();
  const queryTerm = searchParams.get("q");
  const { data: movies, loading, error } = useFetch(apiPath, queryTerm);

  useTitle(`Search result for ${queryTerm || ""}`);

  return (
    <main>
      <section className="py-7 flex justify-centre justify-self-centre item-centre h-20">
        <p className="text-3xl text-white text-centre dark:text-white text-centre">
          {loading ? "Searching..." : 
            (error ? `Error: ${error}` : 
              (movies && movies.length === 0 ? `No result found for '${queryTerm}'` : `Result for '${queryTerm}'`)
            )
          }
        </p>
      </section>
      <section className="max-w-7xl mx-auto py-7">
        {!loading && !error && (
          <div className="flex justify-start flex-wrap">       
            {movies && movies.map((movie) => (
              <Card key={movie.id} movie={movie} />
            ))}          
          </div>
        )}
      </section>
    </main>
  )
}