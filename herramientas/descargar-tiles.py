"""Descarga los tiles de OpenStreetMap de Valdivia para uso offline del juego.

Uso:  python herramientas/descargar-tiles.py
Requisito de política de tiles de OSM: User-Agent identificable. Volumen
modesto (unos 400 tiles), para un proyecto educacional escolar.
"""
import math
import os
import time
import urllib.request

LAT_SUR, LAT_NORTE = -39.875, -39.789
LON_OESTE, LON_ESTE = -73.285, -73.199
ZMIN, ZMAX = 13, 16
PAUSA_S = 0.06
UA = {"User-Agent": "ModoValdivia-Edu/1.0 (proyecto escolar INSAT Valdivia; uso educacional)"}
DESTINO = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "juego", "tiles"))
RESUMEN = os.path.join(os.path.dirname(os.path.abspath(__file__)), "resumen-tiles.txt")


def deg2num(lat, lon, z):
    lat_rad = math.radians(lat)
    n = 2.0 ** z
    x = (lon + 180.0) / 360.0 * n
    y = (1.0 - math.log(math.tan(lat_rad) + 1 / math.cos(lat_rad)) / math.pi) / 2.0 * n
    return int(x), int(y)


def main():
    total = bajados = existentes = errores = 0
    for z in range(ZMIN, ZMAX + 1):
        x0, y0 = deg2num(LAT_NORTE, LON_OESTE, z)
        x1, y1 = deg2num(LAT_SUR, LON_ESTE, z)
        for x in range(x0, x1 + 1):
            d = os.path.join(DESTINO, str(z), str(x))
            os.makedirs(d, exist_ok=True)
            for y in range(y0, y1 + 1):
                total += 1
                f = os.path.join(d, "{}.png".format(y))
                if os.path.exists(f) and os.path.getsize(f) > 0:
                    existentes += 1
                    continue
                url = "https://tile.openstreetmap.org/{}/{}/{}.png".format(z, x, y)
                try:
                    req = urllib.request.Request(url, headers=UA)
                    with urllib.request.urlopen(req, timeout=20) as r, open(f, "wb") as out:
                        out.write(r.read())
                    bajados += 1
                except Exception:
                    errores += 1
                    if os.path.exists(f) and os.path.getsize(f) == 0:
                        os.remove(f)
                time.sleep(PAUSA_S)
    linea = "tiles totales: {} | descargados: {} | ya existentes: {} | errores: {}".format(
        total, bajados, existentes, errores)
    with open(RESUMEN, "w", encoding="utf-8") as out:
        out.write(linea + "\n")
    print(linea)


if __name__ == "__main__":
    main()
