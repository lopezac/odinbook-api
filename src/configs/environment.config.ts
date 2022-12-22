export const FRONT_END_URL =
  process.env.NODE_ENV === "production"
    ? process.env.FRONT_END_URL
    : "http://localhost:3000";
