# Stage 1: build
FROM node:18 AS builder
WORKDIR /app

# Install dependencies (use package-lock if present for reproducible builds)
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Remove devDependencies to keep node_modules small for production
RUN npm prune --production

# Stage 2: runtime
FROM node:18-alpine AS runner
ENV NODE_ENV=production
ENV PORT=5000
WORKDIR /home/node/app

# Copy only what is needed for runtime
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Adjust ownership and drop privileges
RUN chown -R node:node /home/node/app
USER node

EXPOSE 5000
CMD ["node", "dist/main.js"]