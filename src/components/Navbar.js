import logo from "../assets/logo.png"
import { Link } from "react-router-dom";
import CatchingPokemonTwoToneIcon from '@mui/icons-material/CatchingPokemonTwoTone';
import "../style/Navbar.css"

function Navbar(){
 
    return(
        <div className="navbar">
            <nav>
                <div className="logo">
                   <Link to="/"><img src={logo} alt="logo"/></Link>
                </div>
                <ul>
                    <li><Link to="/">Pokémon</Link></li>
                    <li><Link to="/documentation">Documentation</Link></li>
                    <li><a href="#">Dark Mode</a></li>
                </ul>
                <CatchingPokemonTwoToneIcon id="pokeball"/>
            </nav>
           
        </div>
    )
}

export default Navbar;