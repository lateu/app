FROM node:20

# Set working directory
WORKDIR /usr/src/app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy everything else (server.js, db.js, etc.)
COPY . .

# Expose app port
EXPOSE 3000

# Start app
CMD ["node", "server.js"]
