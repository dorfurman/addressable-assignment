export function formatCryptoPrice(price: number): number {
  if (price >= 1000) {
    // No decimals, commas for thousands
    return Math.round(price);
  } else if (price >= 1) {
    // Two decimals, remove trailing zeros
    return Number(
      price
        .toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
        .replace(/\.00$/, "")
    );
  } else if (price >= 0.01) {
    // Four decimals, remove trailing zeros
    return Number(
      price
        .toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 4,
        })
        .replace(/\.?0+$/, "")
    );
  } else {
    // For really small values (e.g., $0.000123), show up to 8 decimals
    return Number(
      price
        .toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 8,
        })
        .replace(/\.?0+$/, "")
    );
  }
}
