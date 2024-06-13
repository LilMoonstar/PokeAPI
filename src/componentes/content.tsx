import React, { useState, useEffect } from 'react';
import sleeping from '../componentes/sleeping.png';
import rarecandy from '../componentes/rarecandy.png';
import egg from '../componentes/Egg.png';
import zzz from '../componentes/zzz.png';
import EvolutionBox from './evolutions';
import TypeBox from './types';

type ContentAppProps = {
    pokemonData: any;
    onEvolutionSelect: (evolutionName: string) => void;
};

const ContentApp: React.FC<ContentAppProps> = ({ pokemonData, onEvolutionSelect }) => {
    const [loading, setLoading] = useState(true);
    const [showLoader, setShowLoader] = useState(true);
    const [level, setLevel] = useState(50);
    const [calculatedStats, setCalculatedStats] = useState<any[]>([]);
    const [selectedEvolutionName, setSelectedEvolutionName] = useState<string | null>(null);


    useEffect(() => {
        if (pokemonData) {
            setLoading(true);
            setShowLoader(true);
            setTimeout(() => {
                setLoading(false);
                setShowLoader(false);
            }, 1000);

            setTimeout(() => {
                setShowLoader(false);
            }, 1500);
            setLevel(50);
        } else {
            setLoading(false);
            setShowLoader(false);
        }
    }, [pokemonData]);

    useEffect(() => {
        if (pokemonData) {
            const newCalculatedStats = pokemonData.stats.map((stat: any) => {
                return {
                    ...stat,
                    value: calculateStatValue(stat.base_stat, level, stat.effort)
                };
            });
            setCalculatedStats(newCalculatedStats);
        }
    }, [pokemonData, level]);

    const pokeId = pokemonData?.id?.toString().padStart(3, '0');
    const pokeImage = pokemonData?.sprites?.other['official-artwork']?.front_default;
    const capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const getColorFromValue = (value: number) => {
        if (value >= 255) {
            return '#00AF09';
        } else if (value >= 235) {
            return '#00FF0D';
        } else if (value >= 200) {
            return '#84FF46';
        } else if (value >= 180) {
            return '#8BF620';
        } else if (value >= 140) {
            return '#C8F620';
        } else if (value >= 120) {
            return '#DDFF33';
        } else if (value >= 100) {
            return '#FFF833';
        } else if (value >= 90) {
            return '#FFDB4C';
        } else if (value >= 80) {
            return '#FFAA00';
        } else if (value >= 60) {
            return '#FF8000';
        } else if (value >= 40) {
            return '#EC4F2B';
        } else if (value >= 20) {
            return '#FA2F2F';
        } else if (value >= 10) {
            return '#B82323';
        } else if (value >= 5) {
            return '#760909';
        } else if (value >= 1) {
            return '#380000';
        }
    };

    const handleIncreaseLevel = () => {
        if (level < 100) {
            setLevel(prevLevel => prevLevel + 1);
        }
    };

    const handleDecreaseLevel = () => {
        if (level > 1) {
            setLevel(prevLevel => prevLevel - 1);
        }
    };


    const handleIncrease10Level = () => {
        if (level < 100) {
            setLevel(prevLevel => {
                const nextLevel = prevLevel + 10;
                return nextLevel > 100 ? 100 : nextLevel;
            });
        }
    };

    const handleDecrease10Level = () => {
        if (level > 1) {
            setLevel(prevLevel => {
                const nextLevel = prevLevel - 10;
                return nextLevel < 1 ? 1 : nextLevel;
            });
        }
    };



    const handleRareCandyClick = () => {
        setLevel(100);
    };

    const handlepokeBallClick = () => {
        setLevel(1);
        const newCalculatedStats = pokemonData.stats.map((stat: any) => {
            return {
                ...stat,
                value: calculateStatValue(stat.base_stat, 1, stat.stat.name)
            };
        });
        setCalculatedStats(newCalculatedStats);
    };


    /*He adaptado ligeramente la formula de pokemon de cálculo de estadística eliminando los EVs, IVs y Naturaleza:

    Stat = floor(floor((2 * B + I + E) * L / 100 + 5) * N)

    Además, la fórmula de HP es diferente:

    Stat = floor((2 * B + I + E) * L / 100 + L + 10)

    Podemos asumir valores genéricos para los IVs, EVs y naturaleza.
    
    En este caso contaremos  que los IVs son todos 0, los EVs son todos 0 (lo que significa que no ha sido entrenado en absoluto)
    y una naturaleza  neutra que no suma ni resta a ningún stat.

    Los resultados no son acordes a la realidad, sólo Ilustrativos!!*/

    const calculateStatValue = (baseStat: number, level: number, statName: string) => {
        const floor = (value: number) => Math.floor(value);
        let statValue: number;

        if (statName === "hp") {
            statValue = floor((2 * baseStat + 0 + 0) * level / 100 + level + 10); // Fórmula para HP
        } else {
            statValue = floor(floor((2 * baseStat + 0 + 0) * level / 100 + 5) * 1); // Fórmula para otros stats
        }

        return statValue;
    };

    const handleEvolutionSelect = (selectedEvolutionName: string) => {
        setSelectedEvolutionName(selectedEvolutionName);
        onEvolutionSelect(selectedEvolutionName);
    };

    return (
        <div className="content">
            {loading ? (
                showLoader && (
                    <div className="loader-container">
                        <img src="https://i-1.92sucai.com/2023/8/17/c9ec4e6c-3960-4372-8527-0814fba5dfde.png" alt="loading" className="loading-image" />
                    </div>
                )
            ) : pokemonData ? (
                <div className="contenidoColumna">
                    <div className="pokemonName">
                        <p>{capitalizeFirstLetter(pokemonData.name)}</p>
                    </div>

                    <div className="pokemonDetails">
                        <div className="pokemonGrid">
                            <div className="pokemonItem pokemonImage">
                                <img className='pokemonImage' src={pokeImage} alt={pokemonData.name} />
                            </div>
                            <div className="pokemonItem statsPokemon">
                                <div className="statsPokemon">
                                    <div className="levelArrows">
                                        <button onClick={handleDecrease10Level} disabled={level === 1}>{'<<'}</button>
                                        <button onClick={handleDecreaseLevel} disabled={level === 1}>{'<'}</button>
                                        <img onClick={handlepokeBallClick} className="eggSmallIcon" src={egg} title="Lvl 1" alt="pokeball" /><p className='titlePokemon'>Stats at level {level}</p> <img onClick={handleRareCandyClick} className="rareCandy" src={rarecandy} title="Lvl 100" alt="rarecandy"></img>
                                        <button onClick={handleIncreaseLevel} disabled={level === 100}>{'>'}</button>
                                        <button onClick={handleIncrease10Level} disabled={level === 100}>{'>>'}</button>
                                    </div>
                                    {calculatedStats.map((stat: any, index: number) => (
                                        <div key={index} className="item_stats">
                                            <div className="statgrid">
                                                <span className="statName">{stat.stat.name}</span>
                                                <span className="statValue">{stat.value}</span>
                                            </div>
                                            <div className="fakeProgressBar">
                                                <div className="progressBar" style={{ width: `${(stat.value / 100) * 50}%`, maxWidth: '255px', minWidth: '1px', backgroundColor: getColorFromValue(stat.value), color: 'transparent' }}>.</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="pokemonItem evolucionesPokemon">
                                <div className="evolucionesPokemon">
                                    <EvolutionBox pokemonId={pokeId} onEvolutionSelect={handleEvolutionSelect} />
                                </div>
                            </div>
                            <div className="pokemonItem infoPokemon">
                                <div className="infoPokemon">
                                    <div className='pokemonID'><strong>#{pokeId}</strong></div>
                                    <div><strong>Altura: </strong>{pokemonData.height * 10} cm</div>
                                    <div><strong>Peso:</strong> {pokemonData.weight / 10} kg</div>
                                    <div className="habilidades-poke">
                                        <span><strong>Habilidad/es:  </strong>
                                            {pokemonData?.abilities.map((ability: any, index: number) => (
                                                <React.Fragment key={index}>
                                                    <span>{ability.ability.name}</span>
                                                    {index < pokemonData.abilities.length - 1 && ', '}
                                                </React.Fragment>
                                            ))}
                                        </span>
                                    </div>
                                    <div className="tiposPokemon">
                                        <div><strong>Tipo/s: </strong> <TypeBox pokemonId={pokeId} /></div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            ) : (
                <div className="noSearch">
                    <p>No Pokémon searched for now</p>
                    <img className="zzz" src={zzz} alt="zzz" />
                    <img className="sleeping" src={sleeping} alt="sleeping" />
                </div>
            )}
        </div>
    );
};
export default ContentApp;
