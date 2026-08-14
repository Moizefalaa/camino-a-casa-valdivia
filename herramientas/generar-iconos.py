"""Genera los iconos PWA del juego (PNG 192/512/512-maskable) sin dependencias.

Diseno: puente (arco + tablero) sobre agua, paleta del juego (#2c6e8f / #dce9f0).
Uso:  python herramientas/generar-iconos.py
"""
import math
import os
import struct
import zlib

RAIZ = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
DESTINO = os.path.join(RAIZ, "juego", "iconos")


def escribir_png(ruta, w, h, pixeles):
    def trozo(tipo, datos):
        c = tipo + datos
        return struct.pack(">I", len(datos)) + c + struct.pack(">I", zlib.crc32(c) & 0xffffffff)
    raw = b"".join(b"\x00" + bytes(v for v in fila) for fila in pixeles)
    png = (b"\x89PNG\r\n\x1a\n"
           + trozo(b"IHDR", struct.pack(">IIBBBBB", w, h, 8, 6, 0, 0, 0))
           + trozo(b"IDAT", zlib.compress(raw, 9))
           + trozo(b"IEND", b""))
    with open(ruta, "wb") as f:
        f.write(png)


def color(px, ss):
    """Devuelve (r,g,b,a) segun disenio, coordenadas normalizadas (x,y en 0..1)."""
    x, y, maskable = px
    AZUL = (44, 110, 143, 255)
    CLARO = (220, 233, 240, 255)
    BLANCO = (250, 250, 247, 255)

    if not maskable:
        r = 0.22
        dx = max(abs(x - 0.5) - (0.5 - r), 0) / r
        dy = max(abs(y - 0.5) - (0.5 - r), 0) / r
        if math.hypot(dx, dy) > 1.0:
            return (0, 0, 0, 0)

    if 0.40 <= y <= 0.47:
        return BLANCO
    d = math.hypot(x - 0.5, (y - 0.47) * 1.0)
    if d <= 0.30 and d >= 0.255 and y <= 0.47:
        return BLANCO
    for y0, amp in ((0.63, 0.030), (0.74, 0.024)):
        if abs(y - y0 - amp * math.sin(x * 2 * math.pi * 1.5 + y0 * 9)) < 0.016:
            return CLARO
    return AZUL


def generar(tam, ruta, maskable):
    ss = 4
    n = tam * ss
    pixeles = []
    for j in range(tam):
        fila = []
        for i in range(tam):
            r = g = b = a = 0
            for sj in range(ss):
                for si in range(ss):
                    x = (i * ss + si + 0.5) / n
                    y = (j * ss + sj + 0.5) / n
                    if maskable:
                        x = (x - 0.5) / 0.8 + 0.5
                        y = (y - 0.5) / 0.8 + 0.5
                    cr, cg, cb, ca = color((x, y, maskable), ss)
                    r += cr * ca
                    g += cg * ca
                    b += cb * ca
                    a += ca
            if a:
                fila += [int(r / a), int(g / a), int(b / a), min(255, a // (ss * ss))]
            else:
                fila += [0, 0, 0, 0]
        pixeles.append(fila)
    escribir_png(ruta, tam, tam, pixeles)


ICONO_SVG = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="22" fill="#2c6e8f"/>
  <rect x="18" y="40" width="64" height="7" rx="2" fill="#fafaf7"/>
  <path d="M22 47 a28 28 0 0 1 56 0" fill="none" stroke="#fafaf7" stroke-width="5"/>
  <path d="M14 63 q10 -5 22 0 t22 0 t22 0" fill="none" stroke="#dce9f0" stroke-width="4" stroke-linecap="round"/>
  <path d="M20 74 q10 -4 20 0 t20 0 t20 0" fill="none" stroke="#dce9f0" stroke-width="3.5" stroke-linecap="round"/>
</svg>
"""


def main():
    os.makedirs(DESTINO, exist_ok=True)
    generar(192, os.path.join(DESTINO, "icono-192.png"), False)
    generar(512, os.path.join(DESTINO, "icono-512.png"), False)
    generar(512, os.path.join(DESTINO, "icono-512-maskable.png"), True)
    with open(os.path.join(DESTINO, "icono.svg"), "w", encoding="utf-8") as f:
        f.write(ICONO_SVG)
    for f in sorted(os.listdir(DESTINO)):
        print(f, os.path.getsize(os.path.join(DESTINO, f)), "bytes")


if __name__ == "__main__":
    main()
