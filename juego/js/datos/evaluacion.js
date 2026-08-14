// Instrumento de evaluación pre/post piloto (anónimo, mismo flujo que el juego).
// 10 preguntas: orientación por hitos, evacuación, emergencias, protocolos y micros.
const PREGUNTAS_EVAL = [
  {
    categoria: "ORIENTACIÓN",
    pregunta: "¿Cuál de estos hitos conecta el centro de Valdivia con la Isla Teja?",
    opciones: ["Mercado Fluvial", "Puente Pedro de Valdivia", "Torreón Los Canelos", "Terminal de buses"],
    correcta: 1,
    porque: "El puente Pedro de Valdivia une el centro con la Isla Teja cruzando el río Valdivia."
  },
  {
    categoria: "ORIENTACIÓN",
    pregunta: "Estás en la Plaza de la República y quieres ir al Mercado Fluvial. ¿Hacia dónde caminas?",
    opciones: ["Hacia el río (oeste), bajando a la costanera", "Hacia Picarte (sur)", "Hacia la estación (este)", "Hacia Isla Teja cruzando primero todo el centro"],
    correcta: 0,
    porque: "El Mercado Fluvial está en la costanera, al oeste (río) de la plaza."
  },
  {
    categoria: "EVACUACIÓN",
    pregunta: "Suena la alarma de tsunami y estás en la costanera. ¿Qué haces?",
    opciones: ["Quedarme a mirar el río", "Subir de inmediato a terreno alto por la ruta señalizada", "Esperar un mensaje en el grupo del curso", "Buscar la micro al centro"],
    correcta: 1,
    porque: "En Valdivia se evacúa hacia arriba: la costanera es zona baja y peligrosa con alarma activa."
  },
  {
    categoria: "EMERGENCIAS",
    pregunta: "Ves a alguien inconsciente en la vereda. ¿A qué número llamas?",
    opciones: ["133", "134", "131", "147"],
    correcta: 2,
    porque: "131 es SAMU: emergencias médicas, con guía telefónica de primeros auxilios."
  },
  {
    categoria: "EMERGENCIAS",
    pregunta: "Te robaron el celular hace un minuto y hay testigos. ¿Qué número es el correcto?",
    opciones: ["131", "133", "134", "112"],
    correcta: 1,
    porque: "133 (Carabineros): delitos en curso o recién ocurridos. Guarda hora, lugar y descripción."
  },
  {
    categoria: "PROTOCOLO",
    pregunta: "Termina un terremoto fuerte de noche mientras vuelves a casa. ¿Cuál es tu prioridad en Valdivia?",
    opciones: ["Volver a casa corriendo en la oscuridad", "Prepararse para evacuar a terreno alto con linterna y zapatos", "Llamar a todos mis contactos", "Entrar al edificio más cercano a dormir"],
    correcta: 1,
    porque: "Tras un sismo fuerte en Valdivia la prioridad es la evacuación a terreno alto, con calma y visibilidad."
  },
  {
    categoria: "AUTONOMÍA",
    pregunta: "Tu celular se apagó a mitad de camino. ¿Cuál es tu mejor herramienta para llegar?",
    opciones: ["El mapa mental de mi ruta con hitos, practicado de antemano", "Pedir el celular a cualquier persona en la calle", "Esperar donde estoy a que me encuentren", "Caminar rápido sin rumbo"],
    correcta: 0,
    porque: "El mapa mental no necesita batería: hitos, calles principales y referencias practicadas."
  },
  {
    categoria: "MICROS",
    pregunta: "La Línea 20 de Valdivia une el centro con…",
    opciones: ["Torobayo", "Niebla", "Las Ánimas", "Collico"],
    correcta: 1,
    porque: "La Línea 20 recorre Valdivia ⇄ Niebla (recorrido real del juego, tomado de OSM)."
  },
  {
    categoria: "EVACUACIÓN",
    pregunta: "¿Cuál de estos lugares NO es un punto seguro ante alarma de tsunami?",
    opciones: ["Zona alta de la Isla Teja (campus/botánico)", "Zona alta de Collico", "La ribera o costanera del río", "Zona alta de Las Ánimas"],
    correcta: 2,
    porque: "La ribera es zona baja de posible inundación: siempre se evacúa a terrenos altos."
  },
  {
    categoria: "PROTOCOLO",
    pregunta: "Te perdiste en un barrio desconocido. ¿Cuál es el PRIMER paso del protocolo?",
    opciones: ["Caminar rápido hasta reconocer algo", "Detenerse y no seguir sin rumbo", "Gritar pidiendo ayuda", "Tomar el primer taxi que pase"],
    correcta: 1,
    porque: "Primero detenerse; luego buscar un referente visible y pedir ayuda en un local establecido."
  }
];
