const EVACUACION = {
  aviso: "Capa simplificada con fines educativos. Las zonas oficiales de inundación las define SHOA. Validar en Fase 0.",
  inundacion: [
    [
      [-39.8080, -73.2580],
      [-39.8090, -73.2470],
      [-39.8080, -73.2420],
      [-39.8100, -73.2380],
      [-39.8150, -73.2390],
      [-39.8180, -73.2430],
      [-39.8230, -73.2440],
      [-39.8330, -73.2400],
      [-39.8480, -73.2500],
      [-39.8560, -73.2620],
      [-39.8500, -73.2720],
      [-39.8350, -73.2680],
      [-39.8240, -73.2580],
      [-39.8130, -73.2520],
      [-39.8080, -73.2580]
    ]
  ],
  zonasAltas: [
    { nombre: "Zona alta Isla Teja / Botánico", coords: [[-39.8010, -73.2550], [-39.8070, -73.2550], [-39.8070, -73.2470], [-39.8010, -73.2470]] },
    { nombre: "Zona alta Collico", coords: [[-39.8140, -73.2600], [-39.8190, -73.2600], [-39.8190, -73.2540], [-39.8140, -73.2540]] },
    { nombre: "Zona alta Las Ánimas", coords: [[-39.8340, -73.2340], [-39.8400, -73.2340], [-39.8400, -73.2260], [-39.8340, -73.2260]] },
    { nombre: "Zona alta Guacamayo", coords: [[-39.8190, -73.2220], [-39.8240, -73.2220], [-39.8240, -73.2140], [-39.8190, -73.2140]] }
  ],
  rutas: [
    { nombre: "Evacuación desde el centro", coords: [[-39.8143, -73.2459], [-39.8130, -73.2490], [-39.8090, -73.2510], [-39.8050, -73.2500]] },
    { nombre: "Evacuación desde el centro (oriente)", coords: [[-39.8143, -73.2459], [-39.8170, -73.2400], [-39.8200, -73.2300], [-39.8215, -73.2200]] },
    { nombre: "Evacuación desde costanera sur", coords: [[-39.8230, -73.2440], [-39.8280, -73.2380], [-39.8340, -73.2310]] }
  ]
};

const MENSAJES_RADIO = {
  bienvenida: "¡Buenas! Radio Estuario contigo. Bienvenido a tu ciudad: explora, aprende tu ruta y llega siempre a casa.",
  explorar: "Ciudad toda tuya. Toca los pines y descubre por qué cada hito te ayuda a ubicarte.",
  evacuacionOn: "Capa de evacuación activada. Si suena la alarma, no corras al río: sube. Acá se evacúa hacia arriba, como nos enseñó el 60.",
  evacuacionOff: "Capa de evacuación desactivada. Pero el consejo queda: zona alta, siempre.",
  micros: "Paraderos y recorridos de micro a la vista. Ojo con tu saldo y baja con tiempo.",
  misionInicio: "Misión en marcha. Reloj andando, cabeza fría. Vamos.",
  misionOk: "¡Eso! Sigue esa dirección, la ciudad se te está haciendo conocida.",
  misionMal: "Mmm… equivocarse no es problema, quedarse perdido sí. Vuelve a la última esquina buena.",
  misionEvento: "Evento en curso. Respira, mira las opciones y elige con cabeza.",
  misionLlegada: "¡Llegada registrada! Así se vuelve a casa, crack.",
  perdido: "Protocolo 'me perdí': detente, busca un hito conocido, ubícate en el mapa y si hace falta, pregunta a alguien de confianza. Pedir ayuda es habilidad.",
  despachadorFin: "Radio Estuario se toma un pesero. Nos vemos en la próxima misión."
};
