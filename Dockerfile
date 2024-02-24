# Usa una imagen base que incluya el entorno de ejecución necesario para tu aplicación (por ejemplo, Node.js)
FROM node:14

# Configura el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios de tu aplicación
COPY . .

# Variables de entorno
ENV REACT_APP_APPLICATION_BASE_URL=http://localhost:8001/api/pladi/ \
    REACT_APP_APPLICATION_BASE_URL_LOGIN=http://localhost:3000/

# Instala las dependencias
RUN npm install
RUN npm install @emotion/react

# Expón el puerto en el que tu aplicación frontend se ejecuta
EXPOSE 80

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
