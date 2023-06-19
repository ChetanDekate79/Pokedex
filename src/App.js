import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Sidebar from './components/sidebar';
import Topbar from './components/topbar';
const queryClient = new QueryClient();

const App = () => {
  const [bookmarkedPokemon, setBookmarkedPokemon] = useState([]);
  const handleViewBookmarks = () => {
    // Logic to handle viewing the list of saved bookmarks
  };
  return (
    <div>
      {/* <Topbar/> */}
      <Topbar handleViewBookmarks={handleViewBookmarks}  />
      <Sidebar/>
      {/* <SearchPage/> */}
    </div>
  );
};
export default App;
