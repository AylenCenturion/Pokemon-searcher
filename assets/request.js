const requestPoke = async (pokemon) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    
  try{
    const response = await fetch(url);
    const data = await response.json();
    return data;
        
  } catch (error){
  }
}
  