import { useState, useEffect } from 'react';
import { Tabs } from 'antd';

import MovieService from '../../services/movieService';
import { GuestId, GenresList } from '../context/movieContext';
import SearchPage from '../searchPage/searchPage';
import RatedPage from '../ratedPage/ratedPage';

import './App.css';

const App = () => {
  const [sessionId, setSessionId] = useState('');
  const [genreList, setGenreList] = useState([]);

  const movieService = new MovieService();

  useEffect(() => {
    movieService
      .createGuestSession()
      .then((res) => setSessionId(res.guest_session_id))
      .catch((error) => {
        console.error('Error creating guest session:', error);
      });
    movieService
      .getGenres()
      .then((res) => setGenreList(res))
      .catch((e) => console.log(e));
  }, []);

  const tabItems = [
    {
      key: '1',
      label: 'Search',
      children: <SearchPage />,
    },
    {
      key: '2',
      label: 'Rated',
      children: <RatedPage />,
    },
  ];

  return (
    <GuestId.Provider value={sessionId}>
      <GenresList.Provider value={genreList}>
        <div className="app">
          <Tabs defaultActiveKey="1" items={tabItems} />
        </div>
      </GenresList.Provider>
    </GuestId.Provider>
  );
};

export default App;
