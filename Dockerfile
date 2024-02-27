# Usa una imagen base que incluya el entorno de ejecución necesario para tu aplicación (por ejemplo, Node.js)
FROM node:20.5.0

# Configura el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios de tu aplicación
COPY . .

# Variables de entorno
ENV REACT_APP_APPLICATION_BASE_URL=http://localhost:8585/api/pladi/ \
    REACT_APP_APPLICATION_BASE_URL_LOGIN=http://localhost:3000/

# Instala las dependencias
RUN npm install -g npm@latest
RUN npm install @emotion/react @emotion/styled
RUN npm install react-scripts --save-dev


# Expón el puerto en el que tu aplicación frontend se ejecuta
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "start"]

