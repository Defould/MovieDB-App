import { format } from 'date-fns';

class MovieService {
  _apiBase = 'https://api.themoviedb.org/3/search/movie?query=return&include_adult=false&language=en-US&page=1';

  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZjBlMTFjMTdhZjkxMzAxNzQ3OTEzMjg4MmQ2ZTYzZSIsInN1YiI6IjY1M2Y3MjYyNTkwN2RlMDBmZTFmYjhkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B8e-AUoinC9tHoU4rHMU7KwbSBZ9WBeNJ_b1KsOEMx8',
    },
  };

  _transformMovieData = (res) => {
    let formattedReleaseDate;

    if (res.release_date) {
      formattedReleaseDate = format(new Date(res.release_date), 'MMMM dd, yyyy');
    } else {
      formattedReleaseDate = '';
    }

    return {
      id: res.id,
      title: res.original_title,
      release: formattedReleaseDate,
      genre: 'genre',
      descr: res.overview,
      poster: `https://image.tmdb.org/t/p/original${res.poster_path}`,
      estimation: res.vote_average,
    };
  };

  async getMovieData(url, options) {
    const res = await fetch(url, options);

    if(!res.ok) {
      throw new Error('Error')
    }
    return await res.json();
  }

  async getSearchMovies() {
    const res = await this.getMovieData(this._apiBase, this.options);
    return res.results.map(this._transformMovieData);
  }
}


export default MovieService;

//образец ответа
// {
//   "adult": false,
//   "backdrop_path": "/dJ52jV7HlJ9hB8kdBOnj01DllBA.jpg",
//   "genre_ids": [
//     18
//   ],
//   "id": 82520,
//   "original_language": "en",
//   "original_title": "Return",
//   "overview": "Back from a tour of duty, Kelli struggles to find her place in her family and the rust-belt town she no longer recognizes.",
//   "popularity": 11.69,
//   "poster_path": "/xAuR564U2njKKcXSbfbq36rZLeA.jpg", - может быть пустым
//   "release_date": "2011-02-10", - может быть пустым
//   "title": "Return",
//   "video": false,
//   "vote_average": 6.527,
//   "vote_count": 2086
// }
