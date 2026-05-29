/**
 * Format a value as Indian Rupee currency.
 * Large values use Indian notation (L = Lakh, Cr = Crore).
 */
export const formatCurrency = (value) => {
  const abs = Math.abs(value);
  let str;
  if (abs >= 1e7) {
    str = "₹" + (abs / 1e7).toFixed(2) + " Cr";
  } else if (abs >= 1e5) {
    str = "₹" + (abs / 1e5).toFixed(2) + " L";
  } else {
    str = "₹" + abs.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  return value < 0 ? "-" + str : str;
};

/**
 * Format a token quantity, handling very large and very small values.
 */
export const formatSmallNumber = (value) => {
  const abs = Math.abs(value);
  if (abs === 0) return "0";
  if (abs < 1e-10) return "~0";
  if (abs >= 1e9)  return value.toExponential(2);
  if (abs >= 1e6)  return value.toLocaleString("en-IN", { maximumFractionDigits: 2 });
  if (abs < 0.0001) return value.toExponential(4);
  return value.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  });
};

/**
 * Format a token price in INR.
 */
export const formatPrice = (value) => {
  if (value === 0) return "₹0.00";
  if (value < 0.0001) return "₹" + value.toExponential(4);
  if (value >= 1e5) {
    return "₹" + value.toLocaleString("en-IN", { maximumFractionDigits: 2 });
  }
  return "₹" + value.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  });
};

/**
 * Format a gain value — returns ₹0.00 for negligible amounts.
 */
export const formatGain = (value) => {
  if (Math.abs(value) < 1e-8) return "₹0.00";
  return formatCurrency(value);
};
