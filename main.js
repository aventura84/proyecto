const input = document.querySelector("input");
const button = document.querySelector("button");
const pokemonContainer = document.ct(".pokemon-container");

button.addEventListener("click", (e) => {
  e.preventDefault();
  filterPokemon(input.value);
});
function filterPokemon(pokemon) {
  fetch("https://pokeapi.co/api/v2/pokemon/1/")
    .then((res) => res.json())
    .then((data) => {
      createPokemon(data);
    });
}
function getPokemon() {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=1126");
}
function createPokemon(pokemon) {
  const img = document.createElement("img");
  img.src = pokemon.sprites.front_default;
  const h3 = document.createElement("h3");
  h3.textContent = pokemon.name;
  const div = document.createElement("div");
  div.appendChild(img);
  div.appendChild(h3);
  pokemonContainer.appendChild(div);
}
filterPokemon();
