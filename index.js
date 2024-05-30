const pantalla = document.getElementById('pantalla');
const botones = document.querySelectorAll('.btn');

let expresion = [];
let operadorActual = null;
let operadorIngresado = false;

botones.forEach(boton => {
    boton.addEventListener('click', () => {
        const botonActivo = boton.textContent;

        // Formatear pantalla
        if (boton.id === 'clear') {
            pantalla.textContent = '0';
            expresion = [];
            operadorActual = null;
            operadorIngresado = false;
            return;
        }

        // Borrar
        if (boton.id === 'borrar') {
            if (pantalla.textContent.length === 1 || pantalla.textContent === '0') {
                pantalla.textContent = '0';
                expresion = [];
                operadorIngresado = false;
            } else {
                pantalla.textContent = pantalla.textContent.slice(0, -1);
                expresion.pop();
                operadorIngresado = false;
            }
            return;
        }

        // Mostrar números y operadores en pantalla y agregar a la expresión
        if (!isNaN(botonActivo) || botonActivo === '.') {
            if (pantalla.textContent === '0' && botonActivo !== '.') {
                pantalla.textContent = botonActivo;
            } else {
                pantalla.textContent += botonActivo;
            }

            operadorIngresado = false;

            if (operadorActual) {
                if (!expresion[1]) {
                    expresion[1] = botonActivo;
                } else {
                    expresion[1] += botonActivo;
                }
            } else {
                if (!expresion[0]) {
                    expresion[0] = botonActivo;
                } else {
                    expresion[0] += botonActivo;
                }
            }
        } else if (
            (botonActivo === '+' ||
            botonActivo === '-' ||
            botonActivo === 'x' ||
            botonActivo === '%') && !operadorIngresado
        ) {
            // Si ya hay una expresión completa, calcular antes de seguir
            if (expresion.length === 3) {
                calcularExpresion();
            }

            operadorActual = botonActivo;
            pantalla.textContent += botonActivo;
            expresion[2] = operadorActual;
            operadorIngresado = true;
        } else if (botonActivo === '=') {
            calcularExpresion();
            operadorActual = null;
            operadorIngresado = false;
        }
    });
});

// Función para manejar el cálculo de la expresión
function calcularExpresion() {
    let resultado = parseFloat(expresion[0]);
    let num2 = parseFloat(expresion[1]);

    if (isNaN(resultado) || isNaN(num2)) return;

    resultado = realizarOperacion(resultado, num2, expresion[2]);

    pantalla.textContent = resultado;
    expresion = [resultado.toString()]; 
}

// Función para realizar operaciones matemáticas
function realizarOperacion(num1, num2, operador) {
    switch (operador) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case 'x':
            return num1 * num2;
        case '%':
            return num1 / num2;
        default:
            return num1;
    }
}
