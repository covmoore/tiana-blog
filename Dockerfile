# ---- Build stage ----
FROM node:25-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# NEXT_PUBLIC_* vars are inlined into the client bundle at build time, so the
# API URL must be provided here as a build arg (a runtime env var won't reach
# browser code). The CI workflow passes --build-arg NEXT_PUBLIC_API_URL=...
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# public/ is gitignored, so make sure it exists for the COPY in the run stage.
RUN mkdir -p public && npm run build

# ---- Run stage ----
FROM node:25-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# Cloud Run sets PORT to the configured container port; next start honors it.
ENV PORT=3000

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.cjs ./

EXPOSE 3000
CMD ["npm", "start"]
