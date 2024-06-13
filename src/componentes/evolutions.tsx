import React, { useState, useEffect } from 'react';

const URL_SPECIES = "https://pokeapi.co/api/v2/pokemon-species";
const URL_POKEMON = "https://pokeapi.co/api/v2/pokemon";

interface EvolutionBoxProps {
  pokemonId: number;
  onEvolutionSelect: (evolutionName: string) => void;
}

interface EvolutionData {
  name: string;
  imageUrl: string;
}

const EvolutionBox: React.FC<EvolutionBoxProps> = ({ pokemonId, onEvolutionSelect }) => {
  const [evolutionChain, setEvolutionChain] = useState<EvolutionData[]>([]);
  const [selectedEvolution, setSelectedEvolution] = useState<EvolutionData | null>(null);

  useEffect(() => {
    const fetchEvolutionChain = async () => {
      try {
        const speciesResponse = await fetch(`${URL_SPECIES}/${pokemonId}`);
        const speciesData = await speciesResponse.json();
        const evolutionChainUrl = speciesData.evolution_chain.url;

        const evolutionResponse = await fetch(evolutionChainUrl);
        const evolutionData = await evolutionResponse.json();

        const evolutionChain: EvolutionData[] = [];
        let currentEvolution = evolutionData.chain;

        do {
          const pokemonName = currentEvolution.species.name;
          const pokemonData = await fetchPokemonData(pokemonName);
          const imageUrl = pokemonData.sprites.other['official-artwork'].front_default;
          evolutionChain.push({ name: pokemonName, imageUrl });

          currentEvolution = currentEvolution.evolves_to[0];
        } while (currentEvolution);

        setEvolutionChain(evolutionChain);

      } catch (error) {
        console.error("Error fetching evolution chain:", error);
      }
    };

    const fetchPokemonData = async (pokemonName: string) => {
      const response = await fetch(`${URL_POKEMON}/${pokemonName}`);
      return response.json();
    };

    fetchEvolutionChain();
  }, [pokemonId]);

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleEvolutionClick = (index: number) => {
    const evolutionName = evolutionChain[index].name;
    setSelectedEvolution(evolutionChain[index]);
    onEvolutionSelect(evolutionName);
  };

  return (
    <div className="evolutionContainer">
      <p className='titlePokemon'>Evolution chain: </p>
      <div className="spriteGrid">
        {evolutionChain.map((evolution, index) => (
          <div key={index} className="spriteItem" onClick={() => handleEvolutionClick(index)}>
            <img src={evolution.imageUrl} alt={`evolution-${index}`} /> 
            <p className='titlePokemon'>{capitalizeFirstLetter(evolution.name)} </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EvolutionBox;
