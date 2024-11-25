/**
 * @fileoverview This module provides utility functions for processing and handling color values.
 * It includes functions to convert color values from various formats (e.g., rgba, hex) to a specific format.
 */

export const processColor = (value) => {
  const rgbaMatch = value.match(
    /rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*([\d.]+)?\)/,
  );
  if (rgbaMatch) {
    const [, r, g, b, a = 1] = rgbaMatch.map(Number);
    return `Color.fromRGBO(${r}, ${g}, ${b}, ${a.toFixed(2)})`;
  }

  if (/^#/.test(value)) {
    return `Color(0xFF${value.slice(1).toUpperCase()})`;
  }

  return value; // Return unchanged for unsupported formats
};

export const handleColors = (prop, value) =>
  `  static const ${prop.name} = ${processColor(value)};`;
