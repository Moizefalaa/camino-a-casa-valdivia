const Explorar = (() => {
  const MODAL = document.getElementById("modal");
  const FONDO = document.getElementById("modal-fondo");

  function activar() {
    document.getElementById("titulo-mapa").textContent = "Explora Valdivia";
    document.getElementById("panel-misiones").classList.add("oculto");
    document.getElementById("hud-mision").classList.add("oculto");
    MapaValdivia.limpiarJugador();
    MapaValdivia.iniciar();
    MapaValdivia.encoger();
    Despachador.decir(MENSAJES_RADIO.explorar);
  }

  function mostrarFicha(hito) {
    MODAL.innerHTML = `
      <div class="modal-categoria">HITO · ${hito.sector}</div>
      <div class="modal-titulo">${hito.emoji} ${hito.nombre}</div>
      <div class="modal-cuerpo">
        ${hito.descripcion}
        <div class="dato-curioso"><b>¿Por qué me sirve para ubicarme?</b><br>${hito.porque}</div>
        <div style="margin-top:8px;font-size:11px;color:#aab">Fuente: ${hito.fuente}</div>
      </div>
      <button class="btn primario pequeno" id="cerrar-ficha" style="width:100%">Entendido</button>
    `;
    FONDO.classList.remove("oculto");
    document.getElementById("cerrar-ficha").onclick = () => FONDO.classList.add("oculto");
  }

  return { activar, mostrarFicha };
})();
