import { useState } from "react";
import Card from "./components/Card";
import "./App.css";
import DoQuery from "./components/DoQuery";

const pokemons = DoQuery(1);

function App() {
  console.log(pokemons);
  return (
    <>
      <div className="card-grid">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </>
  );
}

export default App;
