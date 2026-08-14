const PanelDocente = (() => {
  const CLAVE_ALUMNOS = "mv:docente:alumnos";
  const PREFIJO = "MV1";
  const MODAL = document.getElementById("modal");
  const FONDO = document.getElementById("modal-fondo");

  function idAnonimo() {
    let id = localStorage.getItem("mv:aid");
    if (!id) {
      id = "J" + Math.random().toString(16).slice(2, 6).toUpperCase();
      localStorage.setItem("mv:aid", id);
    }
    return id;
  }

  function exportar() {
    const carga = {
      v: 1,
      id: idAnonimo(),
      nivel: Estado.perfil.nivel,
      progreso: Estado.progreso,
      fecha: new Date().toISOString()
    };
    const json = JSON.stringify(carga);
    const b64 = btoa(unescape(encodeURIComponent(json)));
    const codigo = PREFIJO + " " + b64;
    MODAL.innerHTML = `
      <div class="modal-categoria">MI PROGRESO · CÓDIGO ANÓNIMO</div>
      <div class="modal-titulo" style="font-size:15px">Tu código de progreso</div>
      <div class="modal-cuerpo">Entrega este código a tu docente para el panel del curso. 🔒 No contiene tu nombre ni datos personales: solo un identificador anónimo (${carga.id}).</div>
      <div class="codigo-export" id="codigo-export">${codigo}</div>
      <button class="btn primario pequeno" id="copiar-codigo" style="width:100%">📋 Copiar código</button>
      <button class="btn secundario pequeno" id="cerrar-export" style="width:100%">Cerrar</button>
    `;
    FONDO.classList.remove("oculto");
    document.getElementById("copiar-codigo").onclick = async (e) => {
      try {
        await navigator.clipboard.writeText(codigo);
        e.target.textContent = "✅ Copiado";
      } catch (err) {
        const rng = document.createRange();
        rng.selectNodeContents(document.getElementById("codigo-export"));
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(rng);
        e.target.textContent = "Seleccionado: Ctrl+C";
      }
    };
    document.getElementById("cerrar-export").onclick = () => FONDO.classList.add("oculto");
  }

  function puerta() {
    const a = 3 + Math.floor(Math.random() * 8);
    const b = 2 + Math.floor(Math.random() * 8);
    MODAL.innerHTML = `
      <div class="modal-categoria">ACCESO DOCENTE</div>
      <div class="modal-titulo" style="font-size:15px">Verificación simple</div>
      <div class="modal-cuerpo">Para abrir el panel docente, resuelve: <b>${a} + ${b} = ?</b></div>
      <input class="campo" id="resp-puerta" inputmode="numeric" placeholder="Respuesta">
      <button class="btn primario pequeno" id="abrir-panel" style="width:100%">Entrar</button>
      <button class="btn secundario pequeno" id="cancelar-puerta" style="width:100%">Cancelar</button>
    `;
    FONDO.classList.remove("oculto");
    const resp = document.getElementById("resp-puerta");
    resp.focus();
    const intentar = () => {
      if (Number(resp.value) === a + b) {
        FONDO.classList.add("oculto");
        UI.navegar("panel");
        pintar();
      } else {
        brindis("Respuesta incorrecta");
      }
    };
    document.getElementById("abrir-panel").onclick = intentar;
    resp.onkeydown = (e) => { if (e.key === "Enter") intentar(); };
    document.getElementById("cancelar-puerta").onclick = () => FONDO.classList.add("oculto");
  }

  function alumnos() {
    try { return JSON.parse(localStorage.getItem(CLAVE_ALUMNOS)) || {}; } catch (e) { return {}; }
  }

  function guardarAlumnos(a) {
    localStorage.setItem(CLAVE_ALUMNOS, JSON.stringify(a));
  }

  function decodificar(linea) {
    const limpio = linea.trim();
    if (!limpio.startsWith(PREFIJO)) return null;
    try {
      const json = decodeURIComponent(escape(atob(limpio.slice(PREFIJO.length).trim())));
      const d = JSON.parse(json);
      if (d && d.id && d.progreso) return d;
    } catch (e) { }
    return null;
  }

  function importar() {
    const ta = document.getElementById("ta-codigos");
    const lineas = ta.value.split(/[\n\r]+/).filter(l => l.trim());
    if (!lineas.length) return brindis("Pega al menos un código");
    const actuales = alumnos();
    let ok = 0, mal = 0;
    lineas.forEach(l => {
      const d = decodificar(l);
      if (d) {
        const previo = actuales[d.id];
        if (!previo || !previo.fecha || new Date(d.fecha) >= new Date(previo.fecha)) {
          actuales[d.id] = d;
        } else {
          actuales[d.id] = actuales[d.id];
        }
        ok++;
      } else mal++;
    });
    guardarAlumnos(actuales);
    ta.value = "";
    brindis(`Importados: ${ok}${mal ? " · inválidos: " + mal : ""}`);
    pintar();
  }

  function metricas() {
    const lista = Object.values(alumnos());
    const n = lista.length;
    if (!n) return null;
    let misiones = 0, estrellas = 0, galeria = 0, emerg = 0, contactos = 0, pre = 0, post = 0, nPre = 0, nPost = 0;
    lista.forEach(a => {
      const m = a.progreso.misiones || {};
      misiones += Object.keys(m).length;
      estrellas += Object.values(m).reduce((s, x) => s + (x.estrellas || 0), 0);
      galeria += a.progreso.galeria || 0;
      emerg += a.progreso.datosMax || 0;
      contactos += a.progreso.contactosMax || 0;
      if (a.progreso.evalPre) { pre += a.progreso.evalPre.puntaje; nPre++; }
      if (a.progreso.evalPost) { post += a.progreso.evalPost.puntaje; nPost++; }
    });
    return {
      n, misiones, estrellas,
      galeriaAvg: galeria / n, emergAvg: emerg / n, contactosAvg: contactos / n,
      preAvg: nPre ? pre / nPre : null, nPre, postAvg: nPost ? post / nPost : null, nPost,
      lista: lista.slice().sort((a, b) => (a.id < b.id ? -1 : 1))
    };
  }

  function pintar() {
    const zona = document.getElementById("panel-resumen");
    const btnCsv = document.getElementById("btn-csv");
    const btnInf = document.getElementById("btn-informe");
    const met = metricas();
    if (!met) {
      zona.classList.remove("oculto");
      zona.innerHTML = `<div class="vacio-panel">Aún no hay códigos importados.</div>`;
      btnCsv.classList.add("oculto");
      btnInf.classList.add("oculto");
      return;
    }
    zona.classList.remove("oculto");
    btnCsv.classList.remove("oculto");
    btnInf.classList.remove("oculto");
    zona.innerHTML = `
      <div class="tarjetas-resumen">
        <div class="tarjeta-res"><div class="num">${met.n}</div><div class="eti">estudiantes</div></div>
        <div class="tarjeta-res"><div class="num">${met.misiones}</div><div class="eti">misiones completadas</div></div>
        <div class="tarjeta-res"><div class="num">${met.estrellas}★</div><div class="eti">estrellas acumuladas</div></div>
        <div class="tarjeta-res"><div class="num">${Math.round(met.emergAvg)}%</div><div class="eti">quiz emergencias (prom.)</div></div>
        <div class="tarjeta-res"><div class="num">${Math.round(met.contactosAvg)}%</div><div class="eti">contactos de memoria (prom.)</div></div>
        <div class="tarjeta-res"><div class="num">${(met.galeriaAvg).toFixed(1)}/8</div><div class="eti">galería cultural (prom.)</div></div>
        <div class="tarjeta-res"><div class="num">${met.preAvg === null ? "—" : Math.round(met.preAvg) + "%"}</div><div class="eti">eval. inicial (${met.nPre})</div></div>
        <div class="tarjeta-res"><div class="num">${met.postAvg === null ? "—" : Math.round(met.postAvg) + "%"}</div><div class="eti">eval. final (${met.nPost})</div></div>
        <div class="tarjeta-res"><div class="num">${met.preAvg === null || met.postAvg === null ? "—" : (met.postAvg - met.preAvg >= 0 ? "+" : "") + Math.round(met.postAvg - met.preAvg) + "%"}</div><div class="eti">avance pre→post</div></div>
      </div>
      <table>
        <thead><tr><th>ID</th><th>Nivel</th><th>Misiones</th><th>★</th><th>Emerg. %</th><th>Contactos %</th><th>Galería</th><th>Pre %</th><th>Post %</th></tr></thead>
        <tbody>
          ${met.lista.map(a => {
            const m = a.progreso.misiones || {};
            const est = Object.values(m).reduce((s, x) => s + (x.estrellas || 0), 0);
            return `<tr><td>${a.id}</td><td>${a.nivel || 1}</td><td>${Object.keys(m).length}/5</td><td>${est}</td><td>${a.progreso.datosMax || 0}</td><td>${a.progreso.contactosMax || 0}</td><td>${a.progreso.galeria || 0}/8</td><td>${a.progreso.evalPre ? a.progreso.evalPre.puntaje : "—"}</td><td>${a.progreso.evalPost ? a.progreso.evalPost.puntaje : "—"}</td></tr>`;
          }).join("")}
        </tbody>
      </table>
    `;
  }

  function csv() {
    const met = metricas();
    if (!met) return;
    const filas = [["id", "nivel", "misiones", "estrellas", "emergencias_pct", "contactos_pct", "galeria", "eval_pre_pct", "eval_post_pct"]];
    met.lista.forEach(a => {
      const m = a.progreso.misiones || {};
      const est = Object.values(m).reduce((s, x) => s + (x.estrellas || 0), 0);
      filas.push([a.id, a.nivel || 1, Object.keys(m).length, est, a.progreso.datosMax || 0, a.progreso.contactosMax || 0, a.progreso.galeria || 0,
        a.progreso.evalPre ? a.progreso.evalPre.puntaje : "", a.progreso.evalPost ? a.progreso.evalPost.puntaje : ""]);
    });
    const contenido = filas.map(f => f.join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob(["\ufeff" + contenido], { type: "text/csv;charset=utf-8" }));
    a.download = "modo-valdivia-panel.csv";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function informe() {
    const met = metricas();
    if (!met) return;
    const w = window.open("", "_blank", "width=800,height=600");
    w.document.write(`
      <html><head><title>Informe · Modo Valdivia</title>
      <style>
        body { font-family: "Segoe UI", Georgia, serif; color:#1a2b3c; padding:40px; }
        h1 { font-size:22px; } .sub { color:#667; font-size:12px; margin-bottom:18px; }
        .grid { display:flex; gap:12px; flex-wrap:wrap; margin:16px 0; }
        .c { border:1px solid #ccd; border-radius:8px; padding:10px 16px; text-align:center; }
        .c b { font-size:22px; display:block; color:#2c6e8f; }
        .c span { font-size:11px; color:#667; }
        table { border-collapse:collapse; width:100%; font-size:12px; }
        th, td { border:1px solid #ccd; padding:5px 8px; text-align:left; }
        th { background:#eef3f6; }
      </style></head><body>
      <h1>Informe del curso · Modo Valdivia</h1>
      <div class="sub">Panel docente anónimo · ${new Date().toLocaleDateString("es-CL")} · ${met.n} estudiantes · sin datos personales</div>
      <div class="grid">
        <div class="c"><b>${met.misiones}</b><span>misiones completadas</span></div>
        <div class="c"><b>${met.estrellas}★</b><span>estrellas acumuladas</span></div>
        <div class="c"><b>${Math.round(met.emergAvg)}%</b><span>quiz emergencias (prom.)</span></div>
        <div class="c"><b>${Math.round(met.contactosAvg)}%</b><span>contactos de memoria (prom.)</span></div>
        <div class="c"><b>${met.galeriaAvg.toFixed(1)}/8</b><span>galería cultural (prom.)</span></div>
        <div class="c"><b>${met.preAvg === null ? "—" : Math.round(met.preAvg) + "% (" + met.nPre + ")"}</b><span>evaluación inicial</span></div>
        <div class="c"><b>${met.postAvg === null ? "—" : Math.round(met.postAvg) + "% (" + met.nPost + ")"}</b><span>evaluación final</span></div>
        <div class="c"><b>${met.preAvg === null || met.postAvg === null ? "—" : (met.postAvg - met.preAvg >= 0 ? "+" : "") + Math.round(met.postAvg - met.preAvg) + "%"}</b><span>avance pre→post</span></div>
      </div>
      <table><tr><th>ID</th><th>Nivel</th><th>Misiones</th><th>★</th><th>Emerg. %</th><th>Contactos %</th><th>Galería</th><th>Pre %</th><th>Post %</th></tr>
      ${met.lista.map(a => {
        const m = a.progreso.misiones || {};
        const est = Object.values(m).reduce((s, x) => s + (x.estrellas || 0), 0);
        return `<tr><td>${a.id}</td><td>${a.nivel || 1}</td><td>${Object.keys(m).length}/5</td><td>${est}</td><td>${a.progreso.datosMax || 0}</td><td>${a.progreso.contactosMax || 0}</td><td>${a.progreso.galeria || 0}/8</td><td>${a.progreso.evalPre ? a.progreso.evalPre.puntaje : "—"}</td><td>${a.progreso.evalPost ? a.progreso.evalPost.puntaje : "—"}</td></tr>`;
      }).join("")}
      </table>
      <script>window.print()<\/script>
      </body></html>
    `);
    w.document.close();
  }

  function activar() { pintar(); }

  document.getElementById("btn-exportar").addEventListener("click", exportar);
  document.getElementById("btn-panel-doc").addEventListener("click", puerta);
  document.getElementById("btn-importar").addEventListener("click", importar);
  document.getElementById("btn-vaciar-panel").addEventListener("click", () => {
    if (confirm("¿Vaciar el panel (los códigos importados de este equipo)?")) {
      guardarAlumnos({});
      pintar();
    }
  });
  document.getElementById("btn-csv").addEventListener("click", csv);
  document.getElementById("btn-informe").addEventListener("click", informe);
  document.getElementById("btn-salir-panel").addEventListener("click", () => UI.navegar("ajustes"));

  return { activar };
})();
