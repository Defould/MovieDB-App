import { Tabs } from 'antd';

import SearchPage from '../searchPage/searchPage';

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
    },
  ];

  return (
    <div className="app">
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default App;
