export default async function DoQuery(id) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const response = await fetch(url);
  if (!response.ok) {
    if (response.status === 400) {
      throw new Error("Invalid request");
    }
    throw new Error(`Response status: ${response.status}`);
  }
  const json = await response.json();
  return json;
}
