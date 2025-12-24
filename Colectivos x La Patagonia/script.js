function mostrarPestania(id) {
    document.querySelectorAll('.tab').forEach(t => t.style.display = 'none');
    document.getElementById(id).style.display = 'block';
}

function pedirClaveUP() {
    const clave = prompt("Ingrese la clave:");
    if (clave === "PUP2026") {
        mostrarPestania("recuento-up");
        cargarPlanillasUP();
    } else {
        alert("Clave incorrecta");
    }
}
