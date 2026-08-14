const Estado = (() => {
  const CLAVE_PERFIL = "mv:perfil";
  const CLAVE_PROGRESO = "mv:progreso";
  let perfil = cargar(CLAVE_PERFIL, { nivel: 1, casa: null, radio: true, personaje: true, voz: false, direccion: null });
  let progreso = cargar(CLAVE_PROGRESO, { misiones: {}, galeria: 0, datosMax: 0 });

  function cargar(clave, porDefecto) {
    try {
      const v = JSON.parse(localStorage.getItem(clave));
      return v ? Object.assign({}, porDefect, v) : { ...porDefect };
    } catch (e) { return { ...porDefect }; }
  }

  function guardar() {
    localStorage.setItem(CLAVE_PERFIL, JSON.stringify(perfil));
    localStorage.setItem(CLAVE_PROGRESO, JSON.stringify(progreso));
  }

  function casaActual() {
    if (!perfil.casa) return null;
    return SECTORES_CASA.find(s => s.id === perfil.casa) || null;
  }

  function registrarMision(id, estrellas, errores) {
    const previa = progreso.misiones[id];
    progreso.misiones[id] = {
      estrellas: Math.max(estrellas, previa ? previa.estrellas : 0),
      errores: Math.min(errores, previa ? previa.errores : 99)
    };
    guardar();
  }

  function desbloquearPieza() {
    if (progreso.galeria >= GALERIA_PIEZAS.length) return null;
    progreso.galeria++;
    guardar();
    return GALERIA_PIEZAS[progreso.galeria - 1];
  }

  return { get perfil() { return perfil; }, get progreso() { return progreso; }, guardar, casaActual, registrarMision, desbloquearPieza };
})();

function brindis(msj) {
  const b = document.getElementById("brindis");
  b.textContent = msj;
  b.classList.remove("oculto");
  clearTimeout(brindis._t);
  brindis._t = setTimeout(() => b.classList.add("oculto"), 2600);
}

const UI = (() => {
  const PANTALLAS = ["inicio", "mapa", "datos", "ajustes", "panel"];

  function navegar(destino) {
    const pantalla = (destino === "explorar" || destino === "misiones") ? "mapa" : destino;
    PANTALLAS.forEach(p => document.getElementById("pantalla-" + p).classList.toggle("activa", p === pantalla));
    if (pantalla === "mapa") MapaValdivia.encoger();
  }

  function pintarProgresoInicio() {
    const pr = Estado.progreso;
    const misionesHechas = Object.keys(pr.misiones).length;
    const estrellas = Object.values(pr.misiones).reduce((s, m) => s + m.estrellas, 0);
    document.getElementById("progreso-inicio").innerHTML = `
      <span class="chip">⭐ ${estrellas} estrellas</span>
      <span class="chip">🎯 ${misionesHechas} misiones</span>
      <span class="chip">🏺 ${pr.galeria}/${GALERIA_PIEZAS.length} Galería Valdivia</span>
      <span class="chip">🚨 ${pr.datosMax}% emergencias</span>
    `;
  }

  function pintarGaleria() {
    const g = document.getElementById("galeria");
    g.innerHTML = "";
    GALERIA_PIEZAS.forEach((p, i) => {
      const desbloqueada = i < Estado.progreso.galeria;
      const div = document.createElement("div");
      div.className = "pieza" + (desbloqueada ? "" : " bloqueada");
      div.innerHTML = `
        <div class="emoji">${desbloqueada ? p.emoji : "❓"}</div>
        <b>${desbloqueada ? p.nombre : "Bloqueada"}</b>
        <div>${desbloqueada ? p.dato : "Completa misiones para desbloquear"}</div>
      `;
      g.appendChild(div);
    });
  }

  function pintarAjustes() {
    const p = Estado.perfil;
    document.querySelectorAll(".seg[data-nivel]").forEach(b => {
      b.classList.toggle("activa", Number(b.dataset.nivel) === p.nivel);
    });
    const sel = document.getElementById("sel-casa");
    sel.innerHTML = `<option value="">— Sin configurar —</option>` +
      SECTORES_CASA.map(s => `<option value="${s.id}" ${p.casa === s.id ? "selected" : ""}>${s.nombre}</option>`).join("");
    document.getElementById("btn-radio").textContent = p.radio ? "🔊 Encendida" : "🔇 Apagada";
    document.getElementById("btn-radio").classList.toggle("activa", p.radio);
    document.getElementById("btn-personaje").textContent = p.personaje ? "🦢 Cuelli visible" : "Oculto";
    document.getElementById("btn-personaje").classList.toggle("activa", p.personaje);
    document.getElementById("btn-voz").textContent = p.voz ? "🔊 Encendida" : "🔇 Apagada";
    document.getElementById("btn-voz").classList.toggle("activa", p.voz);
  }

  function certificado() {
    const hechos = Object.keys(Estado.progreso.misiones).length;
    if (hechos < 3) return brindis(`Completa 3 misiones para tu certificado (llevas ${hechos})`);
    const estrellas = Object.values(Estado.progreso.misiones).reduce((s, m) => s + m.estrellas, 0);
    const w = window.open("", "_blank", "width=800,height=600");
    w.document.write(`
      <html><head><title>Certificado · Modo Valdivia</title>
      <style>
        body { font-family: Georgia, serif; text-align:center; padding:60px; color:#1a2b3c; }
        .borde { border:8px double #1a2b3c; padding:40px; }
        h1 { font-size:30px; margin-bottom:6px; }
        .sub { letter-spacing:3px; font-size:12px; color:#8a6d3b; }
        .linea { margin:26px 0; font-size:16px; }
        .firma { margin-top:50px; font-size:13px; color:#556; }
      </style></head><body>
      <div class="borde">
        <div class="sub">MODO VALDIVIA · INSAT · VALDIVIA, CHILE</div>
        <h1>Certificado de Autonomía Urbana</h1>
        <div class="linea">Ha completado <b>${hechos} misiones</b> con <b>${estrellas} estrellas</b>,<br>
        demostrando que conoce su ruta, sus hitos y sus protocolos de emergencia.</div>
        <div class="linea">Conoce los números 131 · 133 · 134 · 147 · 112<br>y sabe qué hacer si se pierde, de día o de noche.</div>
        <div class="firma">Conozco mi ciudad. Sé volver a casa. · ${new Date().toLocaleDateString("es-CL")}</div>
      </div>
      <script>window.print()<\/script>
      </body></html>
    `);
    w.document.close();
  }

  return { navegar, pintarProgresoInicio, pintarGaleria, pintarAjustes, certificado };
})();

(() => {
  document.querySelectorAll("[data-nav]").forEach(b => {
    b.addEventListener("click", () => {
      const destino = b.dataset.nav;
      UI.navegar(destino);
      if (destino === "explorar") Explorar.activar();
      if (destino === "misiones") Mision.activar();
      if (destino === "datos") DatosSeguros.activar();
      if (destino === "ajustes") { UI.pintarAjustes(); UI.pintarGaleria(); }
      UI.pintarProgresoInicio();
    });
  });

  document.getElementById("btn-inicio").addEventListener("click", () => { UI.navegar("inicio"); UI.pintarProgresoInicio(); });

  document.getElementById("btn-capa-evac").addEventListener("click", e => {
    const on = MapaValdivia.alternarCapa("evac");
    e.currentTarget.classList.toggle("activa", on);
    Despachador.decir(on ? MENSAJES_RADIO.evacuacionOn : MENSAJES_RADIO.evacuacionOff);
  });
  document.getElementById("btn-capa-micro").addEventListener("click", e => {
    const on = MapaValdivia.alternarCapa("micros");
    e.currentTarget.classList.toggle("activa", on);
    if (on) Despachador.decir(MENSAJES_RADIO.micros);
  });
  document.getElementById("btn-capa-hitos").addEventListener("click", e => {
    const on = MapaValdivia.alternarCapa("hitos");
    e.currentTarget.classList.toggle("activa", on);
  });

  document.querySelectorAll(".seg[data-nivel]").forEach(b => {
    b.addEventListener("click", () => {
      Estado.perfil.nivel = Number(b.dataset.nivel);
      Estado.guardar();
      UI.pintarAjustes();
      brindis("Nivel " + b.dataset.nivel + " activado");
    });
  });

  document.getElementById("sel-casa").addEventListener("change", e => {
    Estado.perfil.casa = e.target.value || null;
    Estado.guardar();
    const casa = Estado.casaActual();
    brindis(casa ? "Casa configurada: " + casa.nombre : "Casa sin configurar");
  });

  document.getElementById("btn-radio").addEventListener("click", () => {
    Estado.perfil.radio = !Estado.perfil.radio;
    Estado.guardar();
    Despachador.configurar(Estado.perfil);
    UI.pintarAjustes();
  });
  document.getElementById("btn-personaje").addEventListener("click", () => {
    Estado.perfil.personaje = !Estado.perfil.personaje;
    Estado.guardar();
    Despachador.configurar(Estado.perfil);
    UI.pintarAjustes();
  });
  document.getElementById("btn-voz").addEventListener("click", () => {
    Estado.perfil.voz = !Estado.perfil.voz;
    Estado.guardar();
    Despachador.configurar(Estado.perfil);
    UI.pintarAjustes();
  });

  document.getElementById("btn-certificado").addEventListener("click", UI.certificado);

  document.getElementById("btn-reset").addEventListener("click", () => {
    if (confirm("¿Borrar TODO tu progreso, casa y contactos de este dispositivo?")) {
      localStorage.removeItem("mv:perfil");
      localStorage.removeItem("mv:progreso");
      location.reload();
    }
  });

  document.getElementById("modal-fondo").addEventListener("click", e => {
    if (e.target === e.currentTarget) e.currentTarget.classList.add("oculto");
  });

  Despachador.configurar(Estado.perfil);
  UI.pintarProgresoInicio();
  Despachador.decir(MENSAJES_RADIO.bienvenida);

  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
})();
