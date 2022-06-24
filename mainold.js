// const input = document.querySelector("input");
// const button = document.querySelector("button");
const pokemonContainer = document.querySelector(".pokemon-container");

// button.addEventListener("click", (e) => {
//   e.preventDefault();
//   filterPokemon(input.value);
// });
// function filterPokemon(pokemon) {
//   fetch("https://pokeapi.co/api/v2/pokemon/1/")
//     .then((res) => res.json())
//     .then((data) => {
//       createPokemon(data);
//     });
// }
// function getPokemon() {
//   fetch("https://pokeapi.co/api/v2/pokemon?limit=1126");
// }
// function createPokemon(pokemon) {
//   const img = document.createElement("img");
//   img.src = pokemon.sprites.front_default;
//   const h3 = document.createElement("h3");
//   h3.textContent = pokemon.name;
//   const div = document.createElement("div");
//   div.appendChild(img);
//   div.appendChild(h3);
//   pokemonContainer.appendChild(div);
// }
function filterPokemon(pokemon) {
  fetch("https://pokeapi.co/api/v2/pokemon/1/")
    .then((res) => res.json())
    .then((data) => {
      createPokemon(data);
    });
}

function createPokemon(pokemon) {
  const flipCard = document.createElement("div");
  flipCard.classList.add("flip-card");

  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card-container");

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
  //pokemonContainer.appendChild(flipCard);
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
filterPokemon();
