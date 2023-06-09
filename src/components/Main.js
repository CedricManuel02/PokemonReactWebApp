import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import Loading from "./Loading";
import Navbar from "./Navbar";
import "../style/Main.css";
import axios from "axios";
function ModalCenter(props) {
  const [pokemon, setPokemon] = useState({});
  const [pokemonInfo, setPokemonInfo] = useState({});
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  useEffect(() => {
    const api1 = `https://pokeapi.co/api/v2/pokemon/${props.id}`;
    const api2 = `https://pokeapi.co/api/v2/pokemon-species/${props.id}`;
    const fetchData = async () => {
      try {
        const [response1, response2] = await Promise.all([
          axios.get(api1),
          axios.get(api2),
        ]);
        const speciesResponse = await axios.get(response1.data.species.url);
        const { evolution_chain } = speciesResponse.data;
        if (evolution_chain) {
          const evolutionResponse = await axios.get(evolution_chain.url);
          const { chain } = evolutionResponse.data;
          const evolutionData = await fetchEvolutionData(chain);
          setEvolutionChain(evolutionData);
        }
        setPokemon(response1.data);
        setPokemonInfo(response2.data);
        setTimeout(() => {
          setDataLoading(false);
        }, 4000);
        setDataLoading(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [props.id]);
  const fetchEvolutionData = async (chain) => {
    const evolutionData = [];
    const fetchPokemon = async (url) => {
      const response = await axios.get(url);
      const { data } = response;
      return data;
    };

    const traverseEvolutionChain = async (evolutionChain) => {
      if (!evolutionChain) return;

      const pokemonData = await fetchPokemon(evolutionChain.species.url);
      evolutionData.push(pokemonData);

      await Promise.all(
        evolutionChain.evolves_to.map(async (evolution) => {
          await traverseEvolutionChain(evolution);
        })
      );
    };

    await traverseEvolutionChain(chain);

    return evolutionData;
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h3 className="d-flex align-items-center">
            <img
              src="https://icon-library.com/images/small-pokeball-icon/small-pokeball-icon-5.jpg"
              className="icon"
            />
            Pokemon #{pokemon.id}
          </h3>
        </Modal.Title>
      </Modal.Header>
      {dataLoading === true ? (
        <div className="loadingText">
          <div class="wobbling-10"></div>
          <p>Who's that Pokémon?...</p>
        </div>
      ) : (
        <div>
          {pokemon.sprites && pokemon.types && pokemon.stats && (
            <div className="modalWrapper">
              <header>
                <figure>
                  <img
                    src={
                      pokemon.sprites["versions"]["generation-v"][
                        "black-white"
                      ]["animated"]["front_default"]
                    }
                    alt={pokemon.id}
                  />
                </figure>
                <h2>{pokemon.name}</h2>
                <div className="types">
                  {pokemon.types.map((type) => (
                    <span key={type.slot} className={type.type.name}>
                      {type.type.name}
                    </span>
                  ))}
                </div>
                <p>{pokemonInfo.flavor_text_entries[0].flavor_text}</p>
              </header>
              <section>
                <div className="desc">
                  <div className="abilities">
                    <h4>Abilities</h4>
                    <span>
                      {pokemon.abilities.map((abilities) => (
                        <label>{abilities.ability.name}</label>
                      ))}
                    </span>
                  </div>
                  <div className="description">
                    <span>
                      <label>Height</label>
                      <p>{`${pokemon.height} mm`}</p>
                    </span>
                    <span>
                      <label>Weight</label>
                      <p>{`${pokemon.weight} kg`}</p>
                    </span>
                  </div>
                  <div className="experiece">
                    <span>
                      <label>Base EXP</label>
                      <p>{`${pokemon.base_experience} XP`}</p>
                    </span>
                  </div>
                </div>
                <div className="stats">
                  <h4>Stats</h4>
                  {pokemon.stats.map((stats) => (
                    <span>
                      <label>
                        {stats.stat.name} {`${stats.base_stat}%`}
                      </label>
                      <div className="range">
                        <div
                          className={`percentage ${stats.stat.name}`}
                          style={{ width: `${stats.base_stat}%` }}
                        ></div>
                      </div>
                    </span>
                  ))}
                </div>
                <div className="evolution">
                  <h4>Evolution Chain</h4>
                  <div className="evolutionContainer">
                    {evolutionChain.map((evolution) => (
                      <div className="evolutionCard" key={evolution.id}>
                        <span>{evolution.id}</span>
                        <img
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${evolution.id}.gif`}
                          alt={evolution.name}
                        />
                        {evolution.name}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}
function Main() {
  const [pokemonList, setPokemonList] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [id, setID] = useState(null);
  const [categories, setCategories] = useState("");
  const [tab, setTab] = useState(false);
  const [type, setType] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const clickTab = () => {
    if (tab) {
      setTab(false);
    } else {
      setTab(true);
    }
  };
  useEffect(() => {
    const getPokemonList = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );
        const { results } = response.data;
        const pokemonList = [];
        for (let i = 0; i < results.length; i++) {
          const getPokemon = await axios.get(results[i].url);
          const pokemonData = getPokemon.data;
          pokemonList.push(pokemonData);
        }
        setPokemonList(pokemonList);
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      } catch (err) {
        console.log(err);
      }
    };
    const getType = async () => {
      const response = await axios.get(`https://pokeapi.co/api/v2/type`);
      const data = response.data;
      console.log(data);
      setType(data);
    };
    getType();
    getPokemonList();
  }, []);
  const getPokemonID = (id) => {
    setID(id);
    setModalShow(true);
  };
  return (
    <div>
      {isLoading === true ? (
        <Loading />
      ) : (
        <div className="main">
          <Navbar />
          <header>
            <h2>What Pokemon are you looking for?</h2>
            <div className="searchContainer">
              <div className="search-bar">
                <SearchIcon />
                <input type="text" placeholder="Search something?" onChange={(e) => setSearchQuery(e.target.value)}/>
              </div>
              <span onClick={clickTab}>
                <TuneIcon />
                {type.results && (
                  <ul className={tab == true ? "dropdown show" : "dropdown"}>
                      <li onClick={(e) => setCategories('')}>
                            all
                       </li>
                    {type.results.map((type) => (
                      <li onClick={(e) => setCategories(type.name)}>
                        {type.name}
                      </li>
                    ))}
                  </ul>
                )}
              </span>
            </div>
          </header>
          <main>
            {pokemonList
              .filter((pokemon) =>
                (categories
                    ? pokemon.types.some((type) => type.type.name === categories)
                    : true) &&
                (searchQuery
                    ? pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
                    : true)
              )
              .map((pokemon) => (
                <div
                  className="card"
                  key={pokemon.id}
                  onClick={(e) => getPokemonID(pokemon.id)}
                >
                  <h4>{pokemon.id}</h4>
                  <figure>
                    <img
                      src={
                        pokemon.sprites["versions"]["generation-v"][
                          "black-white"
                        ]["animated"]["front_default"]
                      }
                      alt={pokemon.id}
                    />
                  </figure>
                  <figcaption>
                    <h3>{pokemon.name}</h3>
                    {pokemon.types.map((type) => (
                      <span key={type.slot} className={type.type.name}>
                        {type.type.name}
                      </span>
                    ))}
                  </figcaption>
                </div>
              ))}
            <ModalCenter
              show={modalShow}
              id={id}
              onHide={() => setModalShow(false)}
            />
          </main>
        </div>
      )}
    </div>
  );
}
export default Main;
