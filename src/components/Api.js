import React from "react"
import "../style/Api.css"
import Navbar from "./Navbar";
import pokemonList from "../assets/pokemonList.png"
function Api() {
    return (
        <div className="apiContainer">
            <Navbar />
            <div className="apiWrapper">
                <h1>Getting Started</h1>
                <p>
                    This is a consumption-only API — only the HTTP GET method is available on resources.
                    No authentication is required to access this API, and all resources are fully open and
                    available. Since the move to static hosting in November 2018, rate limiting has been removed
                    entirely, but we still encourage you to limit the frequency of requests to limit our hosting costs.
                </p>
                <div className="getEndpoint">
                    <h2>Pokémon (group)</h2>
                    <p>Abilities provide passive effects for Pokémon in battle or in the overworld. Pokémon have multiple possible abilities but can have only one ability at a time.</p>
                    <span><small>GET</small> https://pokeapi.co/api/v2/pokemon/name or id/ (endpoint)</span>
                    <img src={pokemonList} alt="api-get"/>
                </div>
                <div className="getEndpoint">
                    <h2>Pokémon Species (endpoint)</h2>
                    <p>Abilities provide passive effects for Pokémon in battle or in the overworld. Pokémon have multiple possible abilities but can have only one ability at a time.</p>
                    <span><small>GET</small> https://pokeapi.co/api/v2/pokemon-species/name or id/ (endpoint)</span>
                    <img src={pokemonList} alt="api-get"/>
                </div>
                <div className="getEndpoint">
                    <h2>Genders (endpoint)</h2>
                    <p>Abilities provide passive effects for Pokémon in battle or in the overworld. Pokémon have multiple possible abilities but can have only one ability at a time.</p>
                    <span><small>GET</small> https://pokeapi.co/api/v2/gender/id or name/ (endpoint)</span>
                    <img src={pokemonList} alt="api-get"/>
                </div>
            </div>
        </div>
    )
}
export default Api;