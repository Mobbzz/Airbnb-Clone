# Använd en officiell Node.js-bild som bas
FROM node:16-alpine

# Ange arbetskatalogen i containern
WORKDIR /app

# Kopiera package.json och package-lock.json till arbetskatalogen
COPY package*.json ./

# Installera alla projektets beroenden
RUN npm install

# Kopiera över all kod till containern
COPY . .

# Exponera porten som applikationen kommer att köra på (t.ex. 3000)
EXPOSE 3000

# Starta applikationen
CMD ["npm", "start"]
