//Variables

const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

//Event Listeners
eventListeners();

function eventListeners() {
    //Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    //Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse( localStorage.getItem('tweets') ) || [];

    console.log(tweets);

    crerHTML();
    })
}       

//Funciones
function agregarTweet(e) {
    e.preventDefault();

    //Textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    //validación
    if(tweet === '') {
        mostrarError('Este Campo no puede ir vacío')
        return; //Previene que se ejecuten más líneas
    }

    const tweetObj = {
        id: Date.now(),
        tweet // = tweet: tweet
    }

    //Añadir al arreglo de tweets
    tweets = [...tweets, tweetObj];


    //Agrega HTML une vez agragado el msj
    crerHTML();

    //Reiniciar el formulario
    formulario.reset();
}

//Mostrar mensaje de error
function mostrarError(error) {
    const mensajeError = document.createElement('P');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //Insertar en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove();
    }, 3000)
}

//Muestra un listado de los tweets
function crerHTML() {

    limpiarHTML();

    if(tweets.length > 0 ) {
        tweets.forEach(tweet => {
            //Agregar un boton de eliminar
            const btnEliminar = document.createElement('A');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            //Añadir la función de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            //Crear el HTML
            const li = document.createElement('LI');

            //añadir el texto
            li.innerText = tweet.tweet

            //Asignar el botón
            li.appendChild(btnEliminar);

            //insertar en el html
            listaTweets.appendChild(li);
        })
    }

    sincronizarStorage();
}
 
//Agrega los tweets actuales a localStorage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));

}

//Elimina un tweet
function borrarTweet(id) {
    tweets = tweets.filter( tweet => tweet.id !== id);

    crerHTML();
}

//Limpiar el HTML
function limpiarHTML() {
    while(listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}