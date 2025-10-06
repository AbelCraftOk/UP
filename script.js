let usuarioLogueado = null;
let ramalSeleccionado = null;
let internoSeleccionado = null;

function mostrarPestania(id) {
    document.querySelectorAll('.pestania').forEach(p => p.style.display = 'none');
    document.getElementById(id).style.display = 'flex';
}

function mostrarMenu(id) {
    document.getElementById(id).style.display = 'block';
}

function cerrarMenu(id) {
    document.getElementById(id).style.display = 'none';
}

function seleccionarRamal(ramal) {
    ramalSeleccionado = ramal;
    alert("Ramal seleccionado: " + ramal);
    cerrarMenu('menu-ramales');
}

function seleccionarInterno(interno) {
    internoSeleccionado = interno;
    alert("Interno seleccionado: " + interno);
    cerrarMenu('menu-internos');
}

function limpiarCampos() {
    document.getElementById("salida-ida").value = "";
    document.getElementById("llegada-ida").value = "";
    document.getElementById("salida-vuelta").value = "";
    document.getElementById("llegada-vuelta").value = "";
    document.getElementById("planillas-total").value = "";
    ramalSeleccionado = null;
    internoSeleccionado = null;
}