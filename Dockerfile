# Multi-stage build for AutoFacturas

# Stage 1: Build Frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci --only=production
COPY frontend/ ./
RUN npm run build

# Stage 2: Build Landing
FROM node:18-alpine AS landing-builder
WORKDIR /app/landing
COPY landing/package*.json ./
RUN npm ci --only=production
COPY landing/ ./
RUN npm run build

# Stage 3: Production
FROM node:18-alpine
WORKDIR /app

# Install production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy backend
COPY backend/ ./backend/
WORKDIR /app/backend
RUN npm ci --only=production
WORKDIR /app

# Copy built frontend and landing
COPY --from=frontend-builder /app/frontend/build ./frontend/build
COPY --from=landing-builder /app/landing/build ./landing/build

# Copy production server and config
COPY production-server.js ./
COPY .env.example ./.env

# Create database directory
RUN mkdir -p /app/backend/data

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:8080/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start production server
CMD ["node", "production-server.js"]
