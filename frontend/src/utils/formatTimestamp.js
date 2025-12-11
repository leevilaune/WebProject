export default function formatTimestamp(ts) {
    if (!ts && ts !== 0) return "-";
    // Normalize: if seconds (10 digits) -> convert to ms
    const asString = String(ts);
    let ms = Number(ts);
    if (asString.length <= 10) ms = ms * 1000;
    const date = new Date(ms);
    if (Number.isNaN(date.getTime())) return "-";

    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yy = String(date.getFullYear()).slice(-2);
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");

    return `${dd}/${mm}/${yy} - ${hh}:${min}`;
}
