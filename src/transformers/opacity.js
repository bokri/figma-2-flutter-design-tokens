/**
 * @file /Users/aymenbokri/Desktop/root/src/transformers/opacity.js
 * @description This module provides a handler for converting opacity values to fractions.
 * @module transformers/opacity
 */

import { parseNumericValue } from "../utils/utils.js";

// Opacity property handler
export const handleOpacity = (prop, value) =>
  `  static const ${prop.name} = ${parseNumericValue(value) / 100};`;
