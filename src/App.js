import './App.css'
import { Routes, Route } from "react-router-dom"
import Main from './components/Main'
import Api from './components/Api'
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Main/> }/>
        <Route path="/api" element={ <Api/> }/>
      </Routes>
    </div>
  );
}

export default App;
