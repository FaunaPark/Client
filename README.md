# Fauna Park - Cliente Estático
Aplicación web estática para la gestión de un parque de fauna.

## 📁 Estructura del Proyecto

```
Client/
├── index.html              # Página principal (raíz)
├── assets/                 # Recursos estáticos (imágenes, favicon)
│   ├── favicon.ico
│   ├── Logo.png
│   └── logoHorizontal.png
├── pages/                  # Páginas HTML secundarias
│   ├── animales.html
│   ├── animalDetalle.html
│   ├── habitats.html
│   └── habitatDetalle.html
├── scripts/                # Archivos JavaScript
│   ├── config.js          # Configuración de la API
│   ├── main.js
│   ├── animales.js
│   ├── animalDetalle.js
│   ├── habitats.js
│   └── habitatDetalle.js
└── styles/                 # Hojas de estilo
    └── styles.css
```

## 🚀 Despliegue

Este proyecto está listo para ser desplegado como archivos estáticos en cualquier servicio de hosting:

### Opciones de Despliegue:

1. **GitHub Pages**
   - Sube el proyecto a un repositorio de GitHub
   - Activa GitHub Pages desde la configuración del repositorio
   - Selecciona la rama main y la carpeta raíz

2. **Netlify**
   - Arrastra y suelta la carpeta completa en Netlify Drop
   - O conecta tu repositorio de GitHub

3. **Vercel**
   - Conecta tu repositorio de GitHub
   - Vercel detectará automáticamente que es un sitio estático

4. **Cualquier servidor web**
   - Simplemente copia todos los archivos al directorio público del servidor
   - Asegúrate de que index.html esté en la raíz

## ⚙️ Configuración

El archivo `scripts/config.js` contiene la URL de la API:

```javascript
const API_BASE_URL = "https://server-orpin-phi-74.vercel.app/";
```

Modifica esta URL si necesitas conectar con una API diferente.

## 🌐 Navegación

- **Inicio**: `/index.html` (raíz)
- **Animales**: `/pages/animales.html`
- **Hábitats**: `/pages/habitats.html`
- **Detalle de Animal**: `/pages/animalDetalle.html?id={id}`
- **Detalle de Hábitat**: `/pages/habitatDetalle.html?id={id}`

## 📝 Notas

- Todas las rutas son relativas y funcionan correctamente en cualquier ubicación
- El proyecto usa Tailwind CSS a través de CDN
- No requiere compilación ni build
- Compatible con cualquier navegador moderno
