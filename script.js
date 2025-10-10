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

const selectRamal = document.getElementById("select-ramal");
const selectInterno = document.getElementById("select-interno");

selectRamal.addEventListener("change", () => {
  ramalSeleccionado = selectRamal.value;
  console.log("Ramal seleccionado:", ramalSeleccionado);
});

selectInterno.addEventListener("change", () => {
  internoSeleccionado = selectInterno.value;
  console.log("Interno seleccionado:", internoSeleccionado);
});

function limpiarCampos() {
    document.getElementById("salida-ida").value = "";
    document.getElementById("llegada-ida").value = "";
    document.getElementById("salida-vuelta").value = "";
    document.getElementById("llegada-vuelta").value = "";
    document.getElementById("planillas-total").value = "";
    ramalSeleccionado = null;
    internoSeleccionado = null;
}