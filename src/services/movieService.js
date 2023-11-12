import { format } from 'date-fns';

import placeholderImg from '../sourсes/img-not-found.png';

class MovieService {
  _apiKey = 'ff0e11c17af913017479132882d6e63e';
  _apiBase = 'https://api.themoviedb.org/3/';
  _guestUrl = `authentication/guest_session/new?api_key=${this._apiKey}`;
  _genresUrl = 'genre/movie/list?language=en';

  _options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZjBlMTFjMTdhZjkxMzAxNzQ3OTEzMjg4MmQ2ZTYzZSIsInN1YiI6IjY1M2Y3MjYyNTkwN2RlMDBmZTFmYjhkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B8e-AUoinC9tHoU4rHMU7KwbSBZ9WBeNJ_b1KsOEMx8',
    },
  };

  _transformMovieData = (movie) => {
    const formattedReleaseDate = movie.release_date ? format(new Date(movie.release_date), 'MMMM dd, yyyy') : '';
    const poster_path = movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : placeholderImg;
    const descr = movie.overview ? shortText(movie.overview, 200) : 'Sorry! Text not found! =(';
    const genre_ids = movie.genre_ids;

    function shortText(text, maxLength) {
      if (text.length <= maxLength) {
        return text;
      }

      const lastSpaceIndex = text.lastIndexOf(' ', maxLength);

      if (lastSpaceIndex !== -1) {
        return text.substring(0, lastSpaceIndex) + '...';
      } else {
        return text.substring(0, maxLength) + '...';
      }
    }

    return {
      id: movie.id,
      title: movie.original_title,
      release: formattedReleaseDate,
      genre: genre_ids,
      descr: descr,
      poster: poster_path,
      estimation: movie.vote_average,
    };
  };

  async getData(url, options) {
    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error('Error');
    }
    return await res.json();
  }

  async createGuestSession() {
    const res = await this.getData(`${this._apiBase}${this._guestUrl}`, this._options);
    return res;
  }

  async getGenres() {
    const res = await this.getData(`${this._apiBase}${this._genresUrl}`, this._options)
      .then((response) => response.genres)
      .catch((err) => new Error(err));

    return res;
  }

  async getSearchMovies(input, curPage) {
    const res = await this.getData(
      `${this._apiBase}search/movie?query=${input}&include_adult=false&language=en-US&page=${curPage}`,
      this._options
    );
    if (res.results.length > 0) {
      return [res.total_results, res.results.map(this._transformMovieData)];
    } else {
      return [];
    }
  }

  async rateMovie(guestSessionId, movieId, rating) {
    const rateUrl = `movie/${movieId}/rating?api_key=${this._apiKey}&guest_session_id=${guestSessionId}`;

    const rateOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        value: rating,
      }),
    };

    const res = await this.getData(`${this._apiBase}${rateUrl}`, rateOptions);
    console.log(res);
    return res;
  }

  async getRatedMovies(guestSessionId, curPage = 1) {
    const ratedUrl = `guest_session/${guestSessionId}/rated/movies?api_key=${this._apiKey}&language=en-US&page=${curPage}`;
    const res = await this.getData(`${this._apiBase}${ratedUrl}`, this._options);
    console.log(res);

    if (res.results.length > 0) {
      return [res.total_results, res.results.map(this._transformMovieData)];
    } else {
      return [];
    }
  }
}

export default MovieService;
