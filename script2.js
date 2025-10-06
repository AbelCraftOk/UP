import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyDsj9oacJw30X_yezb583uVnKJ_DL1nq7k",
  authDomain: "union-platense-215d9.firebaseapp.com",
  projectId: "union-platense-215d9",
  storageBucket: "union-platense-215d9.firebasestorage.app",
  messagingSenderId: "879693126257",
  appId: "1:879693126257:web:6f6f290bb0835e81bf19d0"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
function webhookDecifrado() {
  const parteA = "http";
  const parteB = "s://discord.c";
  const parteC = "om/api/w";
  const parteD = "eb";
  const parteE = "ho";
  const parteF = "oks";
  const parteG = "/14245584053094";
  const parteH = "31838/gRM_ebBLM";
  const parteI = "O9rBwotyT0H70Nh";
  const parteJ = "W_q98KdiRequ73v";
  const parteK = "AbOs7n_uR6CSlY4CPuPYH-IpKsM9X";
  return parteA + parteB + parteC + parteD + parteE + parteF + parteG + parteH + parteI + parteJ + parteK;
}
let usuarioLogueado = null;
let ramalSeleccionado = null;
let internoSeleccionado = null;
async function register() {
  const user = document.getElementById("user-register").value.trim();
  const clave = document.getElementById("clave-register").value.trim();
  if (!user || !clave) return alert("Complete todos los campos.");
  try {
    const q = query(collection(db, "cuentas"), where("usuario", "==", user));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) return alert("Ese usuario ya existe.");
    await addDoc(collection(db, "cuentas"), {
      usuario: user,
      clave: clave,
      creado_en: new Date().toISOString()
    });
    alert("Cuenta creada correctamente. Ahora puedes loguearte.");
    mostrarPestania('login');
  } catch (err) {
    console.error(err);
    alert("Hubo un problema con la base de datos.");
  }
}
window.register = register;
async function login() {
  const user = document.getElementById("user-login").value.trim();
  const clave = document.getElementById("clave-login").value.trim();
  if (!user || !clave) return alert("Complete todos los campos.");
  try {
    const q = query(collection(db, "cuentas"), where("usuario", "==", user));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return alert("Usuario no encontrado.");
    let cuentaValida = false;
    querySnapshot.forEach(doc => {
      const data = doc.data();
      if (data.clave === clave) cuentaValida = true;
    });
    if (!cuentaValida) return alert("Contraseña incorrecta.");
    usuarioLogueado = user;
    mostrarPestania("chofer");
  } catch (err) {
    console.error(err);
    alert("Hubo un problema con la base de datos.");
  }
}
window.login = login;
async function enviarPlanilla() {
  try {
    const salidaIda = document.getElementById("salida-ida").value.trim();
    const llegadaIda = document.getElementById("llegada-ida").value.trim();
    const salidaVuelta = document.getElementById("salida-vuelta").value.trim();
    const llegadaVuelta = document.getElementById("llegada-vuelta").value.trim();
    const planillasTotal = document.getElementById("planillas-total").value.trim();
    if (!usuarioLogueado) return alert("Debes iniciar sesión.");
    if (!ramalSeleccionado || ramalSeleccionado === "No seleccionado")
      return alert("Debes seleccionar un ramal.");
    if (!internoSeleccionado || internoSeleccionado === "No seleccionado")
      return alert("Debes seleccionar un interno.");
    if (!salidaIda || !llegadaIda || !salidaVuelta || !llegadaVuelta || !planillasTotal)
      return alert("Completa todos los campos antes de enviar la planilla.");
    const datos = {
      chofer: usuarioLogueado,
      interno: internoSeleccionado,
      ramal: ramalSeleccionado,
      salida_ida: salidaIda,
      llegada_ida: llegadaIda,
      salida_vuelta: salidaVuelta,
      llegada_vuelta: llegadaVuelta,
      planillas_total: planillasTotal,
      enviado_en: new Date().toISOString()
    };
    const webhookURL = webhookDecifrado();
    const res = await fetch(webhookURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [{
          title: "📋 Nueva Planilla Enviada",
          color: 16753920,
          fields: [
            { name: "👨‍✈️ Chofer", value: datos.chofer, inline: true },
            { name: "🚌 Interno", value: datos.interno, inline: true },
            { name: "🛣️ Ramal", value: datos.ramal, inline: true },
            { name: "⏱️ Horario IDA", value: `Salida: ${datos.salida_ida}\nLlegada: ${datos.llegada_ida}` },
            { name: "↩️ Horario VUELTA", value: `Salida: ${datos.salida_vuelta}\nLlegada: ${datos.llegada_vuelta}` },
            { name: "📄 Planillas Totales", value: datos.planillas_total, inline: true }
          ],
          footer: { text: "Sistema de Planillas • Unión Platense", icon_url: "https://i.imgur.com/qyRSmTj.png" },
          timestamp: new Date().toISOString()
        }]
      })
    });
    if (!res.ok) throw new Error("Error webhook");
    await addDoc(collection(db, "planillas"), datos);
    mostrarPestania("completado");
    limpiarCampos();
  } catch (err) {
    console.error(err);
    if (err.message.includes("webhook")) alert("Hubo un problema con el webhook");
    else alert("Hubo un problema con la base de datos");
  }
}
window.enviarPlanilla = enviarPlanilla;
function limpiarCampos() {
  document.getElementById("salida-ida").value = "";
  document.getElementById("llegada-ida").value = "";
  document.getElementById("salida-vuelta").value = "";
  document.getElementById("llegada-vuelta").value = "";
  document.getElementById("planillas-total").value = "";
  ramalSeleccionado = null;
  internoSeleccionado = null;
}
window.limpiarCampos = limpiarCampos;
async function verificarChoferYEnviar() {
  try {
    const usuarioActual = usuarioLogueado?.trim();
    if (!usuarioActual) {
      alert("No se detectó tu nombre de usuario.");
      return;
    }
    const choferesRef = collection(db, "choferes");
    const q = query(choferesRef, where("usuario", "==", usuarioActual));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      alert("🚫 Tu no formas parte de la Empresa.");
      return;
    }
    await enviarPlanilla();
  } catch (err) {
    console.error("Error al verificar chofer:", err);
    alert("Hubo un error al verificar tu cuenta. Intenta nuevamente.");
  }
}
window.verificarChoferYEnviar = verificarChoferYEnviar;