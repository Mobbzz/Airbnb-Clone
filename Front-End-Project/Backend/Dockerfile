# Steg 1: Använd en officiell Node.js-bild som bas
FROM node:16-alpine

# Steg 2: Ställ in arbetskatalogen i containern
WORKDIR /app

# Steg 3: Kopiera package.json och package-lock.json till arbetskatalogen
COPY package*.json ./

# Steg 4: Installera alla projektets beroenden
RUN npm install

# Steg 5: Kopiera över all kod till containern
COPY . .

# Steg 6: Exponera porten som applikationen kommer att köra på (t.ex. 3000)
EXPOSE 3000

# Steg 7: Starta applikationen
CMD ["npm", "start"]
