# Stage 1: Builder
FROM node:18 AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application code
COPY . .

# Stage 2: Runtime
FROM node:18-slim
WORKDIR /app

# Copy built files and dependencies
COPY --from=builder /app /app

# Install curl for healthcheck
RUN apt-get update && apt-get install -y curl && apt-get clean

# Expose app port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:3000/tasks || exit 1

# Start the application
CMD ["node", "index.js"]
