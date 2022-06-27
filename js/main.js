"use strict";

let pokemons = [];

const buscadorElement = document.forms.buscador;
const nombreElement = buscador.elements.nombre;
const listadoPokemonsUl = document.querySelector("#listadoPokemons");
const pokemonContainer = document.querySelector(".pokemon-container");

const funcSubmit = (event) => {
  event.preventDefault();
  const inputUser = nombreElement.value;
  const filteredPokemons = filterItems(inputUser);
  //console.log("filteredPokemons", filteredPokemons);
  render(filteredPokemons);
};

buscadorElement.addEventListener("submit", funcSubmit);

async function fetchPokemons() {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1126`);
  const data = await res.json();
  return data.results;
}

async function fetchPokemon(url) {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

async function main() {
  pokemons = await fetchPokemons();
  //console.log(pokemons);
}

main();

function filterItems(query) {
  return pokemons.filter((pokemon) => {
    return pokemon.name.startsWith(query);
  });
}

async function render(pokemonsToPrint) {
  const fragmentPokemon = document.createDocumentFragment();
  for (const pokemon of pokemonsToPrint) {
    const detallePokemon = await fetchPokemon(pokemon.url);
    const pokemonLi = document.createElement("li");
    const pokemonImg = document.createElement("img");
    pokemonImg.setAttribute(
      "src",
      "https://pokeapi.co/api/v2/pokemon/${Name}/"
    );
    const pokemonName = document.createElement("p");
    pokemonName.textContent = pokemon.name;
    pokemonLi.append(pokemonImg);
    pokemonLi.append(pokemonName);
    fragmentPokemon.append(pokemonLi);
  }
  listadoPokemonsUl.append(fragmentPokemon);
}

function create(pokemon) {
  const card = document.createElement("div");
  card.classList.add("pokemon-block");

  const spriteContainer = document.createElemenent("dic");
  spriteContainer.classList.add("img-container");

  const sprite = document.createElement("img");
  sprite.src = pokemon.sprites.front_default;

  spriteContainer.appendChild(sprite);

  const number = document.createElement("p");
  number.textContent = "#${pokemon.id.toString().padStart(3,0)}";

  const name = document.createElement("p");
  name.classList.add("name");
  name.textContent = pokemon.name;

  card.appendChild(spriteContainer);
  card.appendChild(number);
  card.appendChild(name);

  pokemonContainer.appendChild(card);
}
