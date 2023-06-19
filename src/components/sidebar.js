import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faList } from '@fortawesome/free-solid-svg-icons';
import './styles/sidebar.css';
import SearchComponent from '../pages/search';
import ListingComponent from '../pages/ListingComponent';
const Sidebar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showListing, setShowListing] = useState(false);

  const handleSearchIconClick = () => {
    setShowSearch(true);
    setShowListing(false);
  };

  const handleListingIconClick = () => {
    setShowSearch(false);
    setShowListing(true);
  };

  return (
    <div className="container">
      <div className="sidebar">
        <div className="sidebar-icon" onClick={handleSearchIconClick}>
          <div className="sidebar-icon-bg">
            <FontAwesomeIcon icon={faSearch} className="sidebar-icon-color" size="2x" />
          </div>
        </div>
        <div className="sidebar-icon" onClick={handleListingIconClick}>
          <div className="sidebar-icon-bg">
            <FontAwesomeIcon icon={faList} className="sidebar-icon-color" size="2x" />
          </div>
        </div>
      </div>
      <div className="content">
        {showSearch && <SearchComponent />}
        {showListing && <ListingComponent />}
      </div>
    </div>
  );
};

export default Sidebar;
