const HITOS = [
  {
    id: "insat",
    nombre: "INSAT Valdivia",
    categoria: "partida",
    emoji: "🏫",
    coords: [-39.82569, -73.24657],
    sector: "Isla Teja / Domeyko",
    tipo: "partida",
    descripcion: "Tu punto de partida. Liceo técnico profesional: Administración, Servicios de Turismo y Conectividad y Redes. Domeyko 398.",
    porque: "Es tu base: toda misión parte de acá. Reconocer su entorno (salida, esquina, paradero más cercano) es el primer paso de autonomía.",
    fuente: "OSM"
  },
  {
    id: "plaza",
    nombre: "Plaza de la República",
    categoria: "urbano",
    emoji: "🌳",
    coords: [-39.81429, -73.24592],
    sector: "Centro",
    tipo: "urbano",
    descripcion: "La plaza de armas de Valdivia, corazón del centro. Alrededor: intendencia, catedral y comercio.",
    porque: "Si alguna vez te desorientas en el centro, caminar hacia la plaza siempre te reordena: de ahí salen las calles principales.",
    fuente: "OSM"
  },
  {
    id: "catedral",
    nombre: "Catedral de Valdivia",
    categoria: "historico",
    emoji: "⛪",
    coords: [-39.81394, -73.24662],
    sector: "Centro",
    tipo: "urbano",
    descripcion: "Catedral junto a la plaza, con su torre visible desde varias cuadras.",
    porque: "Su torre es un buen 'hito visual': las torres y edificios altos se ven de lejos y ayudan a saber hacia dónde vas.",
    fuente: "OSM"
  },
  {
    id: "mercado",
    nombre: "Mercado Fluvial",
    categoria: "urbano",
    emoji: "🛶",
    coords: [-39.81285, -73.24836],
    sector: "Centro / Costanera",
    tipo: "urbano",
    descripcion: "Mercado junto al río con productos locales: pescados, mariscos, artesanía y comida.",
    porque: "Está en la costanera: si lo ves, sabes que tienes el río Calle-Calle a un lado y el centro al otro.",
    fuente: "OSM"
  },
  {
    id: "costanera",
    nombre: "Costanera Arturo Prat",
    categoria: "natural",
    emoji: "🌊",
    coords: [-39.8120, -73.2486],
    sector: "Centro / Costanera",
    tipo: "urbano",
    descripcion: "Paseo peatonal junto al río: mercado fluvial, vista a los puentes y al paseo peatonal.",
    porque: "Referencia lineal: si caminas por la costanera siempre sabes dónde está el río y hacia qué lado queda el centro.",
    fuente: "aprox"
  },
  {
    id: "puente-pedro-de-valdivia",
    nombre: "Puente Pedro de Valdivia",
    categoria: "transporte",
    emoji: "🌉",
    coords: [-39.81151, -73.24896],
    sector: "Centro ↔ Isla Teja",
    tipo: "urbano",
    descripcion: "El puente ícono de la ciudad, con pasarela peatonal. Une el centro con la Isla Teja.",
    porque: "Punto clave de cruce peatonal: úsalo para cruzar con calma por la pasarela, nunca por la calzada.",
    fuente: "OSM"
  },
  {
    id: "uach",
    nombre: "Universidad Austral de Chile",
    categoria: "urbano",
    emoji: "🎓",
    coords: [-39.80465, -73.25081],
    sector: "Isla Teja",
    tipo: "urbano",
    descripcion: "Campus Isla Teja de la UACh, con amplios espacios verdes y facultades.",
    porque: "Gran referencia del norte de la Isla Teja; su campus es zona alta respecto al río.",
    fuente: "OSM"
  },
  {
    id: "jardin",
    nombre: "Jardín Botánico UACh",
    categoria: "natural",
    emoji: "🌲",
    coords: [-39.80400, -73.24991],
    sector: "Isla Teja",
    tipo: "urbano",
    descripcion: "Bosque nativo valdiviano protegido, con senderos y el humedal del botánico.",
    porque: "Zona verde y alta de la Isla Teja: punto seguro en un escenario de evacuación.",
    fuente: "OSM"
  },
  {
    id: "torreon",
    nombre: "Torreón Los Canelos",
    categoria: "historico",
    emoji: "🏰",
    coords: [-39.81774, -73.24864],
    sector: "Centro",
    tipo: "urbano",
    descripcion: "Resto de las fortificaciones coloniales españolas, en medio de una plaza jardín.",
    porque: "Hito histórico visible desde la General Lagos: te avisa que ya estás cerca del centro.",
    fuente: "OSM"
  },
  {
    id: "estacion",
    nombre: "Estación de Ferrocarriles",
    categoria: "historico",
    emoji: "🚂",
    coords: [-39.8165, -73.2405],
    sector: "Centro",
    tipo: "urbano",
    descripcion: "Antigua estación de ferrocarriles, hoy centro cultural (CORFUDI)." ,
    porque: "Referencia del sector oriente del centro; su estructura es fácil de reconocer.",
    fuente: "aprox (validar Fase 0)"
  },
  {
    id: "picarte",
    nombre: "Av. Picarte",
    categoria: "transporte",
    emoji: "🛣️",
    coords: [-39.8320, -73.2430],
    sector: "Picarte",
    tipo: "urbano",
    descripcion: "Eje vial sur de la ciudad, alto tránsito: comercio, colegios y poblaciones.",
    porque: "Eje mayor del sector sur: cruza siempre en pasarelas o cruces habilitados.",
    fuente: "aprox"
  },
  {
    id: "terminal",
    nombre: "Terminal de Buses",
    categoria: "transporte",
    emoji: "🚌",
    coords: [-39.8225, -73.2415],
    sector: "Centro-sur",
    tipo: "urbano",
    descripcion: "Terminal interurbano de Valdivia: llegadas y salidas regionales.",
    porque: "Hito de movilidad: si viajas o recibes a alguien, este es tu referente.",
    fuente: "aprox (validar Fase 0)"
  }
];

const SECTORES_CASA = [
  { id: "centro", nombre: "Centro · Plaza de la República", coords: [-39.8143, -73.2459] },
  { id: "isla-teja", nombre: "Isla Teja · Campus UACh", coords: [-39.8047, -73.2508] },
  { id: "collico", nombre: "Collico", coords: [-39.8155, -73.2560] },
  { id: "las-animas", nombre: "Las Ánimas · Av. Argentina", coords: [-39.8340, -73.2330] },
  { id: "guacamayo", nombre: "Guacamayo", coords: [-39.8210, -73.2220] },
  { id: "picarte", nombre: "Picarte · Las Mulatas", coords: [-39.8350, -73.2450] },
  { id: "torobayo", nombre: "Torobayo", coords: [-39.8450, -73.2600] },
  { id: "cruces", nombre: "Cruces", coords: [-39.8550, -73.2550] }
];

const PARADEROS = [
  { nombre: "Paradero Domeyko / INSAT", coords: [-39.8248, -73.2463] },
  { nombre: "Paradero General Lagos", coords: [-39.8185, -73.2460] },
  { nombre: "Paradero Plaza de Armas", coords: [-39.8147, -73.2450] },
  { nombre: "Paradero Costanera / Mercado", coords: [-39.8124, -73.2480] },
  { nombre: "Paradero Picarte", coords: [-39.8300, -73.2435] },
  { nombre: "Paradero Terminal", coords: [-39.8220, -73.2418] },
  { nombre: "Paradero Isla Teja / UACh", coords: [-39.8065, -73.2500] }
];
