"use strict";
const pokedex = document.getElementById("pokedex");
const previous = document.getElementById("previous");
const next = document.getElementById("next");

let offset = 1;
let limit = 11;

const fetchPokemon = (offset, limit) => {
  const promises = [];
  for (let i = offset; i <= offset + limit; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((res) => res.json()));
  }
  Promise.all(promises).then((results) => {
    const pokemon = results.map((result) => ({
      name: result.name,
      image: result.sprites["front_default"],
      type: result.types.map((type) => type.type.name).join(", "),
      id: result.id,
    }));
    displayPokemon(pokemon);
  });
};

const displayPokemon = (pokemon) => {
  const pokemonHTMLString = pokemon
    .map(
      (pokeman) => `
        <li class="card">
            <img class="card-image" src="${pokeman.image}"/>
            <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
            <p class="card-subtitle">Type: ${pokeman.type}</p>
        </li>
    `
    )
    .join("");
  pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon(offset, limit);

previous.addEventListener("click", () => {
  if (offset != 1) {
    offset -= 12;
    fetchPokemon(offset, limit);
  }
});

next.addEventListener("click", () => {
  offset += 12;
  fetchPokemon(offset, limit);
});

// la idea es crear un array con cada nueva promesas que nos da el for loop de los resultados que la api devuelve. Para esto usamos "push".
// Luego usamos Promies.all en donde metemos el array con todas las promesas almacenadas.
// Promise.all te permite hacer tantos hilos como promesas tengas de resultado y luego las ejecuta todas en paralelo en vez de secuencialmente. Lo que conseguimos con esto es una eficiencia muy buena puesto que devuelve todas las promesas en el tiempo de una.
// Cuando acaba el fetch de todas las promesas con Promise.all, .then obtenemos un array con todos los resultados de nuestros objetos.
// Para separar cada objeto con su información en el formato que deseamos lo hacemos con el map.

// ahora creamos una funcion que imprima en el DOM los datos de los resultado de las promesas. Como map devuelve arrays, hacemos un join para concertirlo en string.

// En la funcion fetchPokemon, usamos los parametros offset y limit para acotar el número de pokemos que queremos enseñar por página. Offset delimita desde que número de pokemon empieza el segmento y limit, hasta que pokemon llega el segmento.

// Añado un event listener a cada boton previous y next para ir modificando los segmentos con el offset y limit. Previous bajará en 9 elementos el offset.Next subira en 9 elementos el offset.
