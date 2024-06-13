// src/App.tsx

import React, { useState, useCallback } from 'react';
import './App.css';
import axios from 'axios';
import ContentApp from './componentes/content';
import HeaderApp from './componentes/header';

import { URL_POKEMON } from './api/apiRest';
import ArrowLeft from './componentes/arrowLeft';
import ArrowRight from './componentes/arrowRight';

function App() {
  const [pokemonData, setPokemonData] = useState<any>(null);

  const handleSearch = async (pokemonName: string) => {
    try {
      const lowerCasePokemonName = pokemonName.toLowerCase();
      const response = await axios.get(`${URL_POKEMON}/${lowerCasePokemonName}`);
      setPokemonData(response.data);
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
    }
  };

  const handleRandomPokemonGenerated = async (pokemonName: string) => {
    try {
      handleSearch(pokemonName);
    } catch (error) {
      console.error('Error fetching random Pokémon:', error);
    }
  };

  const handleEvolutionSelect = useCallback(async (evolutionName: string) => {
    try {
      const lowerCasePokemonName = evolutionName.toLowerCase();
      const response = await axios.get(`${URL_POKEMON}/${lowerCasePokemonName}`);
      setPokemonData(response.data);
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
    }
  }, []);

  const handleNextPokemon = async () => {
    if (pokemonData && pokemonData.id < 1010) { // Limita el ID máximo a 1010 (ajusta según tus necesidades)
      const nextId = pokemonData.id + 1;
      try {
        const response = await axios.get(`${URL_POKEMON}/${nextId}`);
        setPokemonData(response.data);
      } catch (error) {
        console.error('Error fetching next Pokémon:', error);
      }
    }
  };

  const handlePrevPokemon = async () => {
    if (pokemonData && pokemonData.id > 1) {
      const prevId = pokemonData.id - 1;
      try {
        const response = await axios.get(`${URL_POKEMON}/${prevId}`);
        setPokemonData(response.data);
      } catch (error) {
        console.error('Error fetching previous Pokémon:', error);
      }
    }
  };

  return (
    <div className="pokedexAPI">
      <HeaderApp
        onSearch={handleSearch}
        onRandomPokemonGenerated={handleRandomPokemonGenerated}
      />
      <div className="contenidoFlechas">
        <ArrowLeft onClick={handlePrevPokemon} />
        <ContentApp pokemonData={pokemonData} onEvolutionSelect={handleEvolutionSelect} />
        <ArrowRight onClick={handleNextPokemon} />
      </div>
    </div>
  );
}

export default App;
