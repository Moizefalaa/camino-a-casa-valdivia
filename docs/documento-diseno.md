# Modo Valdivia
## Documento de Diseño de Juego (GDD) — Versión 0.3 (Concepto)

---

## 1. Resumen

**Modo Valdivia** es un juego web educativo donde adolescentes de 13 a 19 años desarrollan autonomía y orientación urbana para moverse de forma segura por Valdivia, Chile, simulando recorridos reales sobre el mapa real de la ciudad (OpenStreetMap).

El juego tiene tres modos:

| Modo | Descripción |
|---|---|
| **Explora Valdivia** | Simulación libre sobre el mapa real: descubrir hitos, barrios, micros y rutas de evacuación |
| **Modo Desafío** | Misiones de rutas (colegio → casa, casa → centro, etc.) con dificultad progresiva: tráfico, noche, transporte público, emergencias |
| **Mis Datos Seguros** | Aprender de memoria dirección, contactos y números de emergencia; protocolos si te pierdes, se te acaba la batería o hay terremoto |

**Propuesta de valor:** practicar decisiones reales de movilidad y seguridad en un mapa fiel de su propia ciudad, con consecuencias seguras dentro del juego, antes de enfrentarlas en la vida real.

---

## 2. Objetivos pedagógicos

1. **Orientación urbana real:** leer un mapa, reconocer calles, hitos, ríos y puentes; construir un mapa mental del trayecto colegio → casa.
2. **Movilidad autónoma:** planificar rutas a pie, en bici o en micro, considerando tiempo, costo, seguridad y horarios.
3. **Seguridad vial:** cruces, ciclovías, zonas de riesgo vial, noche.
4. **Seguridad personal:** qué hacer al perderse, quedar sin batería, acoso o situaciones con desconocidos, salir de noche.
5. **Datos personales y emergencias:** dirección, contactos, 131/133/134/147/112 y cuándo usar cada uno.
6. **Preparación ante desastres:** Valdivia es zona sísmica y de tsunami → rutas de evacuación a terrenos altos y puntos de encuentro (contexto: terremoto de 1960, el mayor registrado, M9.5).
7. **Identidad local:** historia y geografía de Valdivia como motivación, no como decoración.

---

## 3. Público objetivo y niveles por edad

Público: adolescentes de 13 a 19 años (enseñanza media). Dos niveles de dificultad:

| Nivel | Edad | Características del diseño |
|---|---|---|
| **Nivel 1 — Aprende la ruta** | 13–15 | Rutas cortas, mapa siempre visible, pistas de hitos, eventos simples (cruce, semáforo, calle cerrada) |
| **Nivel 2 — Ruta real completa** | 16–19 | Rutas largas, gestión de tiempo y saldo de la micro, eventos compuestos (noche + desvío + celular sin batería), sin pistas |

Tono general: respetuoso, directo, sin infantilizar. El jugador toma decisiones y ve consecuencias realistas.

---

## 4. Contexto local: representación de Valdivia

### 4.1 Geografía esencial

- **Ríos:** Calle-Calle, Valdivia, Cau-Cau y Cruces — la ciudad se define por el agua.
- **Isla Teja:** entre los ríos Valdivia, Cau-Cau y Cruces.
- **Puentes:** Pedro de Valdivia (ícono, pasarela peatonal), Calle-Calle, Cruces, Cau-Cau.
- **Sectores cubiertos por el mapa del MVP:** Centro, Isla Teja, Collico, Las Ánimas, Guacamayo, Picarte, **Torobayo y Cruces**.

### 4.2 Hitos (landmarks) — Fase 1

| Hito | Uso en el juego |
|---|---|
| INSAT Valdivia (Domeyko 398) | **Punto de partida** del juego: el colegio real del piloto |
| Plaza de la República | Referencia central |
| Mercado Fluvial | Hito comercial, zona de micros |
| Costanera Arturo Prat | Recorrido peatonal junto al río |
| Puente Pedro de Valdivia | Conexión centro ↔ Isla Teja |
| Universidad Austral de Chile (Isla Teja) | Hito educativo |
| Jardín Botánico UACh | Zona verde, meta de exploración |
| Estación de Ferrocarriles (centro cultural) | Hito histórico |
| Torreón Los Canelos / Fuertes | Hitos coloniales |
| Catedral de Valdivia | Referencia del centro |
| Av. Picarte | Eje sur, alto tránsito |
| Terminal de buses | Hito de movilidad interurbana |
| Santuario del Río Cruces | Contexto ambiental (cisne de cuello negro) |

### 4.3 Elementos culturales e históricos

- **Cultura Valdivia** (~3.600 años): colección virtual de piezas (huacos/relicarios) desbloqueables, cada una con un dato real → "Galería Valdivia".
- **Terremoto de 1960:** narrativa del módulo de evacuación; explica *por qué* en Valdivia se evacúa hacia arriba.
- **Fuertes coloniales y río:** historia naval y de fortificaciones.
- **Escenario urbano contemporáneo:** costanera, ferias, arte urbano — el juego se siente como la Valdivia de hoy.

---

## 5. Modos de juego

### 5.1 Explora Valdivia (simulación libre)

- Navegación libre sobre el mapa real (zoom, pan).
- Al tocar un hito: ficha con foto/ilustración, dato histórico y por qué sirve como referencia para orientarse.
- Capa activable de **rutas de evacuación de tsunami** (zonas seguras / terrenos altos, según señalización oficial SHOA).
- Paraderos y recorridos de micro consultables.

### 5.2 Modo Desafío (misiones)

1. El jugador configura **dónde vive** (intersección o punto referencial de su barrio, no la dirección exacta — ver §12).
2. Punto de partida por defecto: **INSAT (Domeyko 398)**.
3. Misiones generadas: *"Llega a casa antes de las 18:30"*, *"Ve al centro, luego a la casa de un amigo y vuelve"*, *"Se hizo de noche y la micro no pasa: llega a casa a pie"*.
4. En cada intersección o paradero el jugador decide: calle, dirección, caminar o tomar micro, dónde cruzar.
5. **Eventos intermedios:** calle cerrada, protesta, lluvia fuerte, celular sin batería, desconocido que insiste, terremoto (evacuar a terreno alto), perder el rumbo.
6. **Micros jugables:** paraderos, elección de recorrido, pago con saldo; esperas y tiempos de viaje realistas (simplificados).
7. Recursos gestionados (Nivel 2): tiempo, saldo de transporte, batería del celular.
8. Puntaje: eficiencia (ruta razonable), seguridad (decisiones prudentes), calma ante eventos.

### 5.3 Mis Datos Seguros (memorización)

| Minijuego | Mecánica |
|---|---|
| **Arma tu dirección** | Completar/ordenar calle, número, barrio desde memoria |
| **¿A quién llamo?** | Escenarios: emergencia médica, robo, incendio, acoso → elegir número correcto |
| **Tarjetas de memoria** | Parear contacto ↔ número (mamá, papá, contacto de confianza) |
| **Protocolos** | Simulacros paso a paso: me perdí / sin batería / terremoto de día / terremoto de noche |

**Números de emergencia (Chile):**

| Número | Servicio |
|---|---|
| 131 | SAMU |
| 133 | Carabineros |
| 134 | Bomberos |
| 147 | Fono Infancia (hasta 18) |
| 112 | Emergencias desde celulares |

Contactos personales: los ingresa el jugador, se guardan **solo en el dispositivo** (§12).

---

## 6. Mecánicas principales

- **Movimiento:** a pie por veredas y rutas peatonales; micro con paraderos y recorridos.
- **Intersecciones = decisiones:** elegir entre 2–3 opciones mostrando lo que se vería en cada dirección (hito visible).
- **Orientarse por referencias, no por GPS:** sin punto azul tipo Google Maps en Nivel 2; hay que usar hitos y el mapa estático (como en la vida real cuando el celular muere).
- **Consecuencias realistas:** equivocarse de ruta cuesta tiempo (llegas tarde), no puntos abstractos; nunca castigos humillantes.
- **Botón "Me perdí":** siempre disponible; despliega el protocolo (detenerse, buscar referencia, preguntar a personal de confianza, llamar a contacto). *Pedir ayuda es una habilidad, no una derrota*.
- **Capa de evacuación:** cualquier misión puede activar un terremoto simulado; el jugador debe llegar a terreno alto siguiendo señalización.

---

## 7. Guía / narrador: Cuelli, el despachador de Radio Estuario

**Decidido:** el juego es narrado por **Cuelli**, un **cisne de cuello negro animado** (ícono del Santuario del Río Cruces) con audífonos de radio, despachador de la estación ficticia **Radio Estuario**.

- **Personaje original SVG** dibujado para este proyecto: libre uso, sin derechos de terceros.
- **Animaciones:** flota, parpadea y mueve el pico sincronizado con la voz (eventos de TTS) o con estimación temporal si la voz está apagada.
- **Voz:** Web Speech API del navegador (gratuita, sin dependencias), priorizando voces es-CL → es-419 → es. Opción de grabar voz humana en fases futuras.
- Aparece como widget inferior izquierdo con globo de diálogo; comentan la misión, dan pistas y reaccionan a eventos.
- Tres ajustes independientes: mensajes on/off, personaje visible/oculto, voz on/off (algunos jugadores preferirán concentrarse).
- Nombre definitivo del personaje: validar con estudiantes INSAT en Fase 0 (provisional: "Cuelli").

---

## 8. Progresión y recompensas

- **Estrellas por misión** (1–3): ruta eficiente / decisiones seguras / sin ayudas.
- **Galería Valdivia:** piezas de la cultura Valdivia desbloqueables con datos históricos reales.
- **Insignias de habilidad:** Navegador, Evacuador, Experto en Micros, Sentido Callejero.
- **Desafíos semanales** (ej.: "llega a casa solo por calles que nunca has usado en el juego").
- **Certificado imprimible:** "Autonomía Urbana: conozco mi ruta y mis emergencias".
- Sin rankings en línea en el MVP (privacidad primero).

---

## 9. Situaciones de seguridad personal (banco de escenarios)

Diseñadas para 13–19, tono realista sin sensacionalismo; validar con equipo escolar / Carabineros / OPD:

1. Un desconocido en auto te sigue o te ofrece llevarte.
2. Te quitan el celular o te amenazan en la calle (protocolo post-robo: qué denunciar, a quién llamar).
3. Sales de una fiesta/junta de noche: la micro ya no pasa, ¿qué opciones seguras hay?
4. Se te acaba la batería y no tienes el camino memorizado.
5. Terremoto mientras estás en la calle o en el puente (evacuación vertical, terreno alto).
6. Alarma de tsunami: llegar a zona alta desde el centro (con cronómetro).
7. Un conocido te ofrece "llegarte de vuelta" pero no te da confianza (escuchar el instinto, cómo negarse).
8. Ves un accidente o alguien herido (133 vs 131, qué informar).

---

## 10. Roles adultos y comunidad INSAT

| Rol | Funciones |
|---|---|
| **Docente** | Elegir nivel del curso, ver avance agregado (sin datos individuales en el MVP), usar en clases de orientación |
| **Apoderado** | Hoja de consejos para practicar el recorrido real con el adolescente; opcionalmente co-configurar contactos |
| **Estudiantes INSAT** | El piloto es con un liceo técnico profesional: estudiantes de Conectividad/Administración pueden colaborar en contenido, testing y datos del mapa (aprendizaje servicio) |

El adolescente es el usuario principal: el juego respeta su autonomía.

---

## 11. Interfaz y accesibilidad

- **Estética decidida: minimalista tipo mapa** — limpia, sobria, colores planos estilo mapa de transporte. Se percibe como herramienta seria.
- UI limpia, tipografía legible, alto contraste; mouse/touch/flechas.
- Textos claros; narración por voz opcional (la voz del Despachador).
- Funciona **offline** en computadores del colegio.
- Pantallas: Inicio (Explorar / Misiones / Mis Datos), Mapa, Ficha de hito, Misión activa, Resultado, Galería Valdivia, Ajustes.
- Responsive: usable en celular del colegio (si la política lo permite).

---

## 12. Privacidad y seguridad de datos (prioridad)

- **Sin cuentas, sin servidor, sin analítica en línea** en el MVP. Todo en `localStorage`/IndexedDB del dispositivo.
- El "hogar" se define como **punto referencial** (intersección/barrio), no dirección exacta.
- Contactos: guardados solo localmente, nunca transmitidos.
- Alineado a Ley 19.628 y Ley 21.719 (protección de datos, vigente desde diciembre 2026); al no recolectar nada, se evita el tratamiento de datos de menores.
- Sin publicidad, sin chat, sin enlaces externos.

---

## 13. Arquitectura técnica (decidida)

| Capa | Decisión |
|---|---|
| Mapa | **Leaflet + OpenStreetMap** con tiles locales de Valdivia (z13–z16, descargados) y fallback automático a tiles online si falta alguno |
| Motor | **Leaflet + lógica propia en TypeScript** (sin motor de juegos; el juego es el mapa) — *implementado en JS vanilla sin build para colegios sin Node* |
| Datos de mapa | Extracto OSM de Valdivia: calles (viajes OSRM demo), hitos, paraderos de micro |
| Rutas | **OSRM (servicio demo, con timeout y fallback a recta)** para checkpoints sobre calles reales; Fase 2: OSRM peatonal local |
| Rutas de evacuación | Señalización oficial SHOA / municipal digitalizada |
| Micros | Recorridos simplificados de las líneas principales (a definir con datos locales en Fase 0) |
| Audio | Voz del Despachador (grabada o TTS) + efectos; silenciable |
| Contenido | JSON editables (hitos, misiones, escenarios, recorridos de micro) |
| Datos de usuario | localStorage/IndexedDB |
| Backend | Ninguno en MVP |

**Stack resumen:** TypeScript + Vite + Leaflet + OSRM (offline, para validación de rutas) o lógica de grafos propia sobre el extracto OSM.

---

## 14. Alcance del MVP (Fase 1)

- [ ] Mapa real OSM: Centro, Isla Teja, Collico, Las Ánimas, Guacamayo, Picarte, Torobayo, Cruces.
- [ ] INSAT (Domeyko 398) como punto de partida configurado.
- [ ] 13 hitos con fichas.
- [ ] Modo Explorar + capa de evacuación.
- [ ] 5 misiones × 2 niveles.
- [ ] Micros jugables (paraderos, recorridos principales, saldo).
- [ ] Módulo Mis Datos Seguros (4 minijuegos).
- [ ] 8 escenarios de seguridad personal.
- [ ] Despachador de Radio Estuario (voz silenciable).
- [ ] Galería Valdivia (colección cultural).
- [ ] Configuración de hogar + contactos local.
- [ ] Certificado imprimible.

**Fuera del MVP:** mapa 3D, transporte en tiempo real, otras ciudades, rankings en línea, bici jugable (Fase 2).

---

## 15. Hoja de ruta

| Fase | Duración estimada | Entregable |
|---|---|---|
| 0. Diseño detallado + validación | 2–3 semanas | Wireframes, test de concepto con estudiantes INSAT, levantamiento de recorridos de micro y datos de evacuación |
| 1. MVP | 6–8 semanas | Juego web según §14 |
| 2. Piloto escolar | 4 semanas | INSAT Valdivia: observación en clases de orientación, ajustes |
| 3. Expansión | 6–8 semanas | Más líneas de micro, bici jugable, panel docente, desafíos semanales |
| 4. Otras ciudades | — | Plantilla reutilizable (Osorno, Puerto Montt, Concepción…) |

---

## 16. Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Memorizan el juego, no la calle real | Misión final: "practica tu ruta real con un adulto" (checklist imprimible) |
| Mapa OSM desactualizado o impreciso | Validación en terreno con estudiantes INSAT; fecha de datos visible en el juego |
| Estética infantil los aleja | Estética minimalista decidida; validar con adolescentes en Fase 0 |
| Contenido de seguridad sensacionalista | Revisión pedagógica (equipo INSAT/OPD), tono empoderador |
| Equipos antiguos en colegios | Web ligera, offline, sin dependencias pesadas |
| Recorridos de micro cambian | JSON editable + actualización semestral |
| Uso desde celulares personales | Todo local; sin recolección (§12) |

---

## 17. Métricas de éxito

- % de misiones completadas sin ayuda por nivel.
- Mejora entre primer y quinto intento (aprendizaje, no azar).
- Retención en minijuego "Mis Datos" a 2 semanas.
- Capacidad de describir su ruta real en palabras (evaluación docente pre/post piloto en INSAT).
- Satisfacción de adolescentes y docentes (encuesta post-piloto).

---

## 18. Decisiones resueltas ✅

| # | Decisión | Resultado |
|---|---|---|
| 1 | Mapa del MVP | **OSM real desde el inicio** (Leaflet + tiles offline) |
| 2 | Estética visual | **Minimalista tipo mapa** (sobria, colores planos) |
| 3 | Guía/narrador | **Cuelli**, cisne de cuello negro animado (SVG original, libre uso) despachador de "Radio Estuario", voz TTS del navegador |
| 4 | Transporte público | **Micros jugables en el MVP** |
| 5 | Motor | **Leaflet + TypeScript** (sin Phaser) |
| 6 | Nombre del juego | **Modo Valdivia** |
| 7 | Cobertura del mapa | **8 sectores**: Centro, Isla Teja, Collico, Las Ánimas, Guacamayo, Picarte, Torobayo, Cruces |
| 8 | Colegio piloto | **INSAT Valdivia** (Domeyko 398, centro) — liceo técnico profesional |

### Pendientes menores (resolver en Fase 0)

- Nombre definitivo del personaje (provisional: "Cuelli"; proponer a los estudiantes INSAT).
- Líneas de micro exactas a simular (levantar con datos locales).
- Lista de contactos/puntos de encuentro por barrio.
- Voz humana grabada (opcional, Fase 2+; el MVP usa TTS del navegador).
