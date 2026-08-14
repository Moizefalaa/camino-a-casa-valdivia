const MISIONES = [
  {
    id: "m1-plaza",
    nombre: "Primer paso: a la plaza",
    nivel: 1,
    desc: "Camina desde INSAT hasta la Plaza de la República. Ruta corta para aprender a leer las calles del centro.",
    destino: [-39.81429, -73.24592],
    destinoNombre: "Plaza de la República",
    limiteMin: 25,
    checkpoints: [
      { coords: [-39.82569, -73.24657], texto: "Sales de INSAT por Domeyko. ¿Hacia dónde partes?", correcta: "Norte", opciones: {
          "Norte": "Subes por Domeyko hacia el centro",
          "Sur": "Bajas alejándote del centro",
          "Este": "Tomas hacia Picarte, te desvías del centro"
        } },
      { coords: [-39.8230, -73.2465], texto: "Cruce en Domeyko. ¿Cómo sigues?", correcta: "Norte", opciones: {
          "Norte": "Sigues derecho, ya hueles el centro",
          "Oeste": "Giras hacia el río por calles pequeñas",
          "Sur": "Vuelves al colegio"
        } },
      { coords: [-39.8205, -73.2462], texto: "Vas bien. A unas cuadras se ve el Torreón Los Canelos. ¿Rumbo?", correcta: "Norte", opciones: {
          "Norte": "Hacia el Torreón y de ahí al centro",
          "Este": "Cruzas hacia Av. Picarte",
          "Oeste": "Bajas hacia la costanera del Calle-Calle"
        } },
      { coords: [-39.8177, -73.2460], texto: "Pasas el Torreón Los Canelos. ¿Ahora?", correcta: "Norte", opciones: {
          "Norte": "Sigues por General Lagos hacia el centro",
          "Sur": "Te devuelves",
          "Este": "Giras hacia la Estación de Ferrocarriles"
        } },
      { coords: [-39.8155, -73.2459], texto: "Entras al casco cívico. Se ve la torre de la catedral. ¿Última decisión?", correcta: "Norte", opciones: {
          "Norte": "Dos cuadras y llegas a la plaza",
          "Oeste": "Giras hacia el Mercado Fluvial",
          "Sur": "Te alejas del centro"
        } }
    ]
  },
  {
    id: "m2-mercado",
    nombre: "Costanera y Mercado Fluvial",
    nivel: 1,
    desc: "Llega desde INSAT al Mercado Fluvial pasando por el centro. Aprende la costanera como referencia.",
    destino: [-39.81285, -73.24836],
    destinoNombre: "Mercado Fluvial",
    limiteMin: 30,
    checkpoints: [
      { coords: [-39.82569, -73.24657], texto: "Partes en INSAT. ¿Dirección?", correcta: "Norte", opciones: {
          "Norte": "Por Domeyko al centro",
          "Sur": "Te alejas",
          "Este": "Hacia Picarte"
        } },
      { coords: [-39.8205, -73.2462], texto: "Vas subiendo por el eje Domeyko/General Lagos.", correcta: "Norte", opciones: {
          "Norte": "Sigues hacia el centro",
          "Oeste": "Hacia el río, antes de tiempo",
          "Sur": "De vuelta"
        } },
      { coords: [-39.8177, -73.2460], texto: "Pasas el Torreón. ¿Cómo llegas al mercado?", correcta: "Norte", opciones: {
          "Norte": "Al centro y luego giro al oeste hacia el río",
          "Este": "Hacia la estación",
          "Sur": "Mal rumbo"
        } },
      { coords: [-39.8143, -73.2459], texto: "Estás en la plaza. El mercado queda…", correcta: "Oeste", opciones: {
          "Oeste": "Bajas hacia el río: el mercado está en la costanera",
          "Norte": "Sigues derecho y te pasas",
          "Este": "Hacia la estación"
        } },
      { coords: [-39.8139, -73.2475], texto: "Bajas hacia el río, pasas cerca de la catedral. El olor a pan y marisco se acerca. ¿Rumbo final?", correcta: "Oeste", opciones: {
          "Oeste": "Directo al Mercado Fluvial en la costanera",
          "Norte": "Hacia el puente Pedro de Valdivia",
          "Sur": "Vuelta atrás"
        } }
    ]
  },
  {
    id: "m3-isla-teja",
    nombre: "Cruce a la Isla Teja",
    nivel: 1,
    desc: "Desde el centro, cruza el puente Pedro de Valdivia con calma y llega al campus UACh.",
    destino: [-39.80465, -73.25081],
    destinoNombre: "Universidad Austral de Chile",
    limiteMin: 30,
    checkpoints: [
      { coords: [-39.8143, -73.2459], texto: "Estás en la plaza. La universidad queda al otro lado del río. ¿Rumbo?", correcta: "Oeste", opciones: {
          "Oeste": "Hacia la costanera para buscar el puente",
          "Sur": "Hacia Picarte, te alejas del río",
          "Este": "Hacia la estación"
        } },
      { coords: [-39.8129, -73.2484], texto: "Pasas el Mercado Fluvial. El puente Pedro de Valdivia está a la vista. ¿Cómo cruzas?", correcta: "Norte", opciones: {
          "Norte": "Por la pasarela peatonal del puente, con calma",
          "Oeste": "Por la calzada entre los autos",
          "Sur": "No cruzo, me vuelvo"
        } },
      { coords: [-39.8115, -73.2490], texto: "Cruzando el puente: el río bajo tus pies. Al bajar, ¿hacia dónde?", correcta: "Norte", opciones: {
          "Norte": "Sigo por la Isla Teja hacia el campus UACh",
          "Sur": "Vuelvo al centro",
          "Este": "Me meto al agua, no obvio"
        } },
      { coords: [-39.8080, -73.2503], texto: "Vas por la Isla Teja, ya se ven los campos verdes del campus.", correcta: "Norte", opciones: {
          "Norte": "Sigo derecho a la universidad",
          "Oeste": "Me desvío al botánico primero",
          "Sur": "Regreso"
        } }
    ]
  },
  {
    id: "m4-casa",
    nombre: "Llega a casa",
    nivel: 0,
    desc: "Misión generada con tu casa (punto referencial). Configúrala en Ajustes si aún no lo hiciste.",
    destino: null,
    destinoNombre: "Tu casa",
    limiteMin: 40,
    checkpoints: null
  },
  {
    id: "m5-noche",
    nombre: "De noche y sin micro",
    nivel: 2,
    desc: "Se hizo de noche, la última micro no llegó y tu celular queda en 5%. Llega a casa a pie por la ruta que conoces.",
    destino: null,
    destinoNombre: "Tu casa",
    limiteMin: 50,
    checkpoints: null,
    nocturna: true,
    bateriaInicial: 5
  },
  {
    id: "m6-calle-calle",
    nombre: "Puente Calle-Calle al sur",
    nivel: 1,
    desc: "Cruza hacia el sur de la ciudad rumbo a Las Ánimas: nuevo puente, nuevas calles.",
    destino: [-39.8340, -73.2330],
    destinoNombre: "Las Ánimas · Av. Argentina",
    limiteMin: 45,
    checkpoints: null
  },
  {
    id: "m7-turista",
    nombre: "La ruta del turista",
    nivel: 1,
    desc: "Recorrido cultural: del colegio al centro por la costanera, hasta el Torreón Los Canelos.",
    destino: [-39.81774, -73.24864],
    destinoNombre: "Torreón Los Canelos",
    limiteMin: 45,
    checkpoints: null
  },
  {
    id: "m8-evacuacion",
    nombre: "1960: evacuación",
    nivel: 2,
    desc: "Sirenas en la ciudad: terremoto y alarma de tsunami. Desde la plaza, llega a terreno alto en Collico. El reloj corre como en el 60.",
    origen: [-39.81429, -73.24592],
    destino: [-39.8165, -73.2585],
    destinoNombre: "Zona alta de Collico",
    limiteMin: 15,
    checkpoints: null,
    eventoInicial: "tsunami"
  }
];

const DESAFIOS_SEMANALES = [
  { id: "contrarreloj", nombre: "Contrarreloj", desc: "El reloj apremia: tienes apenas un poco más de la mitad del tiempo habitual para llegar.", mod: { limiteFactor: 0.55 } },
  { id: "sin-un-peso", nombre: "Sin un peso", desc: "Sin saldo: ni micro ni favores. Solo tus piernas y tu mapa mental.", mod: { saldoInicial: 0 } },
  { id: "a-pie-oscuras", nombre: "A pie y a oscuras", desc: "De noche y sin un peso: veredas iluminadas y rutas conocidas.", mod: { nocturna: true, saldoInicial: 0 } },
  { id: "sin-brujula", nombre: "Sin brújula", desc: "Nada de ayudas: ni flechas ni brújula. Solo hitos y memoria.", mod: { sinBrujula: true } },
  { id: "partida-sorpresa", nombre: "Partida sorpresa", desc: "Empiezas en un hito al azar de la ciudad y debes llegar a tu casa.", mod: {} }
];

const EVENTOS = [
  {
    id: "terremoto",
    etiqueta: "⚠ EVENTO SÍSMICO",
    titulo: "Terremoto fuerte",
    texto: "El suelo tiembla mientras caminas. La gente empieza a moverse hacia la colina y se escuchan las sirenas.",
    opciones: [
      { texto: "Correr hacia el río a ver el agua", correcta: false, porque: "Nunca hacia el río: en Valdivia el riesgo de tsunami hace que la zona baja sea peligrosa." },
      { texto: "Seguir la señalización hacia terreno alto", correcta: true, porque: "Correcto: evacúa en dirección a la zona alta, con calma y sin correr." },
      { texto: "Quedarse bajo un puente", correcta: false, porque: "Los puentes pueden sufrir daños: aléjate de estructuras y sube." }
    ]
  },
  {
    id: "desconocido",
    etiqueta: "⚠ EVENTO PERSONAL",
    titulo: "Un auto te sigue",
    texto: "Un auto va lento a tu lado y el conductor insiste en ofrecerte llevarte. Te dice que te conoce.",
    opciones: [
      { texto: "Subir, no sea cosa que se enoje", correcta: false, porque: "Nunca subas a un vehículo de un desconocido, aunque diga conocerte." },
      { texto: "Ignorar, cambiar de vereda hacia un local con gente y avisar", correcta: true, porque: "Correcto: busca lugares con personas, ilumina la situación y avisa a tu contacto de confianza." },
      { texto: "Responderle y seguir conversando", correcta: false, porque: "Lo seguro es cortar la interacción y acercarte a zonas con gente." }
    ]
  },
  {
    id: "bateria",
    etiqueta: "⚠ EVENTO TECNOLÓGICO",
    titulo: "Celular sin batería",
    texto: "Tu celular se apagó. No hay mapa GPS, no hay llamadas por ahora.",
    opciones: [
      { texto: "Pánico: quedarse inmóvil en la esquina", correcta: false, porque: "Sin celular también sabes moverte: por eso practicamos rutas con hitos y memoria." },
      { texto: "Seguir tu ruta con los hitos que ya conoces", correcta: true, porque: "Correcto: esta es la razón del juego. Tu mapa mental no necesita batería." },
      { texto: "Pedirle el celular a un desconocido cualquiera en la calle", correcta: false, porque: "Si necesitas llamar, busca un local establecido o personal identificado." }
    ]
  },
  {
    id: "calle-cerrada",
    etiqueta: "⚠ EVENTO DE RUTA",
    titulo: "Calle cerrada",
    texto: "Tu ruta habitual está cerrada por trabajos. Hay desvío peatonal.",
    opciones: [
      { texto: "Cruzar por la calzada igual, rápido", correcta: false, porque: "Nunca improvises cruces en vías con tránsito o maquinaria." },
      { texto: "Tomar el desvío peatonal señalizado", correcta: true, porque: "Correcto: sigue la señalización y recalcula desde un hito conocido." },
      { texto: "Volver a casa del colegio y no salir nunca más", correcta: false, porque: "Un desvío es una oportunidad de conocer una calle nueva con calma." }
    ]
  },
  {
    id: "accidente",
    etiqueta: "⚠ EVENTO: AYUDAR A OTROS",
    titulo: "Alguien necesita ayuda",
    texto: "Ves a una persona tirada en la vereda que no responde.",
    opciones: [
      { texto: "Moverla de inmediato y llevarla", correcta: false, porque: "No muevas a una persona inconsciente: puedes agravar lesiones." },
      { texto: "Llamar al 131 (SAMU) y seguir indicaciones", correcta: true, porque: "Correcto: 131 para emergencias médicas. Indica ubicación clara y no cuelgues antes de que te indiquen." },
      { texto: "Grabar para las redes y seguir", correcta: false, porque: "Lo urgente es avisar a quien puede ayudar: 131." }
    ]
  },
  {
    id: "tsunami",
    etiqueta: "⚠ ALARMA DE TSUNAMI",
    titulo: "Alarma de tsunami",
    texto: "Suena la alarma costera. Tienes minutos, no horas.",
    opciones: [
      { texto: "Caminar tranquilo hacia la costanera a mirar el río", correcta: false, porque: "La costanera es zona baja: exactamente donde NO hay que estar." },
      { texto: "Subir de inmediato a terreno alto por la ruta de evacuación", correcta: true, porque: "Correcto: terreno alto, sin auto si está cerca, siguiendo la señalización verde." },
      { texto: "Esperar confirmación en el grupo del curso", correcta: false, porque: "Con alarma activa se evacúa primero y se pregunta después." }
    ]
  },
  {
    id: "protesta",
    etiqueta: "⚠ EVENTO DE RUTA",
    titulo: "Marcha en la calle",
    texto: "Hay una marcha cortando el paso por la avenida que usas siempre. Hay carabineros y mucho ruido.",
    opciones: [
      { texto: "Cruzar la marcha al medio para no dar la vuelta", correcta: false, porque: "Nunca cruces una manifestación: da la vuelta por una calle paralela." },
      { texto: "Retroceder y tomar una calle paralela para rodear", correcta: true, porque: "Correcto: identificar calles alternativas es una habilidad clave de autonomía." },
      { texto: "Quedarse mirando hasta que se termine", correcta: false, porque: "Tu objetivo es llegar a casa: no te quedes en el medio de concentraciones." }
    ]
  },
  {
    id: "lluvia",
    etiqueta: "⚠ EVENTO CLIMÁTICO",
    titulo: "Lluvia torrencial",
    texto: "Se desata un aguacero valdiviano de esos de verdad. Visibilidad mala, veredas inundadas.",
    opciones: [
      { texto: "Caminar pegado a los autos estacionados, más rápido", correcta: false, porque: "Con lluvia los autos ven menos: camina por la vereda interior y cruza con más margen." },
      { texto: "Refugiarse un momento y continuar con ruta conocida, visible y bien iluminada", correcta: true, porque: "Correcto: esperar un poco bajo un alero no te atrasa tanto y camina donde te vean." },
      { texto: "Cruzar la calle en cualquier parte para llegar antes", correcta: false, porque: "Cruces improvisados con lluvia son una de las causas más comunes de atropellos." }
    ]
  },
  {
    id: "perro",
    etiqueta: "⚠ EVENTO ANIMAL",
    titulo: "Perro suelto",
    texto: "Un perro grande suelto te empieza a ladrar en la mitad de la cuadra.",
    opciones: [
      { texto: "Correr lo más rápido posible", correcta: false, porque: "Correr dispara el instinto de persecución. Nunca corras." },
      { texto: "Detenerse, quedarse quieto, sin mirarlo fijamente, y alejarse lento", correcta: true, porque: "Correcto: calma, sin gritos ni movimientos bruscos. La mayoría de los perros pierden interés." },
      { texto: "Agarrar una piedra para lanzársela", correcta: false, porque: "Amenazarlo lo vuelve agresivo. Quietud y alejamiento lento." }
    ]
  },
  {
    id: "conocido",
    etiqueta: "⚠ EVENTO PERSONAL",
    titulo: "El 'amigo' que no te da confianza",
    texto: "Un conocido de fiesta se ofrece a dejarte en su auto. Algo no te cuadra: va con otras personas que no conoces.",
    opciones: [
      { texto: "Subir igual, no querer quedar de desconfiado", correcta: false, porque: "Tu instinto es un sensor: si algo no cuadra, no subas. Negarse es gratis." },
      { texto: "Negarse con calma y seguir la ruta conocida o llamar a tu contacto", correcta: true, porque: "Correcto: un 'no, gracias, me voy caminando' basta. Escuchar tu instinto es criterio, no miedo." },
      { texto: "Subir pero contarle a un amigo por mensaje", correcta: false, porque: "Si tu instinto dice que no, el mensaje no te protege dentro del auto: no subas." }
    ]
  },
  {
    id: "micro-llena",
    etiqueta: "⚠ EVENTO TRANSPORTE",
    titulo: "La micro no para",
    texto: "Llega tu micro llena hasta la puerta y el conductor pasa de largo sin detenerse.",
    opciones: [
      { texto: "Correr tras la micro gritando", correcta: false, porque: "Perseguir vehículos es peligroso: habrá otra. Tu seguridad no se discute." },
      { texto: "Esperar la siguiente con calma, o caminar si la ruta es conocida y es de día", correcta: true, porque: "Correcto: plan B siempre. Saber tu ruta a pie es tu respaldo ante cualquier micro." },
      { texto: "Pedirle a un desconocido que te lleve", correcta: false, porque: "La solución a un transporte que no para nunca es subirte a un auto extraño." }
    ]
  },
  {
    id: "cartera",
    etiqueta: "⚠ DILEMA HONESTIDAD",
    titulo: "Encuentras una mochila",
    texto: "En la vereda hay una mochila con documentos, dinero y un celular.",
    opciones: [
      { texto: "Quedarte con el dinero y dejar el resto", correcta: false, porque: "Lo que no es tuyo no es tuyo: pueden haber cámaras y, más importante, alguien lo necesita." },
      { texto: "Entregarla en el retén o comisaría más cercana (133 si no sabes dónde)", correcta: true, porque: "Correcto: Carabineros localiza al dueño por los documentos. Así funciona la confianza." },
      { texto: "Dejarla ahí y seguir, no es tu problema", correcta: false, porque: "Una llamada al 133 cuesta nada y le ahorra a alguien un día terrible." }
    ]
  },
  {
    id: "celular-prestado",
    etiqueta: "⚠ EVENTO ESTAFA",
    titulo: "«Préstame tu celular»",
    texto: "Un desconocido muy amable te pide tu celular para 'hacer una llamada rápida'. Se acerca mucho.",
    opciones: [
      { texto: "Entregárselo mientras lo vigilas", correcta: false, porque: "Entregarlo es regalarlo: en segundos está corriendo con él." },
      { texto: "No entregarlo; ofrecer llamar tú al número que indique, o indicarle un local", correcta: true, porque: "Correcto: puedes ayudar sin poner en riesgo tu teléfono: marca tú, con el celular en tu mano." },
      { texto: "Entregarlo y seguir caminando juntos", correcta: false, porque: "Te aleja de tu ruta y de zonas conocidas: nunca con desconocidos." }
    ]
  },
  {
    id: "semaforo",
    etiqueta: "⚠ SEGURIDAD VIAL",
    titulo: "Semáforo en rojo, sin autos",
    texto: "El semáforo peatonal está en rojo pero no viene ningún auto. Tienes apuro.",
    opciones: [
      { texto: "Cruzar rápido, no hay nadie", correcta: false, porque: "El hábito manda: cruzar en rojo 'solo esta vez' es cómo pasan los accidentes." },
      { texto: "Esperar la luz verde mirando ambos lados igual", correcta: true, porque: "Correcto: la rutina segura siempre, apurado o no. Los segundos que ahorras no valen el riesgo." },
      { texto: "Cruzar por la mitad de la cuadra, más lejos del semáforo", correcta: false, porque: "Cruce habilitado siempre: la calzada a media cuadra es donde nadie te espera." }
    ]
  },
  {
    id: "replica",
    etiqueta: "⚠ RÉPLICA SÍSMICA",
    titulo: "Réplica fuerte",
    texto: "Después del sismo de la mañana, una réplica sacude las calles mientras caminas cerca de fachadas antiguas.",
    opciones: [
      { texto: "Pegarse a la fachada para protegerse de cosas que caen", correcta: false, porque: "Las fachadas son justo lo que cae: aléjate hacia la calzada o zona abierta." },
      { texto: "Alejarse de fachadas y vidrios, zona abierta, y luego continuar evaluando el entorno", correcta: true, porque: "Correcto: en réplicas manda la distancia de fachadas, letreros y vidrios." },
      { texto: "Entrar al edificio más cercano a refugiarse", correcta: false, porque: "Estás más seguro afuera, lejos de estructuras: no entres a edificios durante una réplica." }
    ]
  },
  {
    id: "cadena",
    etiqueta: "⚠ EVENTO BICI",
    titulo: "La cadena se sale",
    texto: "En plena subida la cadena se sale. Mitad grasa, mitad aprendizaje.",
    solo: "bici",
    opciones: [
      { texto: "Frenar en un lugar seguro al costado y volver a ponerla con calma", correcta: true, porque: "Correcto: fuera de la calzada y sin apuro. Una cadena se repone en minutos." },
      { texto: "Seguir pedaleando con la cadena trabada", correcta: false, porque: "Puedes dañar la bici y caer: detente siempre en un lugar seguro." },
      { texto: "Dejar la bici botada y seguir a pie de mal humor", correcta: false, porque: "La bici es tu herramienta de autonomía: cuidarla también es parte del camino." }
    ]
  },
  {
    id: "ciclovia",
    etiqueta: "⚠ SEGURIDAD VIAL · BICI",
    titulo: "¿Por dónde pedaleas?",
    texto: "La calle no tiene ciclovía y a la derecha hay autos estacionando en fila.",
    solo: "bici",
    opciones: [
      { texto: "Por la vereda, despacio, cediendo el paso a los peatones", correcta: true, porque: "Correcto: sin ciclovía, vereda a paso humano y cediendo siempre. Predecible y visible." },
      { texto: "Zigzag entre los autos estacionados", correcta: false, porque: "Puertas que se abren y autos que no te ven: elige un trazado donde te esperen." },
      { texto: "Contramano, así no hay autos de frente", correcta: false, porque: "Contramano es de lo más peligroso: nadie espera un ciclista viniendo de donde no corresponde." }
    ]
  }
];
