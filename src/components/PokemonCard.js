import React from "react";
import { Link } from "react-router-dom";

const PokemonCard = ({ pokemon }) => {
  return (
    <div className="pokemon-card">
      <Link to={`/pokemon/${pokemon.id}`}>
        <h3>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <p>
          Types:{" "}
          {pokemon.types
            .map((type) => (
              <span key={type.type.name} className={`type ${type.type.name}`}>
                {type.type.name.charAt(0).toUpperCase() +
                  type.type.name.slice(1)}
              </span>
            ))
            .reduce((prev, curr) => [prev, ", ", curr])}
        </p>
      </Link>
    </div>
  );
};

export default PokemonCard;
