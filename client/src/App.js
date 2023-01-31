import './App.css';
import {  Routes, Route } from 'react-router-dom';
import CodeBlocks from './page/CodeBlocks';
import Lobby from './page/Lobby';
import Nav from './components/Nav';
function App() {
  return (
    <>
    <Nav/>
    <Routes>
    <Route path="/" element={<Lobby/>} />
    <Route path="/CodeBlocks/:id" element={<CodeBlocks />} />
  </Routes>
    </>
  );
}

export default App;
