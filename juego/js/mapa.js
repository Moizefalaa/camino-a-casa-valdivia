const MapaValdivia = (() => {
  let mapa = null;
  let capaHitos = null;
  let capaEvac = null;
  let capaMicros = null;
  let marcadorJugador = null;
  let lineaRuta = null;
  let marcadorDestino = null;

  function iniciar() {
    if (mapa) return;
    mapa = L.map("mapa", { zoomControl: true, attributionControl: true }).setView([-39.817, -73.247], 14);
    const tiles = L.tileLayer("tiles/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap"
    }).addTo(mapa);
    tiles.on("tileerror", (e) => {
      const t = e.tile;
      if (t && !t.dataset.fb) {
        t.dataset.fb = "1";
        t.src = "https://tile.openstreetmap.org/" + e.coords.z + "/" + e.coords.x + "/" + e.coords.y + ".png";
      }
    });

    capaHitos = L.layerGroup().addTo(mapa);
    capaEvac = L.layerGroup();
    capaMicros = L.layerGroup();
    _poblarHitos();
    _poblarEvacuacion();
    _poblarMicros();
    setTimeout(() => mapa.invalidateSize(), 120);
  }

  function _icono(hito) {
    const cls = hito.categoria === "partida" ? "pin-partida" : "pin-" + hito.categoria;
    return L.divIcon({
      className: "",
      html: `<div class="pin-hito ${cls}"><span>${hito.emoji}</span></div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 28],
      popupAnchor: [0, -26]
    });
  }

  function _poblarHitos() {
    HITOS.forEach(h => {
      const m = L.marker(h.coords, { icon: _icono(h) });
      m.bindPopup(`<b>${h.emoji} ${h.nombre}</b><br>${h.descripcion}<br><i style="color:#778">${h.sector}</i>`);
      m.on("click", () => Explorar.mostrarFicha(h));
      capaHitos.addLayer(m);
    });
  }

  function _poblarEvacuacion() {
    EVACUACION.inundacion.forEach(poly => {
      L.polygon(poly, { color: "#2c6e8f", fillColor: "#7fb3c8", fillOpacity: 0.3, weight: 2, dashArray: "6 4" })
        .bindPopup("<b>▦ Zona de inundación (baja)</b><br>En alarma de tsunami: NO estar acá.")
        .addTo(capaEvac);
    });
    EVACUACION.zonasAltas.forEach(z => {
      L.polygon(z.coords, { color: "#3d8b5f", fillColor: "#9fd6b6", fillOpacity: 0.25, weight: 2, dashArray: "3 5" })
        .bindPopup(`<b>▲ ${z.nombre}</b><br>Zona alta: punto seguro ante tsunami.`)
        .addTo(capaEvac);
    });
    EVACUACION.rutas.forEach(r => {
      L.polyline(r.coords, { color: "#3d8b5f", weight: 4, dashArray: "2 8", opacity: 0.9 })
        .bindPopup(`<b>↑ ${r.nombre}</b><br>Sigue las flechas hacia terreno alto.`)
        .addTo(capaEvac);
    });
  }

  function _poblarMicros() {
    PARADEROS.forEach(p => {
      L.circleMarker(p.coords, { radius: 6, color: "#d97b3f", fillColor: "#f5c9a8", fillOpacity: 1, weight: 2 })
        .bindPopup(`<b>🚌 ${p.nombre}</b>`)
        .addTo(capaMicros);
    });
  }

  function alternarCapa(nombre) {
    if (!mapa) return;
    const capas = { hitos: capaHitos, evac: capaEvac, micros: capaMicros };
    const c = capas[nombre];
    if (mapa.hasLayer(c)) mapa.removeLayer(c); else c.addTo(mapa);
    return mapa.hasLayer(c);
  }

  function centrar(coords, zoom) {
    if (!mapa) return;
    mapa.setView(coords, zoom || mapa.getZoom(), { animate: true });
  }

  function jugador(coords) {
    if (!mapa) return;
    if (!marcadorJugador) {
      marcadorJugador = L.marker(coords, {
        icon: L.divIcon({ className: "", html: `<div class="pin-hito pin-jugador"><span>🚶</span></div>`, iconSize: [30, 30], iconAnchor: [15, 28] }),
        zIndexOffset: 1000
      }).addTo(mapa);
    } else {
      marcadorJugador.setLatLng(coords);
    }
    mapa.panTo(coords);
  }

  function ruta(coords) {
    if (lineaRuta) lineaRuta.remove();
    if (coords && coords.length > 1) {
      lineaRuta = L.polyline(coords, { color: "#c0524f", weight: 3, opacity: 0.7, dashArray: "4 6" }).addTo(mapa);
    }
  }

  function limpiarJugador() {
    if (marcadorJugador) { marcadorJugador.remove(); marcadorJugador = null; }
    if (lineaRuta) { lineaRuta.remove(); lineaRuta = null; }
    if (marcadorDestino) { marcadorDestino.remove(); marcadorDestino = null; }
  }

  function destino(coords, nombre) {
    if (marcadorDestino) marcadorDestino.remove();
    marcadorDestino = L.marker(coords, {
      icon: L.divIcon({ className: "", html: `<div class="pin-hito pin-jugador"><span>🏠</span></div>`, iconSize: [30, 30], iconAnchor: [15, 28] })
    }).bindPopup(`<b>🏠 ${nombre}</b><br>Objetivo de la misión`);
    marcadorDestino.addTo(mapa);
    return marcadorDestino;
  }

  function encoger() { if (mapa) setTimeout(() => mapa.invalidateSize(), 80); }

  return { iniciar, alternarCapa, centrar, jugador, ruta, limpiarJugador, destino, encoger };
})();
