import { useEffect, useState } from "react";
import Card from "./components/Card";
import Button from "./components/Button";
import Score from "./components/Score";
import "./App.css";
import {
  CreateInitialDeck,
  ExpandDeckInBackground,
} from "./components/CreateDeck";

function App() {
  const [deck, setDeck] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);

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

  const handleShuffleDeck = () => {
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
  };

  const handleClickedCards = (name) => {
    if (clickedCards.includes(name)) {
      setCurrentScore(0);
      setClickedCards([]);
      handleNewPokemons();
      return;
    }

    setClickedCards((prev) => [...prev, name]);
    console.log(clickedCards.length);
    handleScore();
    handleShuffleDeck();

    if (clickedCards.length >= 11) {
      setClickedCards([]);
      handleNewPokemons();
    }
  };

  const handleScore = () => {
    setCurrentScore((prevScore) => {
      const newScore = prevScore + 1;
      setMaxScore((prevMax) => Math.max(prevMax, newScore));
      return newScore;
    });
  };

  const handleNewPokemons = () => {
    const fullDeck = JSON.parse(localStorage.getItem("pokemonDeck")) || [];
    if (fullDeck.length < 12) return;

    const shuffled = [...fullDeck].sort(() => 0.5 - Math.random());
    const newDeck = shuffled.slice(0, 12);
    setDeck(newDeck);
    setClickedCards([]);
  };

  const handleNewPokemonsButton = () => {
    const fullDeck = JSON.parse(localStorage.getItem("pokemonDeck")) || [];
    if (fullDeck.length < 12) return;

    const shuffled = [...fullDeck].sort(() => 0.5 - Math.random());
    const newDeck = shuffled.slice(0, 12);
    setDeck(newDeck);
    setCurrentScore(0);
    setClickedCards([]);
  };

  return (
    <>
      <div>
        <Button text={"New Pokemons"} onClick={handleNewPokemonsButton} />
        <Button text={"Shuffle Deck"} onClick={handleShuffleDeck} />
      </div>
      <Score currentScore={currentScore} maxScore={maxScore} />
      <div className="card-grid">
        {deck.map((pokemon, index) => (
          <Card
            key={index}
            index={index}
            onClick={() => handleClickedCards(pokemon.name)}
            name={pokemon.name}
            image={pokemon.sprite}
          />
        ))}
      </div>
    </>
  );
}

export default App;
