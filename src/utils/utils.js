/**
 * @file utils.js
 * @description Utility functions for parsing numeric values and handling units.
 */

// Parse numeric value and handle invalid input gracefully
export function parseNumericValue(value) {
  return parseFloat(value) || 0;
}

// Remove a specific unit from a value (e.g., 'px') and parse the number
export function removeUnit(value, unit = "px") {
  return parseNumericValue(value.replace(unit, ""));
}
