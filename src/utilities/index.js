/**
 * @function formatCurrency
 * @param {number} amount 
 * @returns {string}c
 * 
 * @example
 *  formatCurrency(0)
 *  // => $0.00
 * 
 * @example
 *  formatCurrency(1.6)
 *  // => $1.60
 */

export function formatCurrency(amount) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  }