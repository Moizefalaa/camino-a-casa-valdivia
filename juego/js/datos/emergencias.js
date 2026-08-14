const ESCENARIOS_EMERGENCIA = [
  {
    categoria: "EMERGENCIA MÉDICA",
    escenario: "Ves a alguien inconsciente en la vereda, no responde.",
    opciones: ["131 · SAMU", "133 · Carabineros", "134 · Bomberos"],
    correcta: 0,
    porque: "El 131 (SAMU) atiende emergencias médicas y guía los primeros auxilios por teléfono."
  },
  {
    categoria: "SEGURIDAD",
    escenario: "Te quitaron el celular a la salida del colegio y hay testigos.",
    opciones: ["134 · Bomberos", "133 · Carabineros", "147 · Fono Infancia"],
    correcta: 1,
    porque: "Un delito en curso o recién ocurrido se denuncia al 133. Guarda el detalle: hora, lugar, descripción."
  },
  {
    categoria: "INCENDIO",
    escenario: "Ves humo saliendo de una casa en tu barrio.",
    opciones: ["131 · SAMU", "112 · Celular", "134 · Bomberos"],
    correcta: 2,
    porque: "El 134 es Bomberos: da la dirección exacta y no te acerques al fuego."
  },
  {
    categoria: "APOYO INFANTIL Y ADOLESCENTE",
    escenario: "Sientes que te amenazan o acosan y necesitas orientación confidencial. Tienes 15 años.",
    opciones: ["147 · Fono Infancia", "134 · Bomberos", "131 · SAMU"],
    correcta: 0,
    porque: "El 147 (Fono Infancia, hasta 18 años) orienta en situaciones de amenaza, acoso o maltrato."
  },
  {
    categoria: "GENERAL",
    escenario: "Vas en la bici por la ruta 206, hay un accidente con heridos y tu compañía no tiene señal.",
    opciones: ["No se puede llamar sin señal", "112 · Emergencias", "147 · Fono Infancia"],
    correcta: 1,
    porque: "El 112 funciona desde celulares incluso con señal limitada: atiende emergencias de todo tipo."
  },
  {
    categoria: "PROTOCOLO",
    escenario: "Te perdiste en un barrio que no conoces y tu celular murió.",
    opciones: [
      "Caminar rápido sin rumbo hasta reconocer algo",
      "Detenerse, buscar un hito visible, entrar a un local establecido y pedir ayuda",
      "Esperar en la esquina a que alguien te encuentre"
    ],
    correcta: 1,
    porque: "Protocolo 'me perdí': detenerse, identificar un referente (calle, hito, letrero), buscar un local con gente y pedir ayuda."
  },
  {
    categoria: "TERREMOTO",
    escenario: "Estás en la vereda del centro cuando empieza un terremoto fuerte.",
    opciones: [
      "Ir a zona abierta y luego seguir señalización hacia terreno alto",
      "Agarrarse de un poste",
      "Entrar al edificio más cercano"
    ],
    correcta: 0,
    porque: "Alejarse de fachadas y postes, ir a zona abierta y, en Valdivia, prepararse para evacuar hacia arriba."
  },
  {
    categoria: "NOCHE",
    escenario: "Saliste tarde de una juntas y la micro ya no pasa.",
    opciones: [
      "Caminar solo por la ribera del río, es más corto",
      "Llamar a tu contacto de confianza y esperar en un local iluminado o paradero con gente",
      "Aceptar el primer auto que se detenga"
    ],
    correcta: 1,
    porque: "De noche: rutas conocidas y con gente, avisa a tu contacto dónde estás y qué plan tienes."
  }
];

const PROTOCOLOS = [
  {
    id: "perdido",
    titulo: "Me perdí",
    emoji: "🧭",
    intro: "Estás en un barrio que no conoces. Ordena los pasos del protocolo.",
    pasos: [
      "Detenerse y respirar: no caminar sin rumbo",
      "Buscar un referente visible: calle con nombre, hito, letrero",
      "Ubicarme en el mapa mental desde ese referente",
      "Si no resulta: entrar a un local establecido y pedir ayuda",
      "Avisar a mi contacto de confianza dónde estoy"
    ]
  },
  {
    id: "bateria",
    titulo: "Sin batería",
    emoji: "🔋",
    intro: "Tu celular se apagó en pleno trayecto. Ordena qué hacer.",
    pasos: [
      "Mantener la calma: conozco mi ruta, la practiqué sin GPS",
      "Identificar el último hito que reconozco",
      "Continuar por la ruta conocida usando referencias visibles",
      "Al llegar a un comercio, pedir prestado un teléfono si es urgente",
      "Al llegar a casa, avisar a mi contacto y cargar un número en memoria"
    ]
  },
  {
    id: "sismo-dia",
    titulo: "Terremoto de día",
    emoji: "🌄",
    intro: "Sismo fuerte mientras caminas de día por el centro. Ordena los pasos.",
    pasos: [
      "Alejarse de fachadas, vidrios y postes",
      "Ir a zona abierta más cercana y esperar el término del sacudón",
      "Evaluar el entorno: heridos, cables, daños",
      "En Valdivia: ante alarma o cercanía al río, caminar a terreno alto",
      "Avisar a mi contacto que estoy bien (mensaje corto)"
    ]
  },
  {
    id: "sismo-noche",
    titulo: "Terremoto de noche",
    emoji: "🌙",
    intro: "Te sorprende de noche volviendo a casa. Ordena los pasos.",
    pasos: [
      "Agacharse, cubrirse y sujetarse lejos de ventanas",
      "Esperar el sacudón sin salir corriendo a oscuras",
      "Usar la linterna del celular (si tiene carga) y zapatos",
      "Evacuar hacia terreno alto siguiendo la señalización reflectante",
      "Reunirse en el punto de encuentro familiar"
    ]
  }
];
