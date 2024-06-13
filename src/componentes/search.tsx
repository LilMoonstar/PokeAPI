import React, { useRef, forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import TituloImage from '../componentes/Titulo.png';

type SearchProps = {
    onSearch: (pokemonName: string) => void;
    placeholder: string;
    defaultPokemon: string;
};

const Search = forwardRef(({ onSearch, placeholder, defaultPokemon }: SearchProps, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [searchTerm, setSearchTerm] = useState(defaultPokemon);

    useImperativeHandle(ref, () => ({
        updateValueAndEnter(newValue: string) {
            setSearchTerm(newValue); 
            if (inputRef.current) {
                inputRef.current.value = newValue;
                const event = new KeyboardEvent('keydown', { key: 'Enter' });
                inputRef.current.dispatchEvent(event);
            }
        }
    }));

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
      const trimmedSearchTerm = searchTerm.trim();
      if (trimmedSearchTerm) {
          onSearch(trimmedSearchTerm);
      } else {
          setSearchTerm(''); 
      }
  };
  
  

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                handleSearch();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [searchTerm]);

    return (
        <div className="searchContainer">
            <img
                src={TituloImage}
                alt="titulo"
                className="searchImage"
                title="Creado por Natasha!"
            />
            <p className='parrafoBienvenida'>¡Prueba a buscar por nombre o número!</p>
            <div className="searchBar">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder={placeholder}
                    className="searchInput"
                    value={searchTerm}
                    onChange={handleInputChange}
                />
                <button className="searchButton" onClick={handleSearch}>Buscar</button>
            </div>
        </div>
    );
});

export default Search;
