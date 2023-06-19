import React, { useState } from 'react';
import './search.css';
import PokemonDetails from './detail';

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [bookmarkedPokemon, setBookmarkedPokemon] = useState([]);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setNotFound(false); // Reset the notFound state
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
      if (response.ok) {
        const data = await response.json();
        setPokemonData(data);
        setShowDetails(false);
      } else {
        setNotFound(true); // Set notFound to true if the response is not successful
      }
    } catch (error) {
      console.log('Error fetching Pokemon data:', error);
    }
    setLoading(false);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePokemonClick = () => {
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  const handleBookmark = () => {
    setBookmarkedPokemon((prevBookmarkedPokemon) => [...prevBookmarkedPokemon, pokemonData]);
  };

  return (
    <>
      <div className="search-container">
        <input type="text" placeholder="Search Pokemon" value={searchTerm} onChange={handleInputChange} />
        <button className="search-button" onClick={handleSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
      {notFound && <div className="pokemon-not-found">Pokemon not found. Please try a different name.</div>}
      {pokemonData && !showDetails && !notFound && (
        <div className="pokemon-info" onClick={handlePokemonClick}>
          <h2 className="pokemon-name">{pokemonData.name}</h2>
          <img
            className="pokemon-image"
            src={pokemonData.sprites.other['official-artwork'].front_default}
            alt={pokemonData.name}
          />
          <div className="pokemon-types">
            {pokemonData.types.map((type) => (
              <span key={type.type.name} className={`pokemon-type type-${type.type.name}`}>
                {type.type.name}
              </span>
            ))}
          </div>
        </div>
      )}
      {showDetails && (
        <div className="popup-overlay">
          <div className="popup">
            <button className="close-button" onClick={handleCloseDetails}>
              &times;
            </button>
            <PokemonDetails pokemonData={pokemonData} />
          </div>
        </div>
      )}
    </>
  );
};

export default SearchComponent;
