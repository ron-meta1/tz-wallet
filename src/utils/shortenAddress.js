export function shortenAddress(
    text,
    start = 6,
    end = 4
) {

    if (!text) return "";

    return `${text.slice(0, start)}...${text.slice(-end)}`;
}