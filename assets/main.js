const input = document.getElementById("idInput")
const button = document.getElementById("submitBtn")
const form = document.querySelector(".formContainer")
const cardsContainer = document.querySelector (".cardsContainer")

let pokemones = JSON.parse(localStorage.getItem("pokemones")) || [];

const saveToLocalStorage = (pokemonList) => {
  localStorage.setItem("pokemones", JSON.stringify(pokemonList))
};

const divideMessure = (original) => {
  const converted = Math.floor(original / 10);
  return converted
}

const multipleMessure = (original) => {
  const converted = Math.floor(original * 10);
  return converted
}

const renderCard = (pokemon) => {
  const pokeImg = pokemon.sprites.front_default
  const pokeType = pokemon.types[0].type.name
  return`
  <div class="card">
    <div class="dataContainer">
      <h3><span>Nombre: </span>${pokemon.name}</h3>
      <h3><span>Tipo: </span>${pokeType}</h3>
      <h3><span>Altura: </span>${multipleMessure(pokemon.height)} cm</h3>
      <h3><span>Peso: </span>${divideMessure(pokemon.weight)} kg</h3>
    </div>
    <div class="imgContainer">
      <img src="${pokeImg}" alt=""/> 
    </div>
    <div class="close" data-id="${pokemon.id}">x</div>
  </div>
  `
}

const renderCards = (pokemonlist) => {
  cardsContainer.innerHTML = pokemonlist.map((pokemon)=> renderCard(pokemon)).join('')
};

const searchPokemon = async (e) => {
  e.preventDefault();
  let searchedPokemon = input.value.trim();
  const field = input.parentElement;
  const textError = field.querySelector("small");
  textError.textContent = '';

  if(searchedPokemon === ''){
    textError.textContent= 'Por favor escriba el número de un Pokemon';
    return
  } 
  const fetchedPokemon = await requestPoke(searchedPokemon);

  if(!fetchedPokemon){
    textError.textContent= 'Ups, ese pokemon no existe, prueba con otro número'
    return
    
  } else if (pokemones.some((pokemon)=> pokemon.id === fetchedPokemon.id)) {
    textError.textContent= 'Ese pokemon ya se encuentra en el listado'
    return
  }

  pokemones =[fetchedPokemon, ...pokemones]
  renderCards(pokemones);
  saveToLocalStorage(pokemones);
  searchedPokemon = '';
}

const removeCard = (e) => {
  if(!e.target.classList.contains("close")) return;
  const filterId = Number(e.target.dataset.id);
  pokemones = pokemones.filter((pokemon)=> pokemon.id !== filterId);
    renderCards(pokemones);
    saveToLocalStorage(pokemones);
}

const init =() =>{
  renderCards(pokemones);
  button.addEventListener("click", searchPokemon);
  cardsContainer.addEventListener("click", removeCard);
}

init();
