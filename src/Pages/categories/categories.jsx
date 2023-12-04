import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchMoviesAccordingToGeneres,
  fetchPopularMovies,
} from "../../shared/utils/axios";
import { MoviesCard } from "../../shared/components/header/movies-card/movies-card";

export const Categories = () => {
  const params = useParams();

  const [moviesData, setMoviesData] = useState();
  const [page, setPage] = useState(1);
  const [id, setId] = useState(1);

  /* effects */

  useEffect(() => {
    setId(params.id);
    fetchMovies(params.id, 2);
  }, [params.id]);

  /* methods */

  const fetchMovies = (id, page) => {
    fetchMoviesAccordingToGeneres(id, page)
      .then((res) => {
        setMoviesData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changePage = (page) => {
    setPage(page);
    fetchMovies(id, page);
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
