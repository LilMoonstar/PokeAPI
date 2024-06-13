import React, { useState, useEffect } from 'react';

const URL_POKEMON = "https://pokeapi.co/api/v2/pokemon";

interface TypeBoxProps {
  pokemonId: number;
}

const TypeBox: React.FC<TypeBoxProps> = ({ pokemonId }) => {
  const [types, setTypes] = useState<string[]>([]);

  const typeColors: { [key: string]: { backgroundColor: string; color: string } } = {
    Normal: { backgroundColor: '#D0D2CC', color: '#FFFFFF' },
    Fire: { backgroundColor: '#FC5C00', color: '#FFF41A' },
    Fighting: { backgroundColor: '#C03028', color: '#FFE5AB' },
    Water: { backgroundColor: '#2A79BF', color: '#BFEFFF' },
    Flying: { backgroundColor: '#CEEDFF', color: '#FFFFFF' },
    Grass: { backgroundColor: '#63CB63', color: '#B6FFB6' },
    Poison: { backgroundColor: '#A040A0', color: '#FFB6E7' },
    Electric: { backgroundColor: '#FFF700', color: '#E5B700' },
    Ground: { backgroundColor: '#C18F5D', color: '#583513' },
    Psychic: { backgroundColor: '#D244A7', color: '#FFC4ED' },
    Rock: { backgroundColor: '#B8A038', color: '#FFFFFF' },
    Ice: { backgroundColor: '#BBEEFF', color: '#30B4E0' },
    Bug: { backgroundColor: '#7EC17C', color: '#456544' },
    Dragon: { backgroundColor: '#4C3084', color: '#BFCCFF' },
    Ghost: { backgroundColor: '#535353', color: '#DCDCDC' },
    Dark: { backgroundColor: '#000000', color: '#9C9C9C' },
    Steel: { backgroundColor: '#B1B1B1', color: '#FFFFFF' },
    Fairy: { backgroundColor: '#EE99AC', color: '#FFE4F8' },
  };

  useEffect(() => {
    const fetchPokemonTypes = async () => {
      try {
        const response = await fetch(`${URL_POKEMON}/${pokemonId}`);
        const data = await response.json();
        const typeNames = data.types.map((type: any) => capitalizeFirstLetter(type.type.name));
        setTypes(typeNames);
      } catch (error) {
        console.error("Error fetching Pokémon types:", error);
      }
    };

    const capitalizeFirstLetter = (string: string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    fetchPokemonTypes();
  }, [pokemonId]);

  return (
    <div className="typeContainer">
      <div className="typesGrid">
        {types.map((type, index) => (
          <p
            className='typesIcons'
            key={index}
            style={{
              backgroundColor: typeColors[type]?.backgroundColor || '#FFFFFF',
              color: typeColors[type]?.color || '#000000'
            }}>
            {type}
          </p>
        ))}
      </div>
    </div>
  );
};

export default TypeBox;
