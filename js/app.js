//VARIABLES
const botonEnviar = document.querySelector('#enviar');
const botonReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');
const email = document.getElementById('email');
const asunto = document.getElementById('asunto');
const mensaje = document.getElementById('mensaje');

const expresionRegular = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


listener();
function listener() {
    document.addEventListener('DOMContentLoaded', iniciar);

    //Campos del formulario

    email.addEventListener('blur', validacion);
    asunto.addEventListener('blur', validacion);
    mensaje.addEventListener('blur', validacion);


    //Mensaje de email enviado
    formulario.addEventListener('submit', mensajeDeEnvio);


    botonReset.addEventListener('submit',resetearFormulario);
}


//FUNCIONES
function iniciar() {
    botonEnviar.disabled = true;
    botonEnviar.classList.add('cursor-not-allowed', 'opacity-50');
};


function validacion(e) {
    if (e.target.value.length > 0) {
        //Eliminar cartel de error
        const error = document.querySelector('p.error');
        if (error) {
            error.remove();
        }

        e.target.classList.add('sin-completar');
        e.target.classList.add('completo');

    } else {
        e.target.classList.add('sin-completar');
        e.target.classList.remove('completo');
        mostrarError('Complete los campos solicitados');
    }




    if (e.target.type === 'email') {

        if (expresionRegular.test(e.target.value)) {
            //Eliminar cartel de error
            const error = document.querySelector('p.error');
            if (error) {
                error.remove();
            }
        } else {
            e.target.classList.add('sin-completar');
            e.target.classList.remove('completo');
            mostrarError('Email no válido');
        }
    }

    if (expresionRegular.test(email.value) && asunto.value !== '' && mensaje.value !== '') {
        botonEnviar.disabled = false;
        botonEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    }

}

function mostrarError(mensaje) {
    const mensajeError = document.createElement('P');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('background');
    mensajeError.classList.add('error');
    const errores = document.querySelectorAll('.error')
    if (errores.length === 0) {
        formulario.appendChild(mensajeError);
    }
}


function mensajeDeEnvio(e){
    e.preventDefault();
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'flex';
    //Despues de 3 segundo se oculta el spinner y se muestra el mensaje
    setTimeout(()=>{
        spinner.style.display = 'none';

        //Mensaje

        const parrafo = document.createElement('P');
        parrafo.textContent = 'Su email fue enviado con exito';
        parrafo.classList.add('mensaje-de-envio');

        formulario.insertBefore(parrafo,spinner);

        setTimeout(() => {
            parrafo.remove();  // se elimina el mensaje de enviado
            resetearFormulario();
        },5500);
    },3000 );
}

//funcion que resetea el formulario

function resetearFormulario(){
    formulario.reset();
    iniciar();
}