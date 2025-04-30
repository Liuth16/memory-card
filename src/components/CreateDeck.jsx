import DoQuery from "./DoQuery";

const DECK_KEY = "pokemonDeck";
const MAX_POKEMON = 108;
const BATCH_SIZE = 12;

async function CreateInitialDeck() {
  const storedDeck = localStorage.getItem(DECK_KEY);
  const currentDeck = storedDeck ? JSON.parse(storedDeck) : [];

  if (currentDeck.length >= BATCH_SIZE) {
    return currentDeck.slice(0, 12);
  }

  const nextIdStart = currentDeck.length + 1;
  const nextIdEnd = Math.min(nextIdStart + BATCH_SIZE - 1, MAX_POKEMON);

  const newPokemons = await fetchBatch(nextIdStart, nextIdEnd);

  const updatedDeck = [...currentDeck, ...newPokemons];
  localStorage.setItem(DECK_KEY, JSON.stringify(updatedDeck));
  return updatedDeck.slice(0, 12);
}

async function ExpandDeckInBackground() {
  let storedDeck = localStorage.getItem(DECK_KEY);
  let currentDeck = storedDeck ? JSON.parse(storedDeck) : [];
  while (currentDeck.length < MAX_POKEMON) {
    const nextIdStart = currentDeck.length + 1;
    const nextIdEnd = Math.min(nextIdStart + BATCH_SIZE - 1, MAX_POKEMON);
    const newPokemons = await fetchBatch(nextIdStart, nextIdEnd);
    currentDeck = [...currentDeck, ...newPokemons];
    localStorage.setItem(DECK_KEY, JSON.stringify(currentDeck));
  }
}

async function fetchBatch(startId, endId) {
  const promises = [];
  for (let id = startId; id <= endId; id++) {
    promises.push(
      DoQuery(id).then((data) => ({
        name: data.name,
        sprite: data["sprites"]["other"]["official-artwork"]["front_default"],
      }))
    );
  }

  const results = await Promise.allSettled(promises);
  return results
    .filter((res) => res.status === "fulfilled")
    .map((res) => res.value);
}

export { CreateInitialDeck, ExpandDeckInBackground };
