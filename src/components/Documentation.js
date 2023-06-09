import React from "react";
import "../style/Documentation.css";
import Navbar from "./Navbar";
import pokemonList from "../assets/pokemonList.png";
function Api() {
  return (
    <div className="apiContainer">
      <Navbar />
      <div className="apiWrapper">
        <h1>React Pokémon API Documentation</h1>
        <h2>Project Overview</h2>
        <p>
          This project is a React application that utilizes the Pokémon API to
          display information about different Pokémon. It provides a user
          interface where users can search for Pokémon by name and view details
          such as their abilities, types, and sprites.
        </p>
        <div className="description">
          <h2>Project structure</h2>
          <span>The project follows a typical React folder structure:</span>
          <pre>
            ├── public │ <br />
            └── index.html │ <br />
            ├── src │ <br />
            │ ├── components │ <br />
            │ │ ├── PokemonSearch.js │ <br />
            │ │ └── PokemonDetails.js │ <br />
            │ ├── services │ <br />
            │ │ └── pokemonApi.js │ <br />
            │ ├── App.js │ <br />
            │ ├── index.js │ <br />
            │ └── styles.css │ <br />
            └── package.json
          </pre>
          <p>
            public/index.html: The main HTML file where the React application is
            mounted. src/components: Contains React components used in the
            application. src/components/PokemonSearch.js: A component that
            allows users to search for Pokémon by name.
            src/components/PokemonDetails.js: A component that displays detailed
            information about a selected Pokémon. src/services/pokemonApi.js: A
            service module that handles API requests to the Pokémon API.
            src/App.js: The main application component that manages the overall
            structure and state of the app. src/index.js: The entry point of the
            React application. src/styles.css: CSS file for styling the
            application.
          </p>
        </div>
        <div className="description">
          <h2>Running the Project</h2>
          <ul>
            <li>
              Clone the repository: git clone
              <a href="https://github.com/CedricManuel02/PokemonReactWebApp">link</a>
            </li>
            <li>Navigate to the project directory: cd react-pokemon-api</li>
            <li>Install dependencies: npm install</li>
            <li>Start the development server: npm start</li>
          </ul>
          <p>The project will be accessible at http://localhost:3000.</p>
        </div>
        <div className="description">
          <h2>Conclusion</h2>
          <p>
            This documentation provides an overview of the React Pokémon API
            project structure, component usage, and API integration. It serves
            as a reference for understanding how the project is organized and
            how to use the implemented components. Feel free to customize and
            expand upon this documentation based on your specific project's
            requirements and additional functionality you may have implemented.
          </p>
        </div>
      </div>
    </div>
  );
}
export default Api;
