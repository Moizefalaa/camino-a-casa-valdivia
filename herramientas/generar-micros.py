"""Genera juego/js/datos/micros.js desde OpenStreetMap (Overpass).

- Lineas reales: relaciones route=bus de Valdivia presentes en OSM
  (hoy: Linea 20 Niebla-Valdivia).
- Corredores referenciales: unen el centro con cada sector siguiendo una
  linea recta y encadenando paraderos reales (highway=bus_stop) cercanos.
  Estan marcados 'Referencial (validar INSAT)': estudiantes/docentes pueden
  corregirlos a mano en js/datos/micros.js.

Uso:  python herramientas/generar-micros.py
"""
import json
import math
import os
import urllib.parse
import urllib.request

UA = {"User-Agent": "ModoValdivia-Edu/1.0 (proyecto escolar INSAT Valdivia)"}
BBOX = (-39.90, -73.30, -39.78, -73.19)
RAIZ = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
SALIDA = os.path.join(RAIZ, "juego", "js", "datos", "micros.js")

CORREDORES = [
    ("ref-picarte", "Picarte", "#d97b3f", [-39.8143, -73.2459], [-39.8350, -73.2450]),
    ("ref-animas", "Las Animas", "#3d8b5f", [-39.8143, -73.2459], [-39.8340, -73.2330]),
    ("ref-guacamayo", "Guacamayo", "#8a6d3b", [-39.8143, -73.2459], [-39.8210, -73.2220]),
    ("ref-collico", "Collico", "#7b5ea7", [-39.8143, -73.2459], [-39.8155, -73.2560]),
]


def overpass(q):
    req = urllib.request.Request(
        "https://overpass-api.de/api/interpreter",
        data=urllib.parse.urlencode({"data": q}).encode(), headers=UA)
    return json.load(urllib.request.urlopen(req, timeout=90))


def dist(a, b):
    p = math.pi / 180
    h = (math.sin((b[0] - a[0]) * p / 2) ** 2
         + math.cos(a[0] * p) * math.cos(b[0] * p) * math.sin((b[1] - a[1]) * p / 2) ** 2)
    return 2 * 6371 * math.asin(math.sqrt(h))


def main():
    rels = overpass('relation["route"="bus"](%s,%s,%s,%s);out tags;' % BBOX)["elements"]
    paradas = overpass('node["highway"="bus_stop"](%s,%s,%s,%s);out;' % BBOX)["elements"]
    ids = ",".join(str(r["id"]) for r in rels)
    detalle = overpass("relation(id:%s);out;node(r);out skel;" % ids)["elements"]
    paradas_por_id = {n["id"]: n for n in detalle if n["type"] == "node"}
    por_nombre = {n["id"]: n for n in paradas}

    micros = []
    for rel in [e for e in detalle if e["type"] == "relation"]:
        seq = []
        for m in rel.get("members", []):
            if m["type"] != "node":
                continue
            n = por_nombre.get(m["ref"]) or paradas_por_id.get(m["ref"])
            if not n:
                continue
            nombre = (por_nombre.get(m["ref"]) or {}).get("tags", {}).get("name", "Paradero")
            seq.append({"nombre": nombre, "coords": [round(n["lat"], 5), round(n["lon"], 5)]})
        dedup = []
        for s in seq:
            if not dedup or dedup[-1]["coords"] != s["coords"]:
                dedup.append(s)
        if len(dedup) >= 4:
            micros.append({
                "id": "osm-" + str(rel["id"]),
                "ref": rel["tags"].get("ref", ""),
                "nombre": rel["tags"].get("name", "Linea " + rel["tags"].get("ref", "")),
                "color": "#2c6e8f",
                "nota": "Recorrido OSM",
                "paradas": dedup,
            })
            print("REAL", rel["tags"].get("ref"), len(dedup), "paradas")

    for cid, nombre, color, A, B in CORREDORES:
        seq, usadas = [], set()
        n = int(dist(A, B) / 0.25) + 1
        for i in range(n + 1):
            t = i / n
            pt = [A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t]
            mejor, d = None, 0.22
            for p in paradas:
                if p["id"] in usadas:
                    continue
                k = dist(pt, [p["lat"], p["lon"]])
                if k < d:
                    d, mejor = k, p
            if mejor:
                usadas.add(mejor["id"])
                seq.append({"nombre": mejor["tags"].get("name", "Paradero"),
                            "coords": [round(mejor["lat"], 5), round(mejor["lon"], 5)]})
        if len(seq) >= 4:
            micros.append({"id": cid, "ref": "", "nombre": "Centro - " + nombre,
                           "color": color, "nota": "Referencial (validar INSAT)", "paradas": seq})
            print("REF ", nombre, len(seq), "paradas")

    js = ("// Generado desde OpenStreetMap (Overpass) con herramientas/generar-micros.py\n"
          "// Lineas reales OSM + corredores referenciales sobre paraderos reales.\n"
          "// Coordenadas [lat, lon]. Editable a mano o regenerando el script.\n"
          "const MICROS = " + json.dumps(micros, ensure_ascii=False, indent=1) + ";\n")
    with open(SALIDA, "w", encoding="utf-8") as f:
        f.write(js)
    print("TOTAL micros:", len(micros), "->", SALIDA)


if __name__ == "__main__":
    main()
