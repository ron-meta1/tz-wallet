export async function copyToClipboard(text) {

    if (!text) {
        throw new Error("No text provided");
    }

    await navigator.clipboard.writeText(text);
}