/**
 * @fileoverview This module provides utility functions for processing and handling color values.
 * It includes functions to convert color values from various formats (e.g., rgba, hex) to a specific format.
 */

export function processColor(value) {
  const match = value.match(/rgba?\(\s*Color\(0x([A-Fa-f0-9]{8})\)\s*,\s*([\d.]+)%\s*\)/);
  if (match) {
    const [, hex, alphaPercent] = match;
    const r = parseInt(hex.slice(2, 4), 16);
    const g = parseInt(hex.slice(4, 6), 16);
    const b = parseInt(hex.slice(6, 8), 16);
    const alpha = (parseFloat(alphaPercent) / 100).toFixed(2);
    return `Color.fromRGBO(${r}, ${g}, ${b}, ${alpha})`;
  }
  return value;
}

export function handleColors(prop, value) {
  value = processColor(value);
  return `  static const ${prop.name} = ${value};`;
}
