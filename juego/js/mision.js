const Mision = (() => {
  const MODAL = document.getElementById("modal");
  const FONDO = document.getElementById("modal-fondo");
  let estado = null;

  const PUNTOS_CARD = ["Norte", "Noreste", "Este", "Sureste", "Sur", "Suroeste", "Oeste", "Noroeste"];

  function distKm(a, b) {
    const R = 6371, dLat = (b[0]-a[0]) * Math.PI/180, dLon = (b[1]-a[1]) * Math.PI/180;
    const la1 = a[0]*Math.PI/180, la2 = b[0]*Math.PI/180;
    const h = Math.sin(dLat/2)**2 + Math.cos(la1)*Math.cos(la2)*Math.sin(dLon/2)**2;
    return 2 * R * Math.asin(Math.sqrt(h));
  }

  function rumbo(a, b) {
    const la1 = a[0]*Math.PI/180, la2 = b[0]*Math.PI/180;
    const dLon = (b[1]-a[1]) * Math.PI/180;
    const y = Math.sin(dLon) * Math.cos(la2);
    const x = Math.cos(la1)*Math.sin(la2) - Math.sin(la1)*Math.cos(la2)*Math.cos(dLon);
    let g = Math.atan2(y, x) * 180/Math.PI;
    g = (g + 360) % 360;
    return PUNTOS_CARD[Math.round(g / 45) % 8];
  }

  function desplazar(p, km, dir) {
    const idx = PUNTOS_CARD.indexOf(dir);
    const ang = idx * 45 * Math.PI/180;
    const dLat = km * Math.cos(ang) / 111;
    const dLon = km * Math.sin(ang) / (111 * Math.cos(p[0]*Math.PI/180));
    return [p[0] + dLat, p[1] + dLon];
  }

  function hitoCercano(p, maxKm) {
    let mejor = null, d = maxKm || 0.6;
    HITOS.forEach(h => {
      const k = distKm(p, h.coords);
      if (k < d) { d = k; mejor = h; }
    });
    return mejor;
  }

  function generarCheckpoints(destino) {
    const origen = HITOS.find(h => h.id === "insat").coords;
    const total = distKm(origen, destino);
    const n = Math.max(3, Math.min(10, Math.ceil(total / 0.28)));
    const cps = [];
    for (let i = 1; i <= n; i++) {
      const t = i / n;
      const c = [origen[0] + (destino[0]-origen[0])*t, origen[1] + (destino[1]-origen[1])*t];
      const prev = i === 1 ? origen : cps[cps.length - 1].coords;
      const dir = rumbo(prev, c);
      const h = hitoCercano(c);
      cps.push({
        coords: c,
        texto: h ? `Cruce de calles cerca de ${h.nombre}. ¿Hacia dónde sigues?` : "Cruce de calles. ¿Hacia dónde sigues?",
        correcta: dir,
        refHito: h ? h.nombre : null
      });
    }
    return cps;
  }

  async function rutaReal(a, b) {
    try {
      const url = "https://router.project-osrm.org/route/v1/driving/" +
        a[1] + "," + a[0] + ";" + b[1] + "," + b[0] + "?overview=full&geometries=geojson";
      const ctl = new AbortController();
      const t = setTimeout(() => ctl.abort(), 3500);
      const r = await fetch(url, { signal: ctl.signal });
      clearTimeout(t);
      const j = await r.json();
      if (j.code === "Ok" && j.routes && j.routes[0] && j.routes[0].geometry) {
        const path = j.routes[0].geometry.coordinates.map(c => [c[1], c[0]]);
        if (path.length > 4) return path;
      }
    } catch (e) { /* sin conexión o sin OSRM: usamos el fallback recto */ }
    return null;
  }

  function checkpointsDesdeRuta(path) {
    const PASO_KM = 0.28;
    const cps = [];
    let prev = path[0];
    let acum = 0;
    for (let i = 1; i < path.length; i++) {
      acum += distKm(path[i - 1], path[i]);
      if (acum >= PASO_KM) {
        acum = 0;
        const h = hitoCercano(path[i]);
        cps.push({
          coords: path[i],
          texto: h ? `Cruce de calles cerca de ${h.nombre}. ¿Hacia dónde sigues?` : "Cruce de calles. ¿Hacia dónde sigues?",
          correcta: rumbo(prev, path[i]),
          refHito: h ? h.nombre : null
        });
        prev = path[i];
        if (cps.length >= 12) break;
      }
    }
    return { cps, path };
  }

  function opcionesPara(cp, siguiente) {
    const dir = cp.correcta || rumbo(cp.coords, siguiente);
    const otras = PUNTOS_CARD.filter(c => c !== dir && Math.abs(PUNTOS_CARD.indexOf(c) - PUNTOS_CARD.indexOf(dir)) !== 4);
    const e1 = otras[Math.floor(Math.random()*otras.length)];
    let e2 = otras.filter(o => o !== e1)[0];
    if (!e2) e2 = PUNTOS_CARD[(PUNTOS_CARD.indexOf(dir) + 4) % 8];
    const ref = cp.refHito ? ` — pasando por ${cp.refHito}` : "";
    const ops = {};
    ops[dir] = `Sigo hacia el ${dir.toLowerCase()}${ref}`;
    ops[e1] = `Tomo hacia el ${e1.toLowerCase()}`;
    ops[e2] = `Me voy hacia el ${e2.toLowerCase()}`;
    return { correcta: dir, opciones: ops };
  }

  function abrirPanel() {
    document.getElementById("titulo-mapa").textContent = "Misiones";
    document.getElementById("hud-mision").classList.add("oculto");
    MapaValdivia.iniciar();
    MapaValdivia.limpiarJugador();
    MapaValdivia.encoger();
    renderLista();
    document.getElementById("panel-misiones").classList.remove("oculto");
    const primera = !Object.keys(Estado.progreso.misiones).length;
    Despachador.decir(primera ? MENSAJES_RADIO.misionInicio : "Elige tu misión, y a la calle.");
  }

  function renderLista() {
    const lista = document.getElementById("lista-misiones");
    lista.innerHTML = "";
    const d = desafioSemanal();
    const idDes = "desafio-" + d.key;
    const hecho = Estado.progreso.misiones[idDes];
    const card = document.createElement("div");
    card.className = "mision-item desafio";
    card.innerHTML = `
      <b>⚔️ Desafío de la semana · ${d.tipo.nombre}</b>
      <div class="desc">${d.tipo.desc} → <b>${d.destinoNombre}</b></div>
      <div class="estrellas">${hecho ? "★".repeat(hecho.estrellas) + "☆".repeat(3 - hecho.estrellas) : "NUEVO ☆☆☆"}</div>
    `;
    const btnDes = document.createElement("button");
    btnDes.className = "btn acento pequeno";
    btnDes.style.width = "100%";
    btnDes.textContent = hecho ? "Repetir desafío" : "Aceptar desafío";
    btnDes.onclick = () => comenzarDesafio(d, idDes);
    card.appendChild(btnDes);
    lista.appendChild(card);

    MISIONES.forEach(m => {
      const bloqueada = m.nivel === 2 && Estado.perfil.nivel < 2;
      const prog = Estado.progreso.misiones[m.id];
      const estrellas = prog ? "★".repeat(prog.estrellas) + "☆".repeat(3 - prog.estrellas) : "☆☆☆";
      const div = document.createElement("div");
      div.className = "mision-item";
      div.innerHTML = `
        <b>${m.nombre} ${m.nivel === 2 ? "· Nivel 2" : ""}</b>
        <div class="desc">${bloqueada ? "Desbloquea el Nivel 2 en Ajustes para jugarla." : m.desc}</div>
        <div class="estrellas">${estrellas}</div>
      `;
      if (!bloqueada) {
        const btn = document.createElement("button");
        btn.className = "btn primario pequeno";
        btn.style.width = "100%";
        btn.textContent = prog ? "Repetir" : "Comenzar";
        btn.onclick = () => comenzar(m);
        div.appendChild(btn);
      }
      lista.appendChild(div);
    });
  }

  async function comenzar(m) {
    let destino = m.destino;
    let destinoNombre = m.destinoNombre;
    if (!destino) {
      const casa = Estado.casaActual();
      if (!casa) {
        brindis("Configura tu casa en Ajustes para jugar esta misión");
        return;
      }
      destino = casa.coords;
      destinoNombre = `${casa.nombre} (tu casa)`;
    }
    const origen = m.origen || HITOS.find(h => h.id === "insat").coords;
    let cps = m.checkpoints && m.checkpoints.length ? m.checkpoints.filter(c => c.coords) : null;
    let trayecto = [origen, ...(cps ? cps.map(c => c.coords) : []), destino];

    if (!cps) {
      document.getElementById("panel-misiones").classList.add("oculto");
      brindis("Trazando ruta real por las calles de Valdivia…");
      MapaValdivia.iniciar();
      const path = await rutaReal(origen, destino);
      if (path) {
        const r = checkpointsDesdeRuta(path);
        cps = r.cps;
        trayecto = r.path;
      } else {
        cps = generarCheckpoints(destino);
        trayecto = [origen, ...cps.map(c => c.coords), destino];
      }
    }

    if (m.sinBici) {
      iniciarEstado(m, origen, destino, destinoNombre, cps, trayecto, "pie");
      return;
    }
    elegirMedio(medio => iniciarEstado(m, origen, destino, destinoNombre, cps, trayecto, medio));
  }

  function elegirMedio(cb) {
    MODAL.innerHTML = `
      <div class="modal-categoria">¿CÓMO TE MUEVES HOY?</div>
      <div class="modal-titulo" style="font-size:15px">Elige tu medio</div>
      <div id="medio-ops"></div>
    `;
    const cont = document.getElementById("medio-ops");
    [
      { id: "pie", emoji: "🚶", t: "Caminando", d: "100% control: llegas cuando llegues (~13 min/km)." },
      { id: "bici", emoji: "🚲", t: "En bici", d: "Mucho más rápido (~4,5 min/km). Ojo con la cadena y la ciclovía." }
    ].forEach(o => {
      const b = document.createElement("button");
      b.className = "opcion";
      b.innerHTML = `<b>${o.emoji} ${o.t}</b><br><span style="font-size:12px;color:#778">${o.d}</span>`;
      b.onclick = () => { FONDO.classList.add("oculto"); cb(o.id); };
      cont.appendChild(b);
    });
    FONDO.classList.remove("oculto");
  }

  function iniciarEstado(m, origen, destino, destinoNombre, cps, trayecto, medio) {
    document.getElementById("pantalla-mapa").classList.toggle("nocturna", !!m.nocturna);
    MapaValdivia.destino(destino, destinoNombre);
    estado = {
      mision: m,
      cps,
      paso: 0,
      pos: origen,
      destino, destinoNombre,
      medio,
      reloj: m.nocturna ? 21 * 60 + 15 : 17 * 60 + 30,
      relojInicio: m.nocturna ? 21 * 60 + 15 : 17 * 60 + 30,
      errores: 0,
      saldo: m.saldoInicial !== undefined ? m.saldoInicial : (m.nivel === 2 ? 1200 : 1600),
      bateria: m.bateriaInicial || (m.nivel === 2 ? 40 : 100),
      eventosUsados: 0,
      historial: [origen],
      terminada: false,
      trayecto
    };
    document.getElementById("panel-misiones").classList.add("oculto");
    document.getElementById("hud-mision").classList.remove("oculto");
    document.getElementById("hud-titulo").textContent = m.nombre + (m.nocturna ? " 🌙" : "");
    document.getElementById("hud-objetivo").textContent = `→ ${destinoNombre}`;
    MapaValdivia.iniciar();
    MapaValdivia.jugador(estado.pos, medio);
    MapaValdivia.ruta(trayecto);
    Despachador.decir(
      m.eventoInicial ? "Sirenas en toda la ciudad. Actúa como si fuera real: terreno alto, ya."
      : m.nocturna ? "De noche y sin micro: rutas conocidas, veredas iluminadas y el celular a duras penas. Vamos con calma."
      : medio === "bici" ? "En bici: por la ciclovía cuando exista, luces encendidas y trazado predecible. Adelante."
      : MENSAJES_RADIO.misionInicio);
    actualizarHUD();
    setTimeout(() => preguntar(), 600);
  }

  function actualizarHUD() {
    if (!estado) return;
    const h = Math.floor(estado.reloj / 60), mn = estado.reloj % 60;
    document.getElementById("hud-reloj").textContent = `⏱ ${String(h).padStart(2,"0")}:${String(mn).padStart(2,"0")}`;
    document.getElementById("hud-recursos").textContent = `${estado.medio === "bici" ? "🚲 " : ""}🎫 $${estado.saldo} · 🔋 ${estado.bateria}%`;
    const brujula = document.getElementById("hud-brujula");
    if (Estado.perfil.nivel === 1 && !estado.terminada && !estado.m.sinBrujula) {
      const objetivo = estado.paso < estado.cps.length ? estado.cps[estado.paso].coords : estado.destino;
      const dir = rumbo(estado.pos, objetivo);
      brujula.textContent = `🧭 ${dir}`;
    } else {
      brujula.textContent = Estado.perfil.nivel === 2 ? "🧭 —" : "";
    }
  }

  function preguntar() {
    if (!estado || estado.terminada) return;
    if (estado.paso >= estado.cps.length) { finalizar(true); return; }
    const cp = estado.cps[estado.paso];
    const siguiente = estado.paso + 1 < estado.cps.length ? estado.cps[estado.paso + 1].coords : estado.destino;
    const ops = cp.opciones ? { correcta: cp.correcta, opciones: cp.opciones } : opcionesPara(cp, siguiente);

    const umbrales = [Math.floor(estado.cps.length / 3), Math.floor(2 * estado.cps.length / 3)];
    if (estado.m.eventoInicial && estado.paso === 0 && estado.eventosUsados === 0) {
      estado.eventosUsados++;
      Despachador.decir(MENSAJES_RADIO.misionEvento);
      lanzarEvento(() => mostrarDecision(cp, ops), estado.m.eventoInicial);
      return;
    }
    const conEvento = estado.eventosUsados < umbrales.length && estado.paso === umbrales[estado.eventosUsados];
    if (conEvento) {
      estado.eventosUsados++;
      Despachador.decir(MENSAJES_RADIO.misionEvento);
      lanzarEvento(() => mostrarDecision(cp, ops));
      return;
    }
    mostrarDecision(cp, ops);
  }

  function microsEnZona(coords) {
    const opciones = [];
    MICROS.forEach(linea => {
      let mejor = null, d = 0.28;
      linea.paradas.forEach(p => {
        const k = distKm(coords, p.coords);
        if (k < d) { d = k; mejor = p; }
      });
      if (mejor) opciones.push({ linea, paradaSubida: mejor });
    });
    return opciones;
  }

  function mostrarDecision(cp, ops) {
    const claves = Object.keys(ops.opciones).sort(() => Math.random() - 0.5);
    const micros = estado.saldo >= 400 ? microsEnZona(cp.coords) : [];
    let html = `
      <div class="modal-categoria">DECISIÓN ${estado.paso + 1}/${estado.cps.length}</div>
      <div class="modal-titulo" style="font-size:15px">${cp.texto}</div>
    `;
    if (cp.refHito && !cp.opciones) html += `<div style="font-size:12px;color:#778;margin-bottom:6px">📍 Referencia cercana: ${cp.refHito}</div>`;
    MODAL.innerHTML = html + `<div id="opciones-mision"></div>`;
    const cont = document.getElementById("opciones-mision");
    claves.forEach(k => {
      const b = document.createElement("button");
      b.className = "opcion";
      b.textContent = ops.opciones[k];
      b.onclick = () => responder(k === ops.correcta, k, siguienteCoord());
      cont.appendChild(b);
    });
    micros.slice(0, 2).forEach(m => {
      const b = document.createElement("button");
      b.className = "opcion";
      b.style.borderColor = m.linea.color;
      b.textContent = `🚌 ${m.linea.ref ? "Línea " + m.linea.ref + " — " + m.linea.nombre : m.linea.nombre} (subes en ${m.paradaSubida.nombre}; –$400)`;
      b.onclick = () => tomarMicro(m);
      cont.appendChild(b);
    });
    if (micros.length) {
      const nota = document.createElement("div");
      nota.style.cssText = "font-size:11px;color:#889;margin-top:6px";
      nota.textContent = "La micro te baja en la parada de esa línea más cercana a tu destino.";
      cont.appendChild(nota);
    }
    FONDO.classList.remove("oculto");
  }

  function siguienteCoord() {
    return estado.paso + 1 < estado.cps.length ? estado.cps[estado.paso + 1].coords : estado.destino;
  }

  function responder(correcta, dir, objetivo) {
    if (!estado || estado.terminada) return;
    if (correcta) {
      estado.pos = estado.paso + 1 < estado.cps.length ? estado.cps[estado.paso].coords : estado.destino;
      estado.historial.push(estado.pos);
      estado.reloj += minutosPaso();
      if (Estado.perfil.nivel === 2) estado.bateria = Math.max(0, estado.bateria - 3);
      estado.paso++;
      MapaValdivia.jugador(estado.pos, estado.medio);
      FONDO.classList.add("oculto");
      Despachador.decir(MENSAJES_RADIO.misionOk);
      actualizarHUD();
      setTimeout(() => preguntar(), 500);
    } else {
      estado.errores++;
      estado.reloj += 6;
      if (Estado.perfil.nivel === 2) estado.bateria = Math.max(0, estado.bateria - 4);
      const fuera = desplazar(estado.pos, 0.09, dir);
      MapaValdivia.jugador(fuera, estado.medio);
      MODAL.innerHTML = `
        <div class="modal-categoria">RUMBO EQUIVOCADO</div>
        <div class="modal-titulo" style="font-size:15px">Ese no es el camino</div>
        <div class="modal-cuerpo">${MENSAJES_RADIO.misionMal}</div>
        <div class="feedback mal">El entorno no te resulta conocido por ahí: perdiste ~6 minutos. Vuelve a la esquina buena y elige de nuevo.</div>
        <button class="btn secundario pequeno" id="reintentar" style="width:100%">Volver a la esquina</button>
      `;
      document.getElementById("reintentar").onclick = () => {
        MapaValdivia.jugador(estado.pos, estado.medio);
        actualizarHUD();
        preguntar();
      };
      actualizarHUD();
    }
  }

  function minutosPaso() {
    const cp = estado.cps[estado.paso];
    const objetivo = siguienteCoord();
    const vel = estado.medio === "bici" ? 4.5 : 13;
    return Math.max(estado.medio === "bici" ? 1 : 2, Math.round(distKm(cp.coords, objetivo) * vel));
  }

  function tomarMicro(m) {
    const linea = m.linea;
    let paradaBajada = null, dMin = Infinity;
    linea.paradas.forEach(p => {
      const k = distKm(p.coords, estado.destino);
      if (k < dMin) { dMin = k; paradaBajada = p; }
    });
    const viajados = distKm(m.paradaSubida.coords, paradaBajada.coords);
    estado.saldo -= 400;
    estado.reloj += 3 + Math.round(viajados * 4);
    estado.pos = paradaBajada.coords;

    const cercanos = estado.cps
      .map((c, i) => ({ i, d: distKm(c.coords, estado.pos) }))
      .filter(x => x.d < 0.2);
    if (dMin < 0.35) estado.paso = estado.cps.length;
    else if (cercanos.length) estado.paso = Math.max(estado.paso, cercanos[cercanos.length - 1].i + 1);
    else estado.paso = Math.min(estado.cps.length, estado.paso + 2);

    estado.historial.push(estado.pos);
    FONDO.classList.add("oculto");
    brindis(`🚌 ${linea.ref ? "Línea " + linea.ref : linea.nombre}: bajaste en ${paradaBajada.nombre}`);
    Despachador.decir(`Micro tomada: te dejamos en ${paradaBajada.nombre}. Ojo con tu saldo.`);
    MapaValdivia.jugador(estado.pos, "pie");
    actualizarHUD();
    setTimeout(() => preguntar(), 500);
  }

  function lanzarEvento(alTerminar, idForzado) {
    const vistos = estado.eventosVistos || (estado.eventosVistos = []);
    const pool = EVENTOS.filter(e => !vistos.includes(e.id) && (!e.solo || e.solo === estado.medio));
    let ev;
    if (idForzado) {
      ev = EVENTOS.find(e => e.id === idForzado);
    } else {
      ev = pool[Math.floor(Math.random() * pool.length)];
    }
    if (!ev) { alTerminar(); return; }
    vistos.push(ev.id);
    MODAL.innerHTML = `
      <div class="modal-categoria">${ev.etiqueta}</div>
      <div class="modal-titulo">${ev.titulo}</div>
      <div class="modal-cuerpo">${ev.texto}</div>
      <div id="opciones-evento"></div>
    `;
    const cont = document.getElementById("opciones-evento");
    ev.opciones.forEach((o, i) => {
      const b = document.createElement("button");
      b.className = "opcion";
      b.textContent = o.texto;
      b.onclick = () => {
        if (o.correcta) {
          MODAL.innerHTML = `
            <div class="modal-categoria">BIEN DECIDIDO</div>
            <div class="modal-titulo">✅ Correcto</div>
            <div class="feedback ok">${o.porque}</div>
            <button class="btn primario pequeno" id="ev-ok" style="width:100%">Seguir la misión</button>
          `;
          document.getElementById("ev-ok").onclick = () => { FONDO.classList.add("oculto"); alTerminar(); };
        } else {
          estado.errores++;
          estado.reloj += 8;
          MODAL.innerHTML = `
            <div class="modal-categoria">CONSECUENCIA</div>
            <div class="modal-titulo">⚠ No fue la mejor decisión</div>
            <div class="feedback mal">${o.porque}</div>
            <div class="modal-cuerpo" style="margin-top:6px">Perdiste ~8 minutos. Aprendiste algo valioso.</div>
            <button class="btn secundario pequeno" id="ev-ok" style="width:100%">Seguir la misión</button>
          `;
          document.getElementById("ev-ok").onclick = () => { FONDO.classList.add("oculto"); alTerminar(); };
        }
        actualizarHUD();
      };
      cont.appendChild(b);
    });
    FONDO.classList.remove("oculto");
  }

  function perdido() {
    if (!estado) return;
    Despachador.decir(MENSAJES_RADIO.perdido);
    MODAL.innerHTML = `
      <div class="modal-categoria">PROTOCOLO · ME PERDÍ</div>
      <div class="modal-titulo">Calma. Esto tiene pasos.</div>
      <div class="modal-cuerpo">
        1️⃣ Detente. No camines sin rumbo.<br>
        2️⃣ Busca un referente: una calle con nombre, un hito, la plaza.<br>
        3️⃣ Ubícate en el mapa (hitos visibles arriba).<br>
        4️⃣ Si no resulta: entra a un local establecido y pide ayuda, o llama a tu contacto de confianza.<br>
        <div class="dato-curioso">Pedir ayuda es una habilidad, no una derrota.</div>
      </div>
      <button class="btn primario pequeno" id="cerrar-perdido" style="width:100%">Volver a la misión</button>
    `;
    FONDO.classList.remove("oculto");
    document.getElementById("cerrar-perdido").onclick = () => FONDO.classList.add("oculto");
  }

  function abandonar() {
    if (!estado) return abrirPanel();
    estado.terminada = true;
    FONDO.classList.add("oculto");
    document.getElementById("pantalla-mapa").classList.remove("nocturna");
    Despachador.decir(MENSAJES_RADIO.despachadorFin);
    abrirPanel();
  }

  function finalizar(llegada) {
    estado.terminada = true;
    document.getElementById("pantalla-mapa").classList.remove("nocturna");
    const relojFinal = estado.reloj;
    const limiteAbs = estado.relojInicio + Math.round(estado.mision.limiteMin * (estado.mision.limiteFactor || 1));
    const aTiempo = relojFinal <= limiteAbs;
    let estrellas = 1;
    if (estado.errores === 0 && aTiempo) estrellas = 3;
    else if (estado.errores <= 2 && aTiempo) estrellas = 2;

    Estado.registrarMision(estado.mision.id, estrellas, estado.errores);
    const pieza = Estado.desbloquearPieza();
    MapaValdivia.ruta(null);
    Despachador.decir(MENSAJES_RADIO.misionLlegada);

    const h = Math.floor(relojFinal / 60), mn = relojFinal % 60;
    MODAL.innerHTML = `
      <div class="modal-categoria">MISIÓN COMPLETADA</div>
      <div class="modal-titulo">🏠 ¡Llegaste a ${estado.destinoNombre}!</div>
      <div class="estrellas-grande">${"★".repeat(estrellas)}${"☆".repeat(3 - estrellas)}</div>
      <div class="kv"><span>Hora de llegada</span><b>${String(h).padStart(2,"0")}:${String(mn).padStart(2,"0")} ${aTiempo ? "✅" : "⚠ tarde"}</b></div>
      <div class="kv"><span>Errores de rumbo</span><b>${estado.errores}</b></div>
      <div class="kv"><span>Saldo restante</span><b>$${estado.saldo}</b></div>
      ${pieza ? `<div class="kv"><span>Desbloqueado</span><b>🏺 ${pieza.nombre}</b></div>` : ""}
      <button class="btn primario pequeno" id="m-otra" style="width:100%">Otra misión</button>
    `;
    FONDO.classList.remove("oculto");
    document.getElementById("m-otra").onclick = () => { FONDO.classList.add("oculto"); abrirPanel(); };
  }

  function desafioSemanal() {
    const hoy = new Date();
    const ini = new Date(hoy.getFullYear(), 0, 1);
    const semana = Math.ceil((((hoy - ini) / 86400000) + ini.getDay() + 1) / 7);
    const tipo = DESAFIOS_SEMANALES[semana % DESAFIOS_SEMANALES.length];
    const casa = Estado.casaActual();
    return {
      key: hoy.getFullYear() + "-S" + semana,
      tipo,
      destino: casa ? casa.coords : [-39.81429, -73.24592],
      destinoNombre: casa ? casa.nombre + " (tu casa)" : "Plaza de la República"
    };
  }

  function comenzarDesafio(d, idDes) {
    const m = Object.assign({
      id: idDes,
      nombre: "⚔️ Desafío: " + d.tipo.nombre,
      desc: d.tipo.desc,
      nivel: Estado.perfil.nivel,
      destino: d.destino,
      destinoNombre: d.destinoNombre,
      limiteMin: 45
    }, d.tipo.mod || {});
    if (d.tipo.id === "partida-sorpresa") {
      const otros = HITOS.filter(h => h.id !== "insat");
      m.origen = otros[Math.floor(Math.random() * otros.length)].coords;
    }
    comenzar(m);
  }

  function activar() { abrirPanel(); }

  document.getElementById("btn-perdido").addEventListener("click", perdido);
  document.getElementById("btn-abandonar").addEventListener("click", abandonar);

  return { activar };
})();
