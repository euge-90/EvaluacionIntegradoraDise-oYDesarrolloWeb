// Modo oscuro persistente
document.addEventListener('DOMContentLoaded', function() {
    const btnModoOscuro = document.getElementById('btn-modo-oscuro');
    
    // Verificar si hay preferencia guardada
    if (localStorage.getItem('modoOscuro') === 'activado') {
        document.body.classList.add('modo-oscuro');
    }

    // Toggle modo oscuro
    if (btnModoOscuro) {
        btnModoOscuro.addEventListener('click', function() {
            document.body.classList.toggle('modo-oscuro');
            
            if (document.body.classList.contains('modo-oscuro')) {
                localStorage.setItem('modoOscuro', 'activado');
            } else {
                localStorage.setItem('modoOscuro', 'desactivado');
            }
        });
    }

    // Funcionalidad del formulario de contacto
    const formulario = document.getElementById('formulario-contacto');
    const btnLimpiar = document.getElementById('btn-limpiar');

    if (btnLimpiar) {
        btnLimpiar.addEventListener('click', function() {
            formulario.reset();
            limpiarErrores();
        });
    }

    if (formulario) {
        formulario.addEventListener('submit', function(e) {
            e.preventDefault();
            
            limpiarErrores();
            
            let hayErrores = false;
            
            // Validar nombre
            const nombre = document.getElementById('nombre').value.trim();
            if (nombre === '') {
                mostrarError('error-nombre', 'El nombre es obligatorio');
                hayErrores = true;
            }
            
            // Validar edad
            const edad = document.getElementById('edad').value.trim();
            if (edad === '') {
                mostrarError('error-edad', 'La edad es obligatoria');
                hayErrores = true;
            } else if (isNaN(edad) || edad < 1 || edad > 120) {
                mostrarError('error-edad', 'Ingrese una edad válida');
                hayErrores = true;
            }
            
            // Validar email
            const email = document.getElementById('email').value.trim();
            if (email === '') {
                mostrarError('error-email', 'El email es obligatorio');
                hayErrores = true;
            } else if (!validarEmail(email)) {
                mostrarError('error-email', 'El email no es válido');
                hayErrores = true;
            }
            
            // Validar comentario
            const comentario = document.getElementById('comentario').value.trim();
            if (comentario === '') {
                mostrarError('error-comentario', 'El comentario es obligatorio');
                hayErrores = true;
            }
            
            if (!hayErrores) {
                alert('¡Mensaje enviado exitosamente!');
                formulario.reset();
            }
        });
    }
});

function mostrarError(idElemento, mensaje) {
    const elementoError = document.getElementById(idElemento);
    if (elementoError) {
        elementoError.textContent = mensaje;
    }
}

function limpiarErrores() {
    const errores = document.querySelectorAll('.mensaje-error');
    errores.forEach(function(error) {
        error.textContent = '';
    });
}

function validarEmail(email) {
    const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return patron.test(email);
}