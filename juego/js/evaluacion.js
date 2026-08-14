const Evaluacion = (() => {
  const MODAL = document.getElementById("modal");
  const FONDO = document.getElementById("modal-fondo");

  function puerta() {
    const a = 4 + Math.floor(Math.random() * 9);
    const b = 3 + Math.floor(Math.random() * 9);
    MODAL.innerHTML = `
      <div class="modal-categoria">EVALUACIÓN PILOTO · ACCESO DOCENTE</div>
      <div class="modal-titulo" style="font-size:15px">Verificación simple</div>
      <div class="modal-cuerpo">Resuelve para comenzar la evaluación con el curso: <b>${a} + ${b} = ?</b></div>
      <input class="campo" id="resp-eval-puerta" inputmode="numeric" placeholder="Respuesta">
      <button class="btn primario pequeno" id="entrar-eval" style="width:100%">Comenzar evaluación</button>
      <button class="btn secundario pequeno" id="cancelar-eval" style="width:100%">Cancelar</button>
    `;
    FONDO.classList.remove("oculto");
    const resp = document.getElementById("resp-eval-puerta");
    resp.focus();
    const intentar = () => {
      if (Number(resp.value) === a + b) { FONDO.classList.add("oculto"); jugar(); }
      else brindis("Respuesta incorrecta");
    };
    document.getElementById("entrar-eval").onclick = intentar;
    resp.onkeydown = (e) => { if (e.key === "Enter") intentar(); };
    document.getElementById("cancelar-eval").onclick = () => FONDO.classList.add("oculto");
  }

  function jugar() {
    let idx = 0, aciertos = 0;
    const fase = Estado.progreso.evalPre ? "post" : "pre";
    Despachador.decir(fase === "pre"
      ? "Evaluación inicial. Sin presión: es para medir desde dónde partimos."
      : "Evaluación final. A mostrarnos todo lo aprendido.");

    function pregunta() {
      if (idx >= PREGUNTAS_EVAL.length) return terminar();
      const q = PREGUNTAS_EVAL[idx];
      MODAL.innerHTML = `
        <div class="modal-categoria">${q.categoria} · PREGUNTA ${idx + 1}/${PREGUNTAS_EVAL.length} · ${fase === "pre" ? "INICIAL" : "FINAL"}</div>
        <div class="modal-titulo" style="font-size:15px">${q.pregunta}</div>
        <div id="eval-ops"></div>
      `;
      const cont = document.getElementById("eval-ops");
      q.opciones.forEach((op, i) => {
        const b = document.createElement("button");
        b.className = "opcion";
        b.textContent = op;
        b.onclick = () => {
          const ok = i === q.correcta;
          if (ok) aciertos++;
          cont.querySelectorAll(".opcion").forEach((x, xi) => {
            x.disabled = true;
            if (xi === q.correcta) x.classList.add("ok");
            else if (xi === i) x.classList.add("mal");
          });
          const fb = document.createElement("div");
          fb.className = "feedback " + (ok ? "ok" : "mal");
          fb.textContent = q.porque;
          MODAL.appendChild(fb);
          const btn = document.createElement("button");
          btn.className = "btn primario pequeno";
          btn.style.width = "100%";
          btn.textContent = idx === PREGUNTAS_EVAL.length - 1 ? "Ver resultado" : "Siguiente";
          btn.onclick = () => { idx++; pregunta(); };
          MODAL.appendChild(btn);
        };
        cont.appendChild(b);
      });
      FONDO.classList.remove("oculto");
    }

    function terminar() {
      const pct = Math.round(aciertos / PREGUNTAS_EVAL.length * 100);
      const reg = { fecha: new Date().toISOString(), puntaje: pct };
      if (fase === "pre") Estado.progreso.evalPre = reg;
      else Estado.progreso.evalPost = reg;
      Estado.guardar();
      MODAL.innerHTML = `
        <div class="modal-categoria">EVALUACIÓN ${fase === "pre" ? "INICIAL" : "FINAL"} COMPLETADA</div>
        <div class="estrellas-grande">${aciertos}/${PREGUNTAS_EVAL.length}</div>
        <div class="modal-cuerpo" style="text-align:center">${pct}% de acierto. El resultado quedó guardado en el progreso (se incluye en el código MV1 para el panel docente).</div>
        <button class="btn primario pequeno" id="cerrar-eval" style="width:100%">Listo</button>
      `;
      FONDO.classList.remove("oculto");
      document.getElementById("cerrar-eval").onclick = () => FONDO.classList.add("oculto");
      Despachador.decir(fase === "pre"
        ? "Línea base registrada. De aquí para arriba."
        : pct >= 80 ? "¡Excelente avance! Eso es autonomía de verdad." : "Buen cierre. A repasar lo que falló y queda perfecto.");
    }

    pregunta();
  }

  document.getElementById("btn-eval").addEventListener("click", puerta);

  return {};
})();
