
import './movieList.scss';

import MovieItem from '../movieItem/movieItem';


const MovieList = ({ moviesData }) => {
    const movieList = moviesData.map(movie => <MovieItem key={movie.id} movie={movie} />);
    console.log(movieList);
    
    return (
        <div className="movie-list">
            {movieList}
        </div>
    )
    
}

export default MovieList;