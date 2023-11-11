import { createContext } from 'react';

export const GuestId = createContext();
export const GenresList = createContext();

// import { createContext, useContext, useState, useEffect } from 'react';
//
// import MovieService from '../../services/movieService';

// const GenreContext = createContext();
// const { Provider } = GenreContext;

// export function GenreProvider({ children }) {
//   const [genres, setGenres] = useState([]);

//   useEffect(() => {
//     const movieService = new MovieService();
//     movieService
//       .getGenres()
//       .then((data) => {
//         setGenres(data);
//       })
//       .catch((error) => {
//         console.error('Error loading genres:', error);
//       });
//   }, []);

//   return <Provider value={genres}>{children}</Provider>;
// }

// export function useGenres() {
//   return useContext(GenreContext);
// }
