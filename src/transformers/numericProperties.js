/**
 * @file numericProperties.js
 * @description This module provides handlers for numeric properties, converting them into static constants.
 */

import { parseNumericValue } from "../utils/utils.js";

// Generic numeric property handler
export const handleNumericProperty = (prop, value, unit = "") =>
  `  static const ${prop.name} = ${parseNumericValue(value)}${unit};`;

// Handlers for specific properties
export const handleLetterSpacing = (prop, value) =>
  handleNumericProperty(prop, value);
export const handleLineHeights = (prop, value) =>
  handleNumericProperty(prop, value);
export const handleFontSizes = (prop, value) =>
  handleNumericProperty(prop, value);
export const handleParagraphSpacing = (prop, value) =>
  handleNumericProperty(prop, value);
