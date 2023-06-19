import React, { useState, useEffect } from 'react';
import './detail.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as faBookmarkSolid, faBookmark as faBookmarkRegular } from '@fortawesome/free-solid-svg-icons';

const PokemonDetails = ({ pokemonData }) => {
    const [isBookmarked, setIsBookmarked] = useState(false);
  
    const toggleBookmark = () => {
      setIsBookmarked((prevIsBookmarked) => !prevIsBookmarked);
    };

    useEffect(() => {
        // Here you can add the logic to save the bookmarked state
        // For simplicity, we'll use local storage
        const saveBookmarkToLocalStorage = () => {
          try {
            const savedBookmarks = localStorage.getItem('bookmarks');
            let bookmarks = savedBookmarks ? JSON.parse(savedBookmarks) : [];
    
            if (isBookmarked) {
              // Add the Pokémon data to bookmarks
              bookmarks.push(pokemonData);
            } else {
              // Remove the Pokémon data from bookmarks
              bookmarks = bookmarks.filter((bookmark) => bookmark.id !== pokemonData.id);
            }
    
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
          } catch (error) {
            console.error('Error saving bookmark:', error);
          }
        };
    
        saveBookmarkToLocalStorage();
      }, [isBookmarked, pokemonData]);
    

      useEffect(() => {
        // Here you can add the logic to check if the Pokémon is already bookmarked
        // For simplicity, we'll use local storage
        const checkIfBookmarked = () => {
          try {
            const savedBookmarks = localStorage.getItem('bookmarks');
            const bookmarks = savedBookmarks ? JSON.parse(savedBookmarks) : [];
    
            const isPokemonBookmarked = bookmarks.some((bookmark) => bookmark.id === pokemonData.id);
            setIsBookmarked(isPokemonBookmarked);
          } catch (error) {
            console.error('Error checking bookmark:', error);
          }
        };
    
        checkIfBookmarked();
      }, [pokemonData]);

      if (!pokemonData) {
        return <div>Loading...</div>;
      }
    
      const { name, sprites, height, weight, abilities, types } = pokemonData;
    
    
  return (
    <div className="pokemon-details-container">
        <div className="pokemon-header">
        <h2 className="pokemon-name">{pokemonData.name}</h2>
       
      </div>
      {/* <h2 className="pokemon-name">{pokemonData.name}</h2> */}
      <img className="pokemon-image" src={pokemonData.sprites.other['official-artwork'].front_default} alt={pokemonData.name} />
      <div className="additional-details">
        <div>
          <strong>Height:</strong> {pokemonData.height} cm
        </div>
        <div>
          <strong>Weight:</strong> {pokemonData.weight} kg
        </div>
        <div>
          <strong>Abilities:</strong> {pokemonData.abilities.map((ability) => ability.ability.name).join(', ')}
        </div>
        <div>
          <strong>Types:</strong>
          {pokemonData.types.map((type) => (
            <span key={type.type.name} className={`pokemon-type type-${type.type.name}`}>
              {type.type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
