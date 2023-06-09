import './App.css'
import { Routes, Route } from "react-router-dom"
import Main from './components/Main'
import Documentation from './components/Documentation'
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Main/> }/>
        <Route path="/documentation" element={ <Documentation/> }/>
      </Routes>
    </div>
  );
}

export default App;
