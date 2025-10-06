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
  if (!ramal) return alert("No se seleccionó ningún ramal.");
  ramalSeleccionado = ramal;
  const labelRamal = document.getElementById("ramal-seleccionado");
  if (labelRamal) labelRamal.textContent = "Ramal: " + ramalSeleccionado;
  cerrarMenu('menu-ramales');
  console.log("Ramal seleccionado:", ramalSeleccionado);
}
function seleccionarInterno(interno) {
  if (!interno) return alert("No se seleccionó ningún interno.");
  internoSeleccionado = interno;
  const labelInterno = document.getElementById("interno-seleccionado");
  if (labelInterno) labelInterno.textContent = "Interno: " + internoSeleccionado;
  cerrarMenu('menu-internos');
  console.log("Interno seleccionado:", internoSeleccionado);
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