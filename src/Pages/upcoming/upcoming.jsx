import { useEffect, useState } from "react";
import {
  fetchPopularMovies,
  fetchUpcomingMovies,
} from "../../shared/utils/axios";
import { MoviesCard } from "../../shared/components/header/movies-card/movies-card";

export const Upcoming = () => {
  const [moviesData, setMoviesData] = useState();
  const [page, setPage] = useState(1);
  /* effects */
  useEffect(() => {
    fetchMovies(page);
  }, []);

  /* methods */

  const fetchMovies = (page) => {
    fetchUpcomingMovies(page ? page : 1)
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
  return (
    <div>
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
