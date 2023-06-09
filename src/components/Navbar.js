import React, {useState, useEffect} from "react"
import logo from "../assets/logo.png"
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import CatchingPokemonTwoToneIcon from '@mui/icons-material/CatchingPokemonTwoTone';
import "../style/Navbar.css"
import axios from "axios";

function Navbar(){
    const [tab, setTab] = useState(false)
    const [type, setType] = useState([]);

    useEffect(() => {
        const getType = async () => {
            const response = await axios.get(`https://pokeapi.co/api/v2/type`);
            const data = response.data;
            console.log(data);
            setType(data);
        }
        getType();
    }, [])
    const clickTab = () => {
          if(tab){
            setTab(false);
          }
          else{
            setTab(true);
          }
    }
    return(
        <div className="navbar">
            <nav>
                <div className="logo">
                   <Link to="/"><img src={logo} alt="logo"/></Link>
                </div>
                <ul>
                    <li><Link to="/">Pokémon</Link></li>
                    <li><Link to="/api">Api</Link></li>
                    <li><a href="#">Documentation</a></li>
                    <li><a href="#">Dark Mode</a></li>
                </ul>
                <CatchingPokemonTwoToneIcon id="pokeball"/>
            </nav>
            <header>
                <h2>What Pokemon are you looking for?</h2>
                <div className="searchContainer">
                <div className="search-bar">
                <SearchIcon/>
                <input type="text" placeholder="Search something?"/>
                </div>
                <span onClick={clickTab}>
                <TuneIcon/>
                    {type.results &&
                        <ul className={tab == true ? ("dropdown show") : ("dropdown") }>
                        {type.results.map(type => (
                            <li>{type.name}</li>
                        ))}
                        </ul>
                    }
                </span>
                </div>
            </header>
        </div>
    )
}

export default Navbar;