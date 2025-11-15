# Use Node.js LTS image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy server files and React build
COPY . .

# Expose port
EXPOSE 8181

# Start server
CMD ["node", "index.js"]
