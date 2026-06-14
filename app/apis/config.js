// Base URL for the backend API. In production this is baked in at build time
// from the NEXT_PUBLIC_API_URL build arg (see Dockerfile / CI workflow); it
// falls back to localhost for local development.
export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"
