# Migración de dominio — terridata.com.co

> Documento para el área de sistemas de Terridata.
> Estado: **pendiente de ejecutar**. No bloquea el desarrollo del sitio.

## Resumen en una línea

Hoy `terridata.com.co` **es la plataforma**. Si el dominio se apunta al sitio
nuevo sin mover antes la plataforma a una dirección propia, los funcionarios y
los ciudadanos pierden el acceso.

---

## Situación actual (verificada el 2026-08-04)

```
terridata.com.co        A     54.157.87.187      (nginx, AWS EC2)
www.terridata.com.co    CNAME terridata.com.co
```

El servidor entrega una aplicación de página única. Comprobado:

| Ruta | Respuesta |
|---|---|
| `/` | `200 text/html` — shell de la aplicación |
| `/portal` | `200 text/html` — mismo shell |
| `/login` | `200 text/html` — mismo shell |
| `/una-ruta-que-no-existe` | `200 text/html` — **mismo shell** |
| `/api/health` | `404 application/json` — backend real |

La última fila es la importante: nginx responde lo mismo para *cualquier* ruta y
el enrutado ocurre en el navegador. `/portal` y `/login` **no son rutas del
servidor**, son pantallas dentro de la aplicación.

No existe ningún subdominio: `app`, `portal`, `sistema`, `ciudadano` y `api`
devuelven NXDOMAIN.

## El problema

**El DNS resuelve nombres de host, no rutas.** No hay forma de decir «manda `/`
a Vercel y `/portal` a AWS» desde el DNS.

En el momento en que el registro de `terridata.com.co` apunte a Vercel, apuntan
con él `/portal`, `/login` y `/api`. La plataforma queda inaccesible por
completo.

## La solución acordada

Dar a la plataforma un nombre propio **antes** de tocar la raíz. Durante la
transición la plataforma responde por las dos direcciones, así que el cambio es
sin interrupción de servicio.

### Paso 1 — Registro DNS

En el proveedor de DNS de `terridata.com.co`:

```
app.terridata.com.co    A    54.157.87.187    TTL 300
```

> El TTL bajo es a propósito: durante la migración conviene poder revertir en
> minutos, no en horas. Se sube a 3600 cuando todo esté estable.

Verificar antes de continuar:

```bash
dig +short app.terridata.com.co     # debe devolver 54.157.87.187
```

### Paso 2 — nginx acepta el nuevo nombre

En el servidor `54.157.87.187`, añadir el host al bloque que ya sirve la
aplicación:

```nginx
server {
    listen 443 ssl http2;
    server_name terridata.com.co www.terridata.com.co app.terridata.com.co;
    #                                                 ^^^^^^^^^^^^^^^^^^^^ añadir

    # ... el resto de la configuración se deja igual
}
```

Comprobar y recargar sin cortar conexiones:

```bash
sudo nginx -t          # debe decir "syntax is ok" y "test is successful"
sudo systemctl reload nginx
```

### Paso 3 — Certificado TLS

```bash
sudo certbot --nginx -d terridata.com.co -d www.terridata.com.co -d app.terridata.com.co
```

Verificar:

```bash
curl -sI https://app.terridata.com.co/portal | head -1   # HTTP/2 200
curl -sI https://app.terridata.com.co/login  | head -1   # HTTP/2 200
```

**En este punto la plataforma responde por las dos direcciones y nadie se ha
enterado.** El sitio antiguo sigue funcionando exactamente igual.

### Paso 4 — Apuntar el sitio nuevo a esa dirección

En el proyecto de Vercel, variable de entorno:

```
NEXT_PUBLIC_PLATFORM_ORIGIN = https://app.terridata.com.co
```

Redesplegar. Los botones `Soy Ciudadano` y `Soy Funcionario` pasan a apuntar a
`app.terridata.com.co/portal` y `/login`. Probar los dos antes de seguir.

### Paso 5 — Mover la raíz a Vercel

Solo cuando los pasos 1 a 4 estén verificados:

```
terridata.com.co        A       76.76.21.21          (el valor que indique Vercel)
www.terridata.com.co    CNAME   cname.vercel-dns.com
```

Vercel emite su propio certificado en unos minutos.

### Paso 6 — Comprobación final

```bash
curl -sI https://terridata.com.co             | head -1   # sitio nuevo
curl -sI https://app.terridata.com.co/login   | head -1   # plataforma
```

---

## Plan de reversión

Si algo falla en el paso 5, se devuelve el registro A de la raíz a
`54.157.87.187`. Con TTL 300 la vuelta atrás tarda unos cinco minutos y la
plataforma nunca dejó de funcionar en `app.terridata.com.co`.

---

## Qué hay que avisar

Los usuarios que tengan `terridata.com.co/login` guardado en marcadores llegarán
al sitio comercial. Dos mitigaciones, ninguna excluyente:

1. El botón `Acceder` está en el encabezado de **todas** las páginas del sitio
   nuevo, así que desde ahí se llega a la plataforma en un clic.
2. Comunicar la nueva dirección a los municipios antes del cambio.

Si se prefiere que las URLs antiguas sigan funcionando, se puede añadir en
Vercel una redirección permanente de `/login` y `/portal` hacia
`app.terridata.com.co`. Es una línea en `next.config.ts` y se puede decidir más
adelante.

---

## Alternativas descartadas

| Opción | Por qué se descartó |
|---|---|
| **Proxy desde Vercel**: reenviar `/portal`, `/login`, `/api` y `/assets` al servidor AWS manteniendo las URLs | Hay que reenviar también los recursos estáticos y las cookies de sesión. Un fallo deja a los funcionarios sin poder autenticarse, y el punto de fallo queda escondido en una capa de reescrituras |
| **nginx al frente**: no tocar el DNS y reenviar la raíz al despliegue de Vercel | Todo el tráfico pasaría por el EC2. Se pierde la red de distribución de Vercel y el servidor se convierte en punto único de falla para el sitio comercial |

---

## Contacto

Cualquier duda sobre este documento, antes de ejecutar cualquier paso.
