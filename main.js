const buscar = document.querySelector("#value");
const patron = document.querySelector("#value");

documento.getElementById(id_name);
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
function fetchPokemon(url) {
  fetch(`${url}`)
    .then((res) => res.json())
    .then((data) => {
      createPokemon(data);
    });
}
function fetchPokemons() {
  fetch(`https://pokeapi.co/api/v2/pokemon?limit=1126`)
    .then((res) => res.json())
    .then((data) => {
      fetchPokemon(data.results[0].url);
    });
  let arr = ["ivisaur", "bulbasaur", "grapes", "mango", "orange"];
  var query = "saur";
  filterItems(arr, query);
  console.log;
}

/**
 * Filter array items based on search criteria (query)
 */
//var pokemons = ["ivisaur", "bulbasaur", "grapes", "mango", "orange"];
function filterItems(arr, query) {
  return arr.filter(function (el) {
    return el.toString().toLowerCase().indexOf(query.toLowerCase()) !== -1;
  });
}
//console.log(filterItems(pokemons, "saur")); // ['apple', 'grapes']

function fetchPokemonsc() {
  fetch(`https://pokeapi.co/api/v2/pokemon?limit=1126`)
    .then((res) => res.json())
    .then((data) => {
      filterItems(data.results, "saur");
      fetchPokemon(data.results[0].url);
    });
}
fetchPokemonsc();
// function fetchPokemons(offset, limit) {
//   for (let i = offset; i <= offset + limit; i++) {
//     fetchPokemon(1);
//   }
// }
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
