const DEFAULT_API = "https://test.onesnzeroes.dev";
export const API_BASE = import.meta.env.VITE_API_BASE || DEFAULT_API;
export const UPLOADS_BASE = `${API_BASE}/uploads/`;

export default {
    API_BASE,
    UPLOADS_BASE,
};
