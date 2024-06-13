import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Search from './search';
import { URL_POKEMON } from '../api/apiRest';

type HeaderAppProps = {
    onSearch: (pokemonName: string) => void;
    onRandomPokemonGenerated: (pokemonName: string) => void;
};

const HeaderApp: React.FC<HeaderAppProps> = ({ onSearch, onRandomPokemonGenerated }) => {
    const [randomPokemon, setRandomPokemon] = useState('');
    const searchRef = useRef<{ updateValueAndEnter: (newValue: string) => void } | null>(null);

    useEffect(() => {
        fetchRandomPokemon();
    }, []);

    const fetchRandomPokemon = async () => {
        try {
            const response = await axios.get(`${URL_POKEMON}?limit=1000`);
            const data = response.data.results;
            const randomIndex = Math.floor(Math.random() * data.length);
            const randomPokemonName = data[randomIndex].name;
            setRandomPokemon(capitalizeFirstLetter(randomPokemonName));
        } catch (error) {
            console.error('Error fetching random Pokémon:', error);
        }
    };

    const handlePokeballClick = async () => {
        await fetchRandomPokemon();
        if (searchRef.current) {
            searchRef.current.updateValueAndEnter(randomPokemon);
        }
        onSearch(randomPokemon);
        onRandomPokemonGenerated(randomPokemon);
    };

    return (
        <div className="header">
            <div className="imageRotom">
                <img
                    src="https://images.wikidexcdn.net/mwuploads/wikidex/thumb/2/2e/latest/20171012163310/RotomDex_USUL.png/300px-RotomDex_USUL.png"
                    alt="rotom"
                />
            </div>

            <div className="searcher">
                <Search
                    ref={searchRef}
                    onSearch={onSearch}
                    placeholder={`Press the pokeball for a Random Pokémon! `}
                    defaultPokemon={randomPokemon}
                />
            </div>

            <div className="imagePokeBall" onClick={handlePokeballClick}>
                <img src="https://freepngimg.com/thumb/pokemon/37693-6-pokeball-photos.png" alt="pokeball" />
            </div>
        </div>
    );
};

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default HeaderApp;
