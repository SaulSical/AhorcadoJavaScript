// Variables del juego
var palabras = ['gato', 'perro', 'pato', 'leon', 'tigre', 'oso', 'lobo', 'pez'];
var palabraSecreta = '';
var letrasUsadas = [];
var fallos = 0;
var juegoTerminado = false;

// Dibujos del ahorcado
var dibujos = [
    'Selecciona una letra para empezar',
    '   +---+\n   |   |\n       |\n       |\n       |\n       |\n=========',
    '   +---+\n   |   |\n   O   |\n       |\n       |\n       |\n=========',
    '   +---+\n   |   |\n   O   |\n   |   |\n       |\n       |\n=========',
    '   +---+\n   |   |\n   O   |\n  /|   |\n       |\n       |\n=========',
    '   +---+\n   |   |\n   O   |\n  /|\\  |\n       |\n       |\n=========',
    '   +---+\n   |   |\n   O   |\n  /|\\  |\n  /    |\n       |\n=========',
    '   +---+\n   |   |\n   O   |\n  /|\\  |\n  / \\  |\n       |\n========='
];

// Función que inicia un nuevo juego
function nuevoJuego() {
    // Elegir palabra aleatoria
    var numeroAleatorio = Math.floor(Math.random() * palabras.length);
    palabraSecreta = palabras[numeroAleatorio];
    
    // Resetear variables
    letrasUsadas = [];
    fallos = 0;
    juegoTerminado = false;
    
    // Mostrar en consola para verificar
    console.log('Nueva palabra:', palabraSecreta);
    
    // Actualizar la pantalla
    mostrarPalabra();
    crearLetras();
    actualizarContador();
    actualizarDibujo();
    limpiarMensaje();
}

// Mostrar la palabra con guiones bajos
function mostrarPalabra() {
    var palabra = document.getElementById('palabra');
    var textoMostrar = '';
    
    for (var i = 0; i < palabraSecreta.length; i++) {
        var letra = palabraSecreta.charAt(i);
        
        if (letrasUsadas.indexOf(letra) !== -1) {
            textoMostrar += letra + ' ';
        } else {
            textoMostrar += '_ ';
        }
    }
    
    palabra.innerHTML = textoMostrar;
}

// Crear botones de letras
function crearLetras() {
    var contenedor = document.getElementById('letras');
    var abecedario = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    contenedor.innerHTML = '';
    
    for (var i = 0; i < abecedario.length; i++) {
        var letra = abecedario.charAt(i);
        
        var boton = document.createElement('button');
        boton.innerHTML = letra;
        boton.className = 'letra-btn';
        boton.onclick = crearFuncionClick(letra.toLowerCase());
        
        contenedor.appendChild(boton);
    }
}

// Crear función de click para cada letra
function crearFuncionClick(letra) {
    return function() {
        seleccionarLetra(letra);
    };
}

// Función cuando se selecciona una letra
function seleccionarLetra(letra) {
    if (juegoTerminado) return;
    if (letrasUsadas.indexOf(letra) !== -1) return;
    
    letrasUsadas.push(letra);
    
    // Encontrar el botón y deshabilitarlo
    var botones = document.getElementsByClassName('letra-btn');
    for (var i = 0; i < botones.length; i++) {
        if (botones[i].innerHTML.toLowerCase() === letra) {
            botones[i].disabled = true;
            
            if (palabraSecreta.indexOf(letra) !== -1) {
                // Letra correcta
                botones[i].className += ' correcta';
            } else {
                // Letra incorrecta
                botones[i].className += ' incorrecta';
                fallos++;
            }
            break;
        }
    }
    
    // Actualizar todo
    mostrarPalabra();
    actualizarContador();
    actualizarDibujo();
    verificarEstadoJuego();
}

// Actualizar contador de fallos
function actualizarContador() {
    document.getElementById('fallos').innerHTML = fallos;
}

// Actualizar dibujo
function actualizarDibujo() {
    document.getElementById('dibujo').innerHTML = dibujos[fallos];
}

// Limpiar mensaje
function limpiarMensaje() {
    var mensaje = document.getElementById('mensaje');
    mensaje.innerHTML = '';
    mensaje.className = '';
}

// Verificar si ganó o perdió
function verificarEstadoJuego() {
    // Verificar si ganó
    var gano = true;
    for (var i = 0; i < palabraSecreta.length; i++) {
        if (letrasUsadas.indexOf(palabraSecreta.charAt(i)) === -1) {
            gano = false;
            break;
        }
    }
    
    if (gano) {
        document.getElementById('mensaje').innerHTML = '¡GANASTE!';
        document.getElementById('mensaje').className = 'victoria';
        juegoTerminado = true;
        return;
    }
    
    // Verificar si perdió
    if (fallos >= 6) {
        document.getElementById('mensaje').innerHTML = 'PERDISTE. La palabra era: ' + palabraSecreta.toUpperCase();
        document.getElementById('mensaje').className = 'derrota';
        juegoTerminado = true;
    }
}

// Iniciar cuando carga la página
window.onload = function() {
    nuevoJuego();
};