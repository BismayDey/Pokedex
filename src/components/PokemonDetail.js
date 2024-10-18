import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./PokemonDetail.css"; // Assuming you have a separate CSS file for styling

const PokemonDetail = ({ pokemons }) => {
  const { id } = useParams();
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [loading, setLoading] = useState(true);
  const [abilities, setAbilities] = useState([]);
  const [error, setError] = useState(null);
  const pokemon = pokemons.find((p) => p.id === parseInt(id));

  useEffect(() => {
    const fetchEvolutionChain = async () => {
      if (pokemon) {
        try {
          const response = await axios.get(pokemon.species.url);
          const evolutionResponse = await axios.get(
            response.data.evolution_chain.url
          );
          setEvolutionChain(evolutionResponse.data.chain);
          setAbilities(
            pokemon.abilities.map((ability) => ability.ability.name)
          );
        } catch (error) {
          console.error("Error fetching the evolution data:", error);
          setError("Could not fetch evolution data. Please try again later.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchEvolutionChain();
  }, [pokemon]);

  const renderEvolutionChain = (chain) => {
    if (!chain) return null;
    return (
      <div className="evolution-chain">
        <h3>Evolution Cycle</h3>
        <ul>
          <li>
            <img
              src={`https://pokeapi.co/media/sprites/pokemon/${
                chain.species.url.split("/")[6]
              }.png`}
              alt={chain.species.name}
            />
            {chain.species.name.charAt(0).toUpperCase() +
              chain.species.name.slice(1)}
          </li>
          {chain.evolves_to &&
            chain.evolves_to.map((evo) => (
              <li key={evo.species.name}>
                <img
                  src={`https://pokeapi.co/media/sprites/pokemon/${
                    evo.species.url.split("/")[6]
                  }.png`}
                  alt={evo.species.name}
                />
                {evo.species.name.charAt(0).toUpperCase() +
                  evo.species.name.slice(1)}
                {renderEvolutionChain(evo)}
              </li>
            ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="pokemon-detail">
      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : error ? (
        <h2>{error}</h2>
      ) : pokemon ? (
        <>
          <h2>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
          <p>
            Types:{" "}
            {pokemon.types.map((type) => (
              <span key={type.type.name} className={`type ${type.type.name}`}>
                {type.type.name.charAt(0).toUpperCase() +
                  type.type.name.slice(1)}
              </span>
            ))}
          </p>
          <p>Abilities: {abilities.join(", ")}</p>
          {evolutionChain.length > 0 && renderEvolutionChain(evolutionChain)}
          <Link to="/">Back to Pokedex</Link>
        </>
      ) : (
        <h2>Pokémon not found</h2>
      )}
    </div>
  );
};

export default PokemonDetail;
