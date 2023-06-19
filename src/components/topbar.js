import React, { useState } from 'react';
import './styles/Topbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faList } from '@fortawesome/free-solid-svg-icons';

const Topbar = ({ handleViewBookmarks }) => {
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);

  const handleBookmarksClick = () => {
    setIsBookmarksOpen(!isBookmarksOpen);
    handleViewBookmarks();
  };

  return (
    <div>
    <div className="top-bar">
      <div className="logo-container">
        <img src="pokeball.png" alt="Logo 1" className="logo" />
      </div>
      <div className="title-container">
        <h1 className="title">Pokédex</h1>
      </div>
      
    </div>
  </div>
);
};


export default Topbar;
