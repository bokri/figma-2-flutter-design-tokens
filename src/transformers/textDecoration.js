/**
 * @file textDecoration.js
 * @description This file contains a function to handle text decoration properties.
 * It imports a decoration map from the constants utility file and uses it to map
 * text decoration values to their corresponding constants.
 */

import { decorationMap } from "../utils/constants.js";

// Handle text decoration properties
export function handleTextDecoration(prop, value) {
  const decoration =
    decorationMap[value.toLowerCase()] || "TextDecoration.none";
  return `  static const ${prop.name} = ${decoration};`;
}
