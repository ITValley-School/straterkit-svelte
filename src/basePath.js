// This utility will be used to access the base path dynamically
export function getBasePath() {
    return import.meta.env.VITE_BASE_PATH || '';  // Default to an empty string if not defined
}
  