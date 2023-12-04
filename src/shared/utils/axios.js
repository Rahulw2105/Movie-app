import axios from "axios";

export const API_KEY = "75ab8c08277c36249a4134aaedb9d822";
const baseUrl = "https://api.themoviedb.org/3";
export const request = {
  fetchUpcoming: `/movie/upcoming?api_key=${API_KEY}&language=en-US`,
  fetchPopular: `/movie/popular?api_key=${API_KEY}&language=en-US`,
  searchMovies: `/search/movie`,
  categoryList: `/genre/movie/list?language=en`,
  genres: `/discover/movie`,
  video: `https://api.themoviedb.org/3/movie/`,
};

export const fetchPopularMovies = (page) => {
  return axios.get(`${baseUrl}${request.fetchPopular}&page=${page}`);
};

export const searchMovies = (serach, page) => {
  return axios.get(`${baseUrl}${request.searchMovies}`, {
    params: { api_key: API_KEY, query: serach, page: page },
  });
};

export const fetchUpcomingMovies = (page) => {
  return axios.get(`${baseUrl}${request.fetchUpcoming}&page=${page}`);
};

export const fetchCategroiesList = (serach, page) => {
  return axios.get(`${baseUrl}${request.categoryList}`, {
    params: { api_key: API_KEY },
  });
};

export const fetchMoviesAccordingToGeneres = (id, page) => {
  return axios.get(`${baseUrl}${request.genres}`, {
    params: { api_key: API_KEY, with_genres: id, page: page },
  });
};

export const fetchVideoForMovie = (movieId) => {
  return axios.get(`${baseUrl}/movie/${movieId}/videos`, {
    params: { api_key: API_KEY },
  });
};
