# Modo Valdivia

Juego web educativo para adolescentes (13–19 años) de Valdivia, Chile: aprenden a moverse de forma segura por su ciudad (rutas, hitos, micros, emergencias y evacuación) sobre el mapa real de OpenStreetMap. Colegio piloto: **INSAT Valdivia** (Domeyko 398).

## Cómo ejecutar

Opción A (recomendada, desde la carpeta `juego/`):

```
python -m http.server 8090
```

Abrir http://localhost:8090

Opción B: abrir `juego/index.html` directamente en el navegador (funciona; el mapa necesita internet para los tiles de OpenStreetMap).

## Estructura

```
camino-a-casa-valdivia/
├── docs/
│   ├── documento-diseno.md    GDD v0.3 (decisiones resueltas)
│   └── wireframes.html        Wireframes navegables (abrir en navegador)
└── juego/
    ├── index.html             Punto de entrada (SPA sin build)
    ├── css/estilo.css         Estética minimalista tipo mapa
    ├── vendor/leaflet/        Leaflet 1.9.4 vendido (funciona sin npm)
    └── js/
        ├── datos/             TODO el contenido editable (sin tocar código)
        │   ├── hitos.js       Hitos con coordenadas reales (OSM/Nominatim)
        │   ├── evacuacion.js  Capa de tsunami simplificada + mensajes de radio
        │   ├── misiones.js    Misiones, checkpoints y eventos de seguridad
        │   ├── emergencias.js Escenarios del minijuego "¿A quién llamo?"
        │   └── galeria.js     Piezas culturales desbloqueables
        ├── despachador.js     Radio Estuario (narrador) + voz opcional
        ├── mapa.js            Mapa Leaflet, capas, jugador
        ├── explorar.js        Modo Explora
        ├── mision.js          Motor de misiones (decisiones, reloj, micros, eventos)
        ├── datos-seguros.js   Minijuegos de datos y emergencias
        └── main.js            Navegación, ajustes, galería, certificado
```

## Privacidad

Sin cuentas, sin servidor, sin analítica. Todo (progreso, casa referencial, dirección practicada) vive en `localStorage` del dispositivo.

## Estado (MVP v0.2)

- [x] Mapa real OSM (Leaflet vendido local)
- [x] **Tiles offline**: 495 tiles de Valdivia (z13–z16, 6,6 MB) ya descargados en `juego/tiles/`; el mapa carga local primero y solo usa internet si falta un tile. Repetir/actualizar: `python herramientas/descargar-tiles.py`
- [x] 12 hitos con fichas (coordenadas OSM reales; 2 marcadas "aprox" pendientes de validación)
- [x] Modo Explorar + capa evacuación + capa micros (paraderos demo)
- [x] 5 misiones (3 guionizadas + 2 generadas hacia tu casa) con reloj, saldo, batería, brújula (Nivel 1), micro jugable y eventos de seguridad
- [x] **Rutas por calles reales** en misiones generadas: consulta a OSRM (servicio demo público) y traza checkpoints sobre la vía real; sin internet cae a línea recta (fallback)
- [x] **Modo nocturno** en la misión "De noche y sin micro" (mapa oscurecido, reloj 21:15)
- [x] Módulo Mis Datos Seguros completo: ¿A quién llamo? · Arma tu dirección · **Tarjetas de memoria (contactos)** · **Protocolos (4 simulacros ordenables)**
- [x] Radio Estuario con **Cuelli**: narrador animado (cisne de cuello negro, SVG original de libre uso) que flota, parpadea y mueve el pico sincronizado con la voz TTS (Web Speech API del navegador, gratis). Tres ajustes: mensajes, personaje y voz.
- [x] Galería Valdivia (8 piezas culturales) + certificado imprimible
- [x] **Micros reales**: 5 líneas en `js/datos/micros.js` — Línea 20 Niebla⇄Valdivia (39 paradas, recorrido real OSM) + 4 corredores referenciales (Picarte, Las Ánimas, Guacamayo, Collico) trazados sobre paraderos reales, marcados "validar INSAT". Al abordar eliges la línea por nombre y te baja en la parada más cercana a tu destino. Regenerar/corregir: `python herramientas/generar-micros.py` o editar el JS a mano.
- [x] Guía docente imprimible (`docs/guia-docente.html`) para el piloto INSAT
- [x] **Bici jugable**: al partir cada misión eliges 🚶/🚲 (la bici va a ~4,5 min/km vs ~13 caminando, marcador 🚴 y 2 eventos propios: cadena suelta y ciclovía, solo en bici)
- [x] **8 misiones**: 4 guionizadas + "Llega a casa", "De noche sin micro", "Puente Calle-Calle al sur", "La ruta del turista" y "1960: evacuación" (arranca con alarma de tsunami real desde la plaza, 15 min de límite)
- [x] **Desafío de la semana**: 5 variantes que rotan automáticamente por semana ISO (contrarreloj, sin un peso, a pie y a oscuras, sin brújula, partida sorpresa en un hito al azar), con card destacado en Misiones y estrellas propias
- [x] Panel docente anónimo (sin servidor): cada estudiante exporta desde ⚙️ un código anónimo (`MV1 …`, sin nombre ni datos personales) y el docente los importa en ⚙️ → Panel docente (puerta con suma simple): métricas del curso (misiones, estrellas, quiz de emergencias, contactos, galería), tabla por ID anónimo, CSV descargable e informe imprimible
- [ ] Corredores referenciales de micro validados en terreno (tarea Fase 0 con INSAT)
- [ ] Routing peatonal local propio (OSRM demo usa perfil auto; para offline total, servidor OSRM local — Fase 2)
