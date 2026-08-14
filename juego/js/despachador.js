const Despachador = (() => {
  let activo = true;
  let vozActiva = false;
  let conPersonaje = true;
  let tOcultar = null;
  let tBoca = null;

  function cont() { return document.getElementById("narrador"); }
  function pj() { return document.getElementById("personaje"); }

  function vozElegida() {
    if (!window.speechSynthesis) return null;
    const vs = speechSynthesis.getVoices();
    return vs.find(v => /^es[-_]CL/i.test(v.lang)) ||
           vs.find(v => /^es[-_]419/i.test(v.lang)) ||
           vs.find(v => /^es[-_]/i.test(v.lang)) ||
           null;
  }

  function configurar(perfil) {
    activo = perfil.radio !== false;
    vozActiva = !!perfil.voz;
    conPersonaje = perfil.personaje !== false;
    if (!activo) {
      ocultar();
      if (window.speechSynthesis) speechSynthesis.cancel();
    }
  }

  function ocultar() {
    const c = cont();
    if (c) c.classList.add("oculto");
    pararBoca();
  }

  function mostrar(msj) {
    const c = cont();
    if (!c) return;
    document.getElementById("globo-msj").textContent = msj;
    pj().classList.toggle("oculto", !conPersonaje);
    c.classList.remove("oculto");
  }

  function programarOcultar(ms) {
    clearTimeout(tOcultar);
    tOcultar = setTimeout(ocultar, ms || 9000);
  }

  function animarBoca(durMs) {
    const p = pj();
    if (!p || !conPersonaje) return;
    clearInterval(tBoca);
    const fin = Date.now() + durMs;
    tBoca = setInterval(() => {
      if (Date.now() > fin) { p.classList.remove("boca-abierta"); clearInterval(tBoca); return; }
      p.classList.toggle("boca-abierta");
    }, 105);
  }

  function pararBoca() {
    clearInterval(tBoca);
    const p = pj();
    if (p) p.classList.remove("boca-abierta");
  }

  function decir(msj) {
    if (!activo) return;
    mostrar(msj);
    const palabras = msj.trim().split(/\s+/).length;

    if (vozActiva && window.speechSynthesis) {
      try {
        speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(msj);
        const v = vozElegida();
        if (v) { u.voice = v; u.lang = v.lang; } else { u.lang = "es-CL"; }
        u.rate = 1.03;
        u.pitch = 1.0;
        let bocaSincronizada = false;
        u.onboundary = () => { bocaSincronizada = true; animarBoca(160); };
        u.onend = () => { pararBoca(); programarOcultar(2500); };
        u.onerror = () => { pararBoca(); programarOcultar(2500); };
        speechSynthesis.speak(u);
        setTimeout(() => {
          if (speechSynthesis.speaking && !bocaSincronizada) animarBoca(palabras * 340 + 700);
        }, 400);
        programarOcultar(Math.max(9000, palabras * 400 + 3000));
        return;
      } catch (e) { /* sin voz: continúa en mudo */ }
    }
    const dur = palabras * 300 + 700;
    animarBoca(dur);
    programarOcultar(dur + 2500);
  }

  return { decir, configurar };
})();
