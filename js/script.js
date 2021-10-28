// Informacion y urls de las APIs
const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";    // Buscar json de pelicula
// ---------------------------------

// Asociacion de contenedores en el html
const main = document.getElementById('main');
const form = document.getElementById('form');
const buscador = document.getElementById("buscador");


// Traer las peliculas desde la API y llamar a la funcion de renderizado

traerPeliculas(APIURL)

async function traerPeliculas(url) {

    const respuesta = await fetch(url);
    const respuestaDatos = await respuesta.json();

    mostrarPeliculas(respuestaDatos.results);
}


// Renderizar peliculas en el index.html


function mostrarPeliculas (peliculas) {

    // Limpiar main
    main.innerHTML = '';

    peliculas.forEach(pelicula => {

        const  { poster_path, title, vote_average, overview } = pelicula;

        const peliculaEl = document.createElement('div');
        peliculaEl.classList.add('pelicula');

        peliculaEl.innerHTML = `<button class="boton">Toca</button>
                                <img class="pelicula-imagen" src="${IMGPATH + poster_path}" alt="${title}">
                                <div class="pelicula-info">
                                    <h3 class="pelicula-h3">${title}</h3>
                                    <div class="span-container">
                                        <span class="${asignarClaseRating(vote_average)}">${vote_average}</span>
                                    </div>
                                </div>
                                <div class="overview">
                                    <h3>${title}</h3>
                                    <h4>Sinopsis:</h4>
                                        ${overview}
                                </div>
                                
        `;

        main.appendChild(peliculaEl);
    });
}


// let botones = document.querySelector('boton');
// botones.addEventListener('onclick', capturarDatos(pelicula));


// Capturar datos y guardar en localStorage

function capturarDatos (e) {                                                                              
                                            
    let peliculaInfo = [];
    peliculaInfo.push(e);

    console.log('Capturado');

    localStorage.setItem('Datos-pelicula', JSON.stringify(peliculaInfo));
    

}


// Asignar colores a las puntajes de las peliculas basadas en su rating

function asignarClaseRating(puntaje) {

if (puntaje >= 8) {
    return "verde";
    
} else if (puntaje >= 5) {
    return "naranja";

} else {
    return "rojo";
}}


// Busqueda en la barra de search

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const busquedaUsuario = buscador.value;

    if (busquedaUsuario) {
        traerPeliculas(SEARCHAPI + busquedaUsuario)
        buscador.value = '';
    }  
});

