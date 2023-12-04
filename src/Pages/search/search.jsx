import { useEffect, useState } from "react";
import { MoviesCard } from "../../shared/components/header/movies-card/movies-card";
import { fetchPopularMovies, searchMovies } from "../../shared/utils/axios";
import axios from "axios";

export const Search = () => {
  const [moviesData, setMoviesData] = useState();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  /* effects */
  useEffect(() => {
    fetchMovies(page);
  }, []);

  /* methods */

  const fetchMovies = (page) => {
    searchMovies(search, page ? page : 1)
      .then((res) => {
        setMoviesData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changePage = (page) => {
    setPage(page);
    fetchMovies(page);
  };

  const handleSearch = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
    fetchMovies();
  };
  return (
    <div>
      <form className="d-flex justify-content-center mb-2">
        <input
          type="text"
          placeholder="Search movie here"
          className="rounded mx-2"
          value={search}
          onChange={handleSearch}
        />
        <button className="btn btn-primary ml-[10px]">Search</button>
      </form>
      <MoviesCard
        {...moviesData}
        page={page}
        pageChanged={(event) => {
          changePage(event);
        }}
      ></MoviesCard>
    </div>
  );
};
