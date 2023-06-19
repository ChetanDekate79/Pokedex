import React, { useState, useEffect } from 'react';
import './ListingComponent.css';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const ListingComponent = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleCloseDetails = () => {
    setSelectedPokemon(null);
  };

  useEffect(() => {
    fetchPokemonList();
  }, [page]);

  const fetchPokemonList = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${(page - 1) * 10}`
      );
      const data = await response.json();
      setPokemonList(data.results);
    } catch (error) {
      console.log('Error fetching Pokémon list:', error);
    }
    setIsLoading(false);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const getPokemonDetails = async (pokemon) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
      const data = await response.json();
      setSelectedPokemon({ ...pokemon, details: data });
    } catch (error) {
      console.log('Error fetching Pokémon details:', error);
    }
  };

  return (
    <div>
      {/* <h1>Pokémon Listing</h1> */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="pokemon-grid">
          {pokemonList.map((pokemon, index) => (
            <div
              key={index}
              className="pokemon-item"
              onClick={() => getPokemonDetails(pokemon)}
            >
              <img
                className="pokemon-image"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${(page - 1) * 10 + index + 1}.png`}
                alt={pokemon.name}
              />
              <h3 className="pokemon-name">{pokemon.name}</h3>
            </div>
          ))}
        </div>
      )}
      {selectedPokemon && (
        <div className="popup-overlay">
          <div className="popup">
            <button className="close-button" onClick={handleCloseDetails}>
              &times;
            </button>
            <div className="pokemon-details-container">
              <div className="pokemon-header">
                <h2 className="pokemon-name">{selectedPokemon.name}</h2>
              </div>
              <img
                className="pokemon-image"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${selectedPokemon.details.id}.png`}
                alt={selectedPokemon.name}
              />
              <div className="additional-details">
                <div>
                  <strong>Height:</strong> {selectedPokemon.details.height} cm
                </div>
                <div>
                  <strong>Weight:</strong> {selectedPokemon.details.weight} kg
                </div>
                <div>
                  <strong>Abilities:</strong>{' '}
                  {selectedPokemon.details.abilities.map((ability) => ability.ability.name).join(', ')}
                </div>
                <div>
                  <strong>Types:</strong>
                  {selectedPokemon.details.types.map((type) => (
                    <span
                      key={type.type.name}
                      className={`pokemon-type type-${type.type.name}`}
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
       <div className="pagination">
        <button onClick={handlePreviousPage} disabled={page === 1}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <button onClick={handleNextPage}>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default ListingComponent;
