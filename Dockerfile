# Stage 1: Build app
FROM node:18 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Run the app
FROM node:18-slim

WORKDIR /app
COPY --from=builder /app ./

EXPOSE 80

CMD ["sh", "-c", "npm start -- -p ${PORT:-80}"]