document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('validar-formulario-9').addEventListener('submit', validarFormulario);
});

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('btnSumar').addEventListener('click', actionSuma);
});

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('btnSumar').addEventListener('click', actionSuma);
    document.getElementById('btnSaludar').addEventListener('click', saludar);
});

const MINIMO_CARACTERES = 3;

function validarFormulario(evento) {
    evento.preventDefault();
    const usuario = document.getElementById('fname').value;
    const apellido = document.getElementById('lname').value;
    const email = document.getElementById('email').value;

    if (usuario.length < MINIMO_CARACTERES) {
        alert('El nombre no es válido');
        return;
    }
    if (apellido.length < MINIMO_CARACTERES) {
        alert('El apellido no es válido');
        return;
    }
    if (email.length < MINIMO_CARACTERES) {
        alert('El email no es válido');
        return;
    }
    if (!email.includes('@')) {
        alert('El email no es válido');
        return;
    }

    alert(enviar(usuario));
}

function actionSuma(evento) {
    evento.preventDefault();
    const num1 = parseInt(document.getElementById('fnumber').value, 10);
    const num2 = parseInt(document.getElementById('snumber').value, 10);
    const result = document.getElementById('resultado');

    result.value = sumar(num1, num2);
}

const enviar = (nombre) => `Hola ${nombre}, el formulario se ha enviado correctamente`;
const saludar = () => alert(`Bienvenido`);
const sumar = (a, b) => a + b;
