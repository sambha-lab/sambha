# Stage 1: Build stage
FROM node:22-alpine AS builder

# Enable Corepack for pnpm
RUN corepack enable

# Set working directory
WORKDIR /app

# Copy workspace configuration and lockfile
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./

# Copy all package.jsons to leverage pnpm's clever installation
COPY apps/backend/package.json ./apps/backend/
COPY packages ./packages/

# Install all dependencies (including devDeps for building)
RUN pnpm install --frozen-lockfile

# Copy source code
COPY apps/backend ./apps/backend
COPY packages ./packages

# Build the app
WORKDIR /app/apps/backend
RUN pnpm build

# Stage 2: Prune dependencies for production
# This stage creates a minimal set of production dependencies
WORKDIR /app
RUN pnpm --filter backend --prod deploy /prod-app

# Stage 3: Final Production Image
FROM node:22-alpine AS production

# Install tini for proper signal handling
RUN apk add --no-cache tini

# Set working directory
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Use a non-root user for security
RUN adduser --system --uid 1001 node-service
USER node-service

# Copy only the necessary files from the build process
# pnpm deploy handled the node_modules and package.json
COPY --from=builder /prod-app/node_modules ./node_modules
COPY --from=builder /prod-app/package.json ./package.json

# Copy the compiled distribution from the builder
COPY --from=builder /app/apps/backend/dist ./dist

# Expose the application port
EXPOSE 3000

# Use tini to manage the Node process
ENTRYPOINT ["/sbin/tini", "--"]

# Start the application using node directly (cleaner than pnpm start)
CMD ["node", "dist/index.js"]