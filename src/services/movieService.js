import { format } from 'date-fns';

import placeholderImg from '../sourсes/img-not-found.png';

class MovieService {
  _apiBase = 'https://api.themoviedb.org/3/search/movie?';

  _options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZjBlMTFjMTdhZjkxMzAxNzQ3OTEzMjg4MmQ2ZTYzZSIsInN1YiI6IjY1M2Y3MjYyNTkwN2RlMDBmZTFmYjhkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B8e-AUoinC9tHoU4rHMU7KwbSBZ9WBeNJ_b1KsOEMx8',
    },
  };

  _transformMovieData = (res) => {
    const formattedReleaseDate = res.release_date ? format(new Date(res.release_date), 'MMMM dd, yyyy') : '';
    const poster_path = res.poster_path ? `https://image.tmdb.org/t/p/original${res.poster_path}` : placeholderImg;
    const descr = res.overview ? shortText(res.overview, 200) : 'Sorry! Text not found! =(';

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
      id: res.id,
      title: res.original_title,
      release: formattedReleaseDate,
      genre: 'Genre',
      descr: descr,
      poster: poster_path,
      estimation: res.vote_average,
    };
  };

  async getMovieData(url, options) {
    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error('Error');
    }
    return await res.json();
  }

  async getSearchMovies(input, curPage) {
    const res = await this.getMovieData(
      `${this._apiBase}query=${input}&include_adult=false&language=en-US&page=${curPage}`,
      this._options
    );
    if (res.results.length > 0) {
      return res.results.map(this._transformMovieData);
    } else {
      return [];
    }
  }
}

export default MovieService;
