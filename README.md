# Veriplay

Aplicación web de administración películas y series utilizando la API de OMDb.

## Descripción

Veriplay es una aplicación web desarrollada con Nuxt que permite buscar películas y series utilizando la API de OMDb.  
Además, el usuario puede crear y administrar una lista personalizada de películas propias, que se persiste en el navegador.

La aplicación está pensada como un ejercicio de arquitectura frontend, tipado con TypeScript, manejo de estado con Pinia y testing con Vitest.

Para ingresar a la aplicación es necesario realizar un login con las siguientes credenciales
mail: admin@veriplay.com
contraseña: 123456

## Deploy

https://veriplay-admin.netlify.app/

mail: admin@veriplay.com
contraseña: 123456

## Features

- Búsqueda de películas y series por título
- Scroll infinito en los resultados
- Vista de detalle de película
- Edición (sin persistencia) de peliculas
- Creación de películas personalizadas
- Eliminación individual o múltiple de películas custom
- Persistencia de películas personalizadas en localStorage
- UI moderna con Vuetify

## Stack Tecnológico

- **Nuxt 3** – Framework principal
- **Vue 3 + Composition API**
- **TypeScript** – Tipado estático
- **Pinia** – Manejo de estado global
- **Vuetify** – UI components
- **Vitest** – Testing unitario

## Testing

Se implementaron pruebas unitarias utilizando **Vitest**, enfocadas en:

- Helpers y utilidades (`utils/formatters`)
- Stores de Pinia:
  - Movie Store (creación, eliminación y persistencia)
  - Search Store (manejo de estado y limpieza)

Las pruebas se ejecutan en un entorno aislado, mockeando dependencias como `localStorage` cuando es necesario.

## Setup del Proyecto

Instalar dependencias:

```bash

npm install
```

Levantar entorno de desarrollo:

```bash

npm run dev
```

Correr tests:

```bash

npm run test

```

## Con Docker

Construir la imagen

```bash

docker build -t veriplay .
```

Correr la aplicación

```bash

docker run -p 3000:3000 veriplay
```

## Variables de Entorno

Para poder realizar búsquedas es necesario configurar la API de OMDb.

Crear un archivo `.env` en la raíz del proyecto:

```bash
NUXT_PUBLIC_OMDB_API_KEY=ba35b071
```
