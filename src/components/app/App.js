import { Tabs } from 'antd';

import { GenreProvider } from '../context/GenreContext';
import SearchPage from '../searchPage/searchPage';
import RatedPage from '../ratedPage/ratedPage';

import './App.css';

const App = () => {
  const items = [
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
    <GenreProvider>
      <div className="app">
        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </GenreProvider>
  );
};

export default App;
