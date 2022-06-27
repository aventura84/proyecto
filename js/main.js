"use strict";

let pokemons = [];

const buscadorElement = document.forms.buscador;
const nombreElement = buscador.elements.nombre;
const listadoPokemonsUl = document.querySelector("#listadoPokemons");

//documento.getElementById(id_name);
//let limit = 8;
//let offset = 1;
// previous.addEventListener("click", () => {
//   if (offset != 1) {
//     offset -= 9;
//     removeChildNodes(pokemonContainer);
//     fetchPokemons(offset, limit);
//   }
// });
// next.addEventListener("click", () => {
//   offset += 9;
//   removeChildNodes(pokemonContainer);
//   fetchPokemons(offset, limit);
// });

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
    pokemonImg.setAttribute("src", "https://"); // detallePokemon
    const pokemonName = document.createElement("p");
    pokemonName.textContent = pokemon.name;
    pokemonLi.append(pokemonImg);
    pokemonLi.append(pokemonName);
    fragmentPokemon.append(pokemonLi);
  }
  listadoPokemonsUl.append(fragmentPokemon);
}

function createPokemon(pokemon) {
  const flipCard = document.createElement("div");
  flipCard.classList.add("flip-card");

  const cardContainer = document.createElement("div");
  //cardContainer.classList.add("card-container");

  flipCard.appendChild(cardContainer);

  const card = document.createElement("div");
  card.classList.add("pokemon-block");

  const spriteContainer = document.createElement("div");
  spriteContainer.classList.add("img-container");

  const sprite = document.createElement("img");
  sprite.src = pokemon.sprites.front_default;

  spriteContainer.appendChild(sprite);

  const number = document.createElement("p");
  number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

  const name = document.createElement("p");
  name.classList.add("name");
  name.textContent = pokemon.name;

  card.appendChild(spriteContainer);
  card.appendChild(number);
  card.appendChild(name);

  const cardBack = document.createElement("div");
  cardBack.classList.add("pokemon-block-back");

  cardBack.appendChild(progressBars(pokemon.stats));

  cardContainer.appendChild(card);
  cardContainer.appendChild(cardBack);
  pokemonContainer.appendChild(flipCard);
}

function progressBars(stats) {
  const statsContainer = document.createElement("div");
  statsContainer.classList.add("stats-container");

  for (let i = 0; i < 3; i++) {
    const stat = stats[i];

    const statPercent = stat.base_stat / 2 + "%";
    const statContainer = document.createElement("stat-container");
    statContainer.classList.add("stat-container");

    const statName = document.createElement("p");
    statName.textContent = stat.stat.name;

    const progress = document.createElement("div");
    progress.classList.add("progress");

    const progressBar = document.createElement("div");
    progressBar.classList.add("progress-bar");
    progressBar.setAttribute("aria-valuenow", stat.base_stat);
    progressBar.setAttribute("aria-valuemin", 0);
    progressBar.setAttribute("aria-valuemax", 200);
    progressBar.style.width = statPercent;

    progressBar.textContent = stat.base_stat;

    progress.appendChild(progressBar);
    statContainer.appendChild(statName);
    statContainer.appendChild(progress);

    statsContainer.appendChild(statContainer);
  }
  return statsContainer;
}
function removeChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
