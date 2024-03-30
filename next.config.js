/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "cathy-loerzel-img.s3.us-west-2.amazonaws.com",
    ],
  },
};

export default config;
