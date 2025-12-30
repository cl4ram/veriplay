# Imagen base con Node (compatible con Nuxt 3)
FROM node:20-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos package.json y lock para cachear dependencias
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto del proyecto
COPY . .

# Exponemos el puerto de Nuxt
EXPOSE 3000

# Comando por defecto
CMD ["npm", "run", "dev"]
