import { useEffect, useState } from "react";
import Card from "./components/Card";
import "./App.css";
import DoQuery from "./components/DoQuery";
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
  return (
    <>
      <div className="card-grid">
        {deck.map((pokemon, index) => (
          <Card key={index} name={pokemon.name} image={pokemon.sprite} />
        ))}
      </div>
    </>
  );
}

export default App;
