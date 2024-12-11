
//Local Storage y Modal Login
var modalIncioSecion = document.getElementById('inicioSesion');

if (localStorage.getItem('user') != null && localStorage.getItem('clave') != null){
    modalIncioSecion.style.setProperty("--display","none")
}

function uploadLocalstorage(){
    var username = document.getElementById('userName').value
    var contraseña = document.getElementById('password').value
    if(contraseña.length<4){
        alert('la contraseña no es suficientemente larga')
    }else if(username == null || username.length < 3){
        alert('el username es demasiado pequeño')}
        else{
        localStorage.setItem('user', username);
        localStorage.setItem('clave', contraseña);
        modalIncioSecion.style.setProperty("--display","none")
    }
}

//iniciar el cuestionario
var cuestionario = document.getElementById('pregunta')
var preguntas = [
    ['¿Cual es el Jugador con la remera numero 10 de la seleccion argentina?','messi'],
    ['¿Como se los llama a los colores opuestos en la rueda cromatica?', 'complementarios'],
    ['¿Como se llama la universidad del estudiante que presento este programa?', 'maimonides'],
    ['¿Como se llama la ultima serie en la que trabajo Akira Toriyama?', 'dragon ball daima'],
    ['¿que significa HTML? (en ingles)', 'hypertext markup language'],
    ['', 'アルゼンチン']
]
var respuestas = 0;
var respuestasCorrectas = 0;
var hasrespondido = document.getElementById('hasRespondido')

function iniciarTest(){
    var apagar = document.getElementById('queDesaparezca')
    var tecladoGeneral = document.getElementById('tecladogeneral')
    apagar.style.display = 'none'
    tecladoGeneral.removeAttribute('style')
    cuestionario.removeAttribute('style')
    cambioPregunta()
}

function answer(){
    if (buscador.value.toLowerCase() == preguntas[respuestas][1]){
        respuestasCorrectas++;
    }
    respuestas++
    if (respuestas <= 4){
        oracion = [];
        buscador.value = '';
        cambioPregunta()
    } else if(respuestas >= 5){
        respuestas = 5
        oracion = [];
        buscador.value = '';
        hasrespondido.innerHTML = respuestasCorrectas +"/5"
        cuestionario.innerHTML = "gracias por probar este juego"
        mostrarcirculos.style.display = "flex"
        calculateCircles()
    }
    console.log(respuestas + " " + respuestasCorrectas)
}

function cambioPregunta() {
    cuestionario.innerHTML = preguntas[respuestas][0]
}

//Teclado
var teclas = document.querySelectorAll('.tecla');
var buscador = document.getElementById('texto');
var borrar = document.getElementById('eraseAll');
var bloqMayus = document.getElementById('mayusBtn');
var espacio = document.getElementById('spaceBtn');
var borrarUno = document.getElementById('eraseOne');
var enter = document.getElementById('enter');

var oracion = [];

teclas.forEach(letras => {
    letras.addEventListener('click', () =>{
        buscador.value += letras.innerText
        oracion = buscador.value.split('')
    })
})

borrar.addEventListener('click', () =>{
    oracion = [];
    buscador.value = '';
})

borrarUno.addEventListener('click', () =>{
    oracion.pop()
    buscador.value = oracion.join('')
})

espacio.addEventListener('click', () =>  {
    buscador.value += ' '
    oracion.push(' ')
})

bloqMayus.addEventListener('click', () =>{
    teclas.forEach(letras =>{
        letras.classList.toggle('mayus')
    })
})


//Circulos
var circuloderespuestas = document.getElementById('respuestas')
var mostrarcirculos = document.getElementById('circles')

function calculateCircles (){
    var resultado = respuestasCorrectas*20
    drawCircle(resultado)
}

function drawCircle(cantidad){
    circuloderespuestas.style.setProperty('--atinadas',  cantidad +' 100')

}

//slider de nota

var notaFinal = document.getElementById('nota')
var slider = document.getElementById('rango')
slider.oninput = (() =>{
    var cuantovale = slider.value;
    notaFinal.innerHTML = cuantovale
})