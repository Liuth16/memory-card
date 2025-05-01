import { useEffect, useState } from "react";
import Card from "./components/Card";
import Button from "./components/Button";
import "./App.css";
import {
  CreateInitialDeck,
  ExpandDeckInBackground,
} from "./components/CreateDeck";

function App() {
  const [deck, setDeck] = useState([]);

  useEffect(() => {
    CreateInitialDeck()
      .then((firstBatch) => {
        setDeck(firstBatch);
        return ExpandDeckInBackground();
      })
      .catch((error) => {
        console.error("Error initializing deck:", error);
      });
  }, []);

  const handleNewPokemons = () => {
    const fullDeck = JSON.parse(localStorage.getItem("pokemonDeck")) || [];
    if (fullDeck.length < 12) return;

    const shuffled = [...fullDeck].sort(() => 0.5 - Math.random());
    const newDeck = shuffled.slice(0, 12);
    setDeck(newDeck);
  };

  return (
    <>
      <div>
        <Button text={"New Pokemons"} onClick={handleNewPokemons} />
      </div>
      <div className="card-grid">
        {deck.map((pokemon, index) => (
          <Card
            key={index}
            index={index}
            name={pokemon.name}
            image={pokemon.sprite}
          />
        ))}
      </div>
    </>
  );
}

export default App;
