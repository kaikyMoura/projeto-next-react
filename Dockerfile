# syntax=docker/dockerfile:1

FROM node:20.10.0-alpine as base

# Set working directory for all build stages.
WORKDIR /app

################################################################################
# Create a stage for installing production dependecies.
FROM base AS deps

RUN apk add --no-cache libc6-compat

COPY package.json yarn.lock* package-lock.json ./

RUN npm ci --omit=dev

################################################################################
# Create a stage for building the application.
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

FROM base AS runner

# Use production node environment by default.
ENV NODE_ENV production

WORKDIR /app

COPY --from=builder /app/public ./public

RUN mkdir .next

# Copy the production dependencies from the deps stage and also
# the built application from the build stage into the image.
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Ensure correct permissions
RUN chown -R node:node /app

# Use a non-root user
USER node

# Expose the port that the application listens on.
EXPOSE 3000


# Run the application.
CMD npm run dev