import React, { useState } from "react";
import PokemonCard from "./PokemonCard";

const Pokedex = ({ pokemons }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    setSearchQuery(""); // Clear search query when type is selected
  };

  const filteredPokemons = pokemons.filter((pokemon) => {
    const matchesType =
      selectedType === "All" ||
      pokemon.types.some((type) => type.type.name === selectedType);
    const matchesQuery = pokemon.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesType && matchesQuery;
  });

  return (
    <div className="pokedex">
      <input
        type="text"
        placeholder="Search Pokémon"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      <select
        onChange={handleTypeChange}
        value={selectedType}
        className="type-filter"
      >
        <option value="All">All Types</option>
        <option value="grass">Grass</option>
        <option value="fire">Fire</option>
        <option value="water">Water</option>
        <option value="bug">Bug</option>
        <option value="normal">Normal</option>
        <option value="electric">Electric</option>
        <option value="ground">Ground</option>
        <option value="fairy">Fairy</option>
        <option value="fighting">Fighting</option>
        <option value="psychic">Psychic</option>
        <option value="rock">Rock</option>
        <option value="ghost">Ghost</option>
        <option value="ice">Ice</option>
        <option value="dragon">Dragon</option>
        {/* Add more types as needed */}
      </select>
      <div className="pokemon-list">
        {filteredPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default Pokedex;
