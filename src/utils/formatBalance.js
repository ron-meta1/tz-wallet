export function formatBalance(
    balance,
    decimals = 4
) {

    if (!balance) return "0";

    return Number(balance)
        .toFixed(decimals)
        .replace(/\.?0+$/, "");
}