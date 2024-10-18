import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Pokedex from "./components/Pokedex";
import PokemonDetail from "./components/PokemonDetail";
import axios from "axios";
import "./App.css";

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );
        const results = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const pokemonData = await axios.get(pokemon.url);
            return pokemonData.data;
          })
        );
        setPokemons(results);
      } catch (error) {
        console.error("Error fetching the Pokémon data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  return (
    <Router>
      <div className="app">
        <h1>Pokedex</h1>
        {loading ? (
          <h2>Loading...</h2>
        ) : (
          <Routes>
            <Route path="/" element={<Pokedex pokemons={pokemons} />} />
            <Route
              path="/pokemon/:id"
              element={<PokemonDetail pokemons={pokemons} />}
            />
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default App;
