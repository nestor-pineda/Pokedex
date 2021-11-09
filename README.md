# Pokedex
API Fetch for Pokedex project for Upgrade HUB
I've created this Pokedex API fetch as part of the Upgrade Hub program. 

La idea es crear un array con cada nueva promesa que nos da el for loop de los resultados que la API devuelve. Para esto usamos "push".
Luego usamos Promies.all en donde metemos el array con todas las promesas almacenadas.

Promise.all te permite hacer tantos hilos como promesas tengas de resultado y luego las ejecuta todas en paralelo en vez de secuencialmente. Lo que conseguimos con esto es una eficiencia muy buena puesto que devuelve todas las promesas en el tiempo de una.

Cuando acaba el fetch de todas las promesas con Promise.all, .then obtenemos un array con todos los resultados de nuestros objetos.

Para separar cada objeto con su información en el formato que deseamos lo hacemos con el map.

Ahora creamos una función que imprima en el DOM los datos de los resultado de las promesas. Como map devuelve arrays, hacemos un join para convertirlo en string.

En la función fetchPokemon, usamos los parametros offset y limit para acotar el número de pokemos que queremos enseñar por página. Offset delimita desde que número de pokemon empieza el segmento y limit, hasta que pokemon llega el segmento.

Añado un event listener a cada boton “Previous” y “Next” para ir modificando los segmentos con el offset y limit. “Previous” bajará en 9 elementos el offsetmientras que “Next” subirá en 9 elementos el offset.
