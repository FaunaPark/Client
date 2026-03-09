<div align="center">
   <h1>🦁 FaunaPark Frontend</h1>

   ### Cliente web estático para la gestión de parques zoológicos

   [![HTML5](https://img.shields.io/badge/HTML5-E34F26.svg)](https://developer.mozilla.org/docs/Web/HTML)
   [![CSS3](https://img.shields.io/badge/CSS3-1572B6.svg)](https://developer.mozilla.org/docs/Web/CSS)
   [![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E.svg)](https://developer.mozilla.org/docs/Web/JavaScript)
   [![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4.svg)](https://tailwindcss.com/)
   [![Deploy](https://img.shields.io/badge/Deploy-Static%20Hosting-00C7B7.svg)](#-despliegue)
   [![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

   <p align="center">
      <strong>Una interfaz web moderna, ligera y responsive</strong> para visualizar animales y hábitats consumiendo la API de FaunaPark con navegación clara y experiencia de usuario consistente.
   </p>
</div>

---

## 📋 Descripción

**FaunaPark Frontend** es una aplicación cliente construida con HTML, CSS y JavaScript vanilla para gestionar la visualización de información de un zoológico. El proyecto permite explorar listados de animales y hábitats, además de consultar el detalle de cada entidad mediante rutas dedicadas.

La aplicación está diseñada para funcionar como sitio estático, con rutas relativas, despliegue sencillo y sin necesidad de procesos de build.

## ✨ Características

- 🐾 **Listado de Animales** - Consulta y visualización de registros de animales
- 🏠 **Listado de Hábitats** - Visualización clara de espacios y características
- 🔎 **Vistas de Detalle** - Páginas específicas para cada animal y hábitat por ID
- 🔗 **Integración con API REST** - Consumo de endpoints del backend FaunaPark
- 📱 **Diseño Responsive** - Interfaz adaptable a escritorio y móvil
- ⚡ **Sin Build Step** - Ejecución directa como archivos estáticos
- 🧩 **Arquitectura Modular** - Scripts separados por dominio y pantalla
- 🌐 **Rutas Relativas** - Compatible con múltiples proveedores de hosting

## 🛠️ Tecnologías Utilizadas

- **[HTML5](https://developer.mozilla.org/docs/Web/HTML)** - Estructura semántica de páginas
- **[CSS3](https://developer.mozilla.org/docs/Web/CSS)** - Estilos personalizados
- **[JavaScript ES6+](https://developer.mozilla.org/docs/Web/JavaScript)** - Lógica de cliente y consumo de API
- **[Tailwind CSS (CDN)](https://tailwindcss.com/)** - Utilidades de maquetación y diseño

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener:

| Requisito | Versión | Enlace |
|-----------|---------|--------|
| **Navegador moderno** | Última estable | [Chrome](https://www.google.com/chrome/) / [Firefox](https://www.mozilla.org/firefox/) / [Edge](https://www.microsoft.com/edge) |
| **API de FaunaPark** | Disponible | Endpoint accesible por HTTP/HTTPS |
| **Servidor estático** (opcional) | Cualquiera | Live Server, Nginx, Apache, etc. |

## 🚀 Instalación Rápida

### 1. Clona el Repositorio

```bash
git clone https://github.com/tuusuario/faunapark-client.git
cd faunapark-client
```

### 2. Configura la URL de la API

Edita el archivo `scripts/config.js` y define la base URL:

```javascript
const API_BASE_URL = "https://server-orpin-phi-74.vercel.app/";
```

Si trabajas en local, por ejemplo:

```javascript
const API_BASE_URL = "http://localhost:8080/";
```

### 3. Ejecuta el Frontend

Opciones rápidas:

```bash
# Opción A: abrir index.html directamente en el navegador

# Opción B: servir con Live Server (VS Code)

# Opción C: usar un servidor estático simple
npx serve .
```

✅ **La aplicación estará disponible en** `http://localhost:3000` (o el puerto que asigne tu servidor estático)

## 🏗️ Uso Rápido

### Navegar por la Aplicación

1. Abre la página principal.
2. Entra a la sección de animales o hábitats.
3. Selecciona un elemento para ver su detalle.

### Flujo de detalle por ID

La app navega a páginas de detalle usando query params:

```text
/pages/animalDetalle.html?id=1
/pages/habitatDetalle.html?id=2
```

## 📚 Rutas del Frontend

### Página Principal

- `GET /index.html` - Landing y navegación principal

### Módulo de Animales

- `GET /pages/animales.html` - Listado de animales
- `GET /pages/animalDetalle.html?id=:id` - Detalle de animal

### Módulo de Hábitats

- `GET /pages/habitats.html` - Listado de hábitats
- `GET /pages/habitatDetalle.html?id=:id` - Detalle de hábitat

## 📁 Estructura del Proyecto

```text
Client/
├── index.html                     # Página principal (raíz)
├── README.md                      # Este archivo
├── assets/                        # Recursos estáticos
│   ├── favicon.ico
│   ├── Logo.png
│   └── logoHorizontal.png
├── pages/                         # Páginas secundarias
│   ├── animales.html              # Listado de animales
│   ├── animalDetalle.html         # Detalle de animal
│   ├── habitats.html              # Listado de hábitats
│   └── habitatDetalle.html        # Detalle de hábitat
├── scripts/                       # Lógica del cliente
│   ├── config.js                  # Configuración API base
│   ├── main.js                    # Lógica de inicio
│   ├── animales.js                # Lógica de listado animales
│   ├── animalDetalle.js           # Lógica de detalle animal
│   ├── habitats.js                # Lógica de listado hábitats
│   └── habitatDetalle.js          # Lógica de detalle hábitat
└── styles/
      └── styles.css                 # Estilos globales
```

### Flujo de Navegación y Datos

```text
Usuario en navegador
      ↓
Carga de página HTML
      ↓
Script de módulo (JS)
      ↓
Fetch a API_BASE_URL
      ↓
Procesamiento de respuesta JSON
      ↓
Render dinámico en interfaz
```

## 🧪 Pruebas y Validación Manual

Este proyecto no requiere pipeline de tests automatizados para ejecutarse, pero se recomienda validar:

- Carga correcta de listados de animales y hábitats
- Navegación a detalle con parámetro `id`
- Manejo de errores cuando la API no responde
- Render responsive en móvil y escritorio

### Checklist rápido

```text
[ ] Home carga sin errores
[ ] Animales muestra datos de la API
[ ] Hábitats muestra datos de la API
[ ] Detalles abren con query id válido
[ ] No hay errores en consola en flujo normal
```

## 🏗️ Despliegue

El frontend está listo para hosting estático sin compilación.

### GitHub Pages

```bash
# Publica el contenido del proyecto en una rama (main o gh-pages)
# Configura Pages para servir desde raíz
```

### Netlify

- Arrastra y suelta la carpeta del proyecto en Netlify Drop
- O conecta el repositorio y despliega automáticamente

### Vercel

- Importa el repositorio
- Framework Preset: `Other`
- Output: raíz del proyecto

### Servidor Web Tradicional

- Copia todos los archivos a la carpeta pública
- Verifica que `index.html` quede en raíz

## ⚙️ Configuración

### Endpoint de API

Archivo: `scripts/config.js`

```javascript
const API_BASE_URL = "https://server-orpin-phi-74.vercel.app/";
```

### Recomendaciones de Integración

- Asegura que la API permita CORS para el dominio del frontend
- Usa HTTPS en producción para evitar bloqueos de contenido mixto
- Mantén rutas relativas para compatibilidad en subdirectorios

## 📝 Notas Técnicas

- No requiere instalación de dependencias para ejecutarse
- Compatible con despliegue en cualquier CDN o hosting estático
- Estructura pensada para mantenimiento por módulos

## 📄 Licencia

Este proyecto está bajo la Licencia **MIT**. Consulta el archivo `LICENSE` para más detalles.

---

## 👥 Autores

<div align="center">
   <table>
      <tr>
         <td align="center">
            <a href="https://github.com/MT22HUGO">
               <img src="https://avatars.githubusercontent.com/u/232877974?v=4" width="100px;" alt="Hugo"/><br />
               <sub><b>Hugo</b></sub>
            </a>
            <br />
            <p><strong>Full Stack Developer</strong></p>
         </td>
         <td align="center">
            <a href="https://github.com/Javiii3r">
               <img src="https://avatars.githubusercontent.com/u/232877625?v=4" width="100px;" alt="Javi"/><br />
               <sub><b>Javi</b></sub>
            </a>
            <br />
            <p><strong>Full Stack Developer</strong></p>
         </td>
      </tr>
   </table>
</div>

## 🏆 Créditos y Agradecimientos

<div align="center">
   <p>Este proyecto fue desarrollado con dedicación por el equipo de FaunaPark.</p>

   **Desarrollado con ❤️ para mejorar la gestión de zoológicos**

   ---

   Agradecimientos a:
   - **La comunidad web** por estándares y buenas prácticas
   - **Tailwind CSS** por acelerar el diseño de interfaz
   - **FaunaPark API** por la base de datos y lógica de negocio
</div>

---

<div align="center">

   [⬆ Volver al inicio](#-faunapark-frontend)

</div>
