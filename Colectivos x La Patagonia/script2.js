const firebaseConfig = {
  apiKey: "AIzaSyDdylrEMOUfG53zXRL2QD3VtG8y3l8jdJg",
  authDomain: "colectivosxlapatagonia.firebaseapp.com",
  projectId: "colectivosxlapatagonia",
  storageBucket: "colectivosxlapatagonia.firebasestorage.app",
  messagingSenderId: "595893810594",
  appId: "1:595893810594:web:d3dc12f02fae2cae24eefb"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

function cargarPlanillasUP() {
    const tbody = document.getElementById("tabla-up");
    tbody.innerHTML = "";

    db.ref("planillasUP").once("value", snap => {
        snap.forEach(child => {
            const d = child.val();

            const i1 = d.interno1 || 0;
            const i2 = d.interno2 || 0;
            const i3 = d.interno3 || 0;

            const total = i1 + i2 + i3;
            const lineas = [d.linea1, d.linea2, d.linea3].filter(l => l).join(", ");

            tbody.innerHTML += `
                <tr>
                    <td>${d.chofer}</td>
                    <td>${i1}</td>
                    <td>${i2 || "NO ASIGNADO"}</td>
                    <td>${i3 || "NO ASIGNADO"}</td>
                    <td>${total}</td>
                    <td>${lineas}</td>
                </tr>
            `;
        });
    });
}

function cargarPlanillaUP() {
    const data = {
        chofer: document.getElementById("chofer-name").value,
        interno1: Number(document.getElementById("interno-1").value),
        interno2: Number(document.getElementById("interno-2").value),
        interno3: Number(document.getElementById("interno-3").value),
        linea1: document.getElementById("linea-1").value,
        linea2: document.getElementById("linea-2").value,
        linea3: document.getElementById("linea-3").value
    };

    db.ref("planillasUP").push(data);
    alert("Planilla cargada correctamente");
}
