import { API_BASE, UPLOADS_BASE } from "../config/api";

export default function getImageUrl(url) {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    if (url.startsWith("/")) return API_BASE + url;

    return UPLOADS_BASE + url;
}
