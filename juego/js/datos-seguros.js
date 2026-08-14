const DatosSeguros = (() => {
  const ZONA = document.getElementById("zona-juego-datos");
  let idx = 0;
  let aciertos = 0;

  function pantalla() {
    document.querySelector("main").scrollTop = 0;
  }

  function jugarLlamo() {
    idx = 0; aciertos = 0;
    pantalla();
    mostrarPregunta();
  }

  function mostrarPregunta() {
    if (idx >= ESCENARIOS_EMERGENCIA.length) return terminar();
    const e = ESCENARIOS_EMERGENCIA[idx];
    ZONA.innerHTML = `
      <div class="pregunta">
        <div class="categoria">${e.categoria} · Pregunta ${idx + 1}/${ESCENARIOS_EMERGENCIA.length}</div>
        <div class="escenario">${e.escenario}</div>
        <div id="ops"></div>
        <div class="marcador-datos">Aciertos: ${aciertos}/${idx}</div>
      </div>
    `;
    const cont = document.getElementById("ops");
    e.opciones.forEach((op, i) => {
      const b = document.createElement("button");
      b.className = "opcion";
      b.textContent = op;
      b.onclick = () => responder(i, e);
      cont.appendChild(b);
    });
  }

  function responder(elegida, e) {
    const ok = elegida === e.correcta;
    const ops = document.querySelectorAll("#ops .opcion");
    ops.forEach((b, i) => {
      b.disabled = true;
      if (i === e.correcta) b.classList.add("ok");
      else if (i === elegida) b.classList.add("mal");
    });
    if (ok) { aciertos++; Despachador.decir("Bien ahí. Ese número salva minutos, y minutos salvan vidas."); }
    else Despachador.decir("Casi. Mira por qué era el otro.");
    const fb = document.createElement("div");
    fb.className = "feedback " + (ok ? "ok" : "mal");
    fb.textContent = e.porque;
    ZONA.querySelector(".pregunta").appendChild(fb);
    const btn = document.createElement("button");
    btn.className = "btn primario pequeno";
    btn.style.width = "100%";
    btn.textContent = idx === ESCENARIOS_EMERGENCIA.length - 1 ? "Ver resultado" : "Siguiente";
    btn.onclick = () => { idx++; mostrarPregunta(); };
    ZONA.querySelector(".pregunta").appendChild(btn);
  }

  function terminar() {
    const total = ESCENARIOS_EMERGENCIA.length;
    const pct = Math.round(aciertos / total * 100);
    Estado.progreso.datosMax = Math.max(Estado.progreso.datosMax || 0, pct);
    Estado.guardar();
    ZONA.innerHTML = `
      <div class="pregunta" style="text-align:center">
        <div class="modal-categoria">RESULTADO</div>
        <div style="font-size:40px;margin:10px 0">${pct >= 80 ? "🏅" : pct >= 50 ? "👌" : "📖"}</div>
        <div class="modal-titulo">${aciertos}/${total} correctas (${pct}%)</div>
        <div class="modal-cuerpo">${pct >= 80 ? "Dominas tus emergencias. Repásalo de vez en cuando." : "Buen intento: repite el ejercicio hasta llegar al 100%. Estos números no se olvidan."}</div>
        <button class="btn primario pequeno" id="replay" style="width:100%">Repetir</button>
      </div>
    `;
    document.getElementById("replay").onclick = jugarLlamo;
  }

  function jugarDireccion() {
    pantalla();
    const guardada = Estado.perfil.direccion || { calle: "", numero: "", sector: "" };
    if (!guardada.calle) {
      ZONA.innerHTML = `
        <div class="pregunta">
          <div class="categoria">PASO 1 · GUARDAR (solo en este dispositivo)</div>
          <div class="escenario">Ingresa tu dirección para practicarla de memoria. 🔒 Se guarda únicamente acá.</div>
          <input class="campo" id="in-calle" placeholder="Calle (ej: Domeyko)">
          <input class="campo" id="in-numero" placeholder="Número (ej: 398)">
          <input class="campo" id="in-sector" placeholder="Sector (ej: Isla Teja)">
          <button class="btn primario pequeno" id="guardar-dir" style="width:100%">Guardar y practicar</button>
        </div>
      `;
      document.getElementById("guardar-dir").onclick = () => {
        const calle = document.getElementById("in-calle").value.trim();
        const numero = document.getElementById("in-numero").value.trim();
        const sector = document.getElementById("in-sector").value.trim();
        if (!calle || !numero) return brindis("Completa calle y número");
        Estado.perfil.direccion = { calle, numero, sector };
        Estado.guardar();
        Despachador.decir("Dirección guardada. Ahora, a probarla de memoria.");
        practicar();
      };
    } else {
      practicar();
    }
  }

  function practicar() {
    const d = Estado.perfil.direccion;
    ZONA.innerHTML = `
      <div class="pregunta">
        <div class="categoria">DE MEMORIA · SIN MIRAR</div>
        <div class="escenario">¿Cómo es tu dirección? Escríbela de memoria.</div>
        <input class="campo" id="p-calle" placeholder="Calle">
        <input class="campo" id="p-numero" placeholder="Número">
        <input class="campo" id="p-sector" placeholder="Sector">
        <button class="btn primario pequeno" id="verificar-dir" style="width:100%">Verificar</button>
        <div id="res-dir"></div>
      </div>
    `;
    document.getElementById("verificar-dir").onclick = () => {
      const okCalle = document.getElementById("p-calle").value.trim().toLowerCase() === d.calle.toLowerCase();
      const okNum = document.getElementById("p-numero").value.trim() === d.numero;
      const okSec = (d.sector || "") === "" || document.getElementById("p-sector").value.trim().toLowerCase() === d.sector.toLowerCase();
      const total = [okCalle, okNum, okSec].filter(Boolean).length;
      document.getElementById("res-dir").innerHTML = `
        <div class="feedback ${total === 3 ? "ok" : "mal"}">
          ${total === 3 ? "¡Perfecto! Tu dirección está en tu cabeza, no solo en tu celular." : `Acertaste ${total}/3. ${!okCalle ? "La calle no era esa. " : ""}${!okNum ? "Revisa el número. " : ""}${!okSec ? "Revisa el sector." : ""}`}
        </div>
      `;
      if (total === 3) Despachador.decir("Dirección memorizada. Eso es autonomía de verdad.");
    };
  }

  function activar() {
    ZONA.innerHTML = "";
  }

  function jugarContactos() {
    pantalla();
    const contactos = Estado.perfil.contactos || [];
    if (contactos.length < 2) {
      ZONA.innerHTML = `
        <div class="pregunta">
          <div class="categoria">PASO 1 · GUARDAR CONTACTOS (🔒 solo en este dispositivo)</div>
          <div class="escenario">Guarda al menos 2 contactos de confianza (mamá, papá, abuela, vecino…). Los necesitarás de memoria.</div>
          <div id="form-contactos">
            ${[0, 1, 2].map(i => `
              <input class="campo" id="ct-nombre-${i}" placeholder="Nombre ${i + 1}" value="${(contactos[i] || {}).nombre || ""}">
              <input class="campo" id="ct-tel-${i}" placeholder="Teléfono ${i + 1} (solo números)" value="${(contactos[i] || {}).tel || ""}" inputmode="numeric">
            `).join("")}
          </div>
          <button class="btn primario pequeno" id="guardar-contactos" style="width:100%">Guardar y practicar</button>
        </div>
      `;
      document.getElementById("guardar-contactos").onclick = () => {
        const nuevos = [];
        for (let i = 0; i < 3; i++) {
          const nombre = document.getElementById("ct-nombre-" + i).value.trim();
          let tel = document.getElementById("ct-tel-" + i).value.replace(/\D/g, "");
          if (nombre && tel) nuevos.push({ nombre, tel });
        }
        if (nuevos.length < 2) return brindis("Guarda al menos 2 contactos con nombre y teléfono");
        Estado.perfil.contactos = nuevos;
        Estado.guardar();
        Despachador.decir("Contactos guardados en este dispositivo. Ahora, de memoria: ¿a quién llamas?");
        quizContactos();
      };
    } else {
      quizContactos();
    }
  }

  function quizContactos() {
    const contactos = Estado.perfil.contactos.slice(0, 3);
    const distractores = ["131", "133", "134"].filter(n => !contactos.some(c => c.tel.endsWith(n)));
    let idx = 0;
    let aciertos = 0;

    function pregunta() {
      if (idx >= contactos.length) return terminar();
      const c = contactos[idx];
      const opciones = [c.tel,
        ...distractores.slice(0, 2),
        ...contactos.filter(o => o !== c).map(o => o.tel)
      ].filter((v, i, a) => a.indexOf(v) === i).slice(0, 4);
      while (opciones.length < 3) opciones.push(String(100 + Math.floor(Math.random() * 899)));
      const barajadas = opciones.sort(() => Math.random() - 0.5);
      ZONA.innerHTML = `
        <div class="pregunta">
          <div class="categoria">TARJETAS DE MEMORIA · ${idx + 1}/${contactos.length}</div>
          <div class="escenario">📱 ¿Cuál es el teléfono de <b>${c.nombre}</b>?</div>
          <div id="ops"></div>
          <div class="marcador-datos">Aciertos: ${aciertos}/${idx}</div>
        </div>
      `;
      const cont = document.getElementById("ops");
      barajadas.forEach(tel => {
        const b = document.createElement("button");
        b.className = "opcion";
        b.textContent = tel;
        b.onclick = () => {
          const ok = tel === c.tel;
          if (ok) aciertos++;
          cont.querySelectorAll(".opcion").forEach(x => x.disabled = true);
          if (ok) b.classList.add("ok"); else {
            b.classList.add("mal");
            cont.querySelectorAll(".opcion").forEach(x => { if (x.textContent === c.tel) x.classList.add("ok"); });
          }
          const fb = document.createElement("div");
          fb.className = "feedback " + (ok ? "ok" : "mal");
          fb.textContent = ok
            ? "¡De memoria! Ese es el número de " + c.nombre + "."
            : "El número de " + c.nombre + " es " + c.tel + ". Repítelo tres veces y sigue.";
          ZONA.querySelector(".pregunta").appendChild(fb);
          const btn = document.createElement("button");
          btn.className = "btn primario pequeno";
          btn.style.width = "100%";
          btn.textContent = idx === contactos.length - 1 ? "Ver resultado" : "Siguiente";
          btn.onclick = () => { idx++; pregunta(); };
          ZONA.querySelector(".pregunta").appendChild(btn);
        };
        cont.appendChild(b);
      });
    }

    function terminar() {
      const total = contactos.length;
      const pct = Math.round(aciertos / total * 100);
      Estado.progreso.contactosMax = Math.max(Estado.progreso.contactosMax || 0, pct);
      Estado.guardar();
      ZONA.innerHTML = `
        <div class="pregunta" style="text-align:center">
          <div class="modal-categoria">RESULTADO</div>
          <div style="font-size:40px;margin:10px 0">${pct >= 70 ? "🃏" : "📚"}</div>
          <div class="modal-titulo">${aciertos}/${total} correctas</div>
          <div class="modal-cuerpo">${pct >= 70 ? "Tus contactos ya viven en tu memoria, no solo en el celular." : "Repite el ejercicio: en una emergencia real no habrá tiempo de buscar."}</div>
          <button class="btn primario pequeno" id="replay-ct" style="width:100%">Repetir</button>
        </div>
      `;
      document.getElementById("replay-ct").onclick = quizContactos;
    }

    pregunta();
  }

  function jugarProtocolos() {
    pantalla();
    let idx = 0;

    function mostrarLista() {
      ZONA.innerHTML = `
        <div class="pregunta">
          <div class="categoria">PROTOCOLOS · ELIGE UN SIMULACRO</div>
          <div id="lista-protocolos"></div>
        </div>
      `;
      const lista = document.getElementById("lista-protocolos");
      PROTOCOLOS.forEach(p => {
        const b = document.createElement("button");
        b.className = "opcion";
        b.textContent = p.emoji + "  " + p.titulo;
        b.onclick = () => jugarProtocolo(p);
        lista.appendChild(b);
      });
    }

    function jugarProtocolo(p) {
      const barajados = p.pasos.slice().sort(() => Math.random() - 0.5);
      const orden = [];
      let errores = 0;
      ZONA.innerHTML = `
        <div class="pregunta">
          <div class="categoria">SIMULACRO · ${p.emoji} ${p.titulo.toUpperCase()}</div>
          <div class="escenario">${p.intro}</div>
          <div id="proto-orden" class="proto-orden"></div>
          <div id="proto-opciones"></div>
        </div>
      `;
      const contOrden = document.getElementById("proto-orden");
      const contOps = document.getElementById("proto-opciones");

      function pintarOrden() {
        contOrden.innerHTML = orden.map((paso, i) =>
          `<div class="paso-ok">${i + 1}. ${paso}</div>`
        ).join("");
      }

      barajados.forEach(paso => {
        const b = document.createElement("button");
        b.className = "opcion";
        b.textContent = paso;
        b.onclick = () => {
          if (paso === p.pasos[orden.length]) {
            orden.push(paso);
            b.remove();
            b.classList.add("ok");
            pintarOrden();
            if (orden.length === p.pasos.length) terminar(p, errores);
          } else {
            errores++;
            b.classList.add("mal");
            setTimeout(() => b.classList.remove("mal"), 700);
          }
        };
        contOps.appendChild(b);
      });
    }

    function terminar(p, errores) {
      const perfecto = errores === 0;
      ZONA.innerHTML = `
        <div class="pregunta" style="text-align:center">
          <div class="modal-categoria">SIMULACRO COMPLETADO</div>
          <div style="font-size:40px;margin:10px 0">${perfecto ? "🏆" : "👍"}</div>
          <div class="modal-titulo">${p.titulo} · ${errores === 0 ? "perfecto" : errores + " " + (errores === 1 ? "corrección" : "correcciones")}</div>
          <div class="modal-cuerpo" style="text-align:left">${p.pasos.map((x, i) => `<div class="paso-ok">${i + 1}. ${x}</div>`).join("")}</div>
          <div class="feedback ok" style="text-align:left">Memoriza este orden: en una emergencia real, la calma viene de saber los pasos.</div>
          <button class="btn primario pequeno" id="proto-otro" style="width:100%">Otro protocolo</button>
        </div>
      `;
      document.getElementById("proto-otro").onclick = mostrarLista;
      Despachador.decir(perfecto ? "Protocolo en orden perfecto. Eso se llama estar preparado." : "Protocolo completado. Repásalo una vez más y queda tuyo.");
    }

    mostrarLista();
  }

  document.getElementById("btn-jugar-llamo").addEventListener("click", jugarLlamo);
  document.getElementById("btn-jugar-direccion").addEventListener("click", jugarDireccion);
  document.getElementById("btn-jugar-contactos").addEventListener("click", jugarContactos);
  document.getElementById("btn-jugar-protocolos").addEventListener("click", jugarProtocolos);

  return { activar };
})();
