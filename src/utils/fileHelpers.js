/**
 * @file fileHelpers.js
 * @description This file contains utility functions for handling theme files and formatting tokens.
 * It includes functions to load themes from a file, generate file headers, handle undefined token values,
 * process tokens based on their type, and format variables for output.
 * The supported token types include colors, font weights, box shadows, typography, dimensions and spacing,
 * text decoration, letter spacing, line heights, font sizes, paragraph spacing, opacity, font families, and border radius.
 * The functions rely on various handlers imported from the transformers module.
 */

import { promises } from "fs";
import {
  handleColors,
  handleBorderRadius,
  handleFontWeights,
  handleBoxShadow,
  handleTypography,
  handleDimensionsAndSpacing,
  handleTextDecoration,
  handleLetterSpacing,
  handleLineHeights,
  handleFontSizes,
  handleParagraphSpacing,
  handleOpacity,
  handleFontFamilies,
  handleValues,
} from "../transformers/index.js";

// Load themes from a file
export async function loadThemes(inputPath) {
  const data = await promises.readFile(inputPath, "utf-8");
  return JSON.parse(data);
}

// Helper to format the file header
export async function fileHeader({ file }) {
  return `// GENERATED CODE - DO NOT EDIT MANUALLY.\n// File: ${file.destination}\n\n// ignore_for_file: all\n// coverage:ignore-file\n\n`;
}

// Handle undefined token values
function handleUndefinedValue(prop) {
  console.warn(`Token ${prop.name} has an undefined value.`);
  return `  // Token ${prop.name} has an undefined value`;
}

// Process tokens based on their type
function handleToken(prop, value, type) {
  switch (type) {
    case "fontWeights":
      return handleFontWeights(prop, value);
    case "color":
      return handleColors(prop, value);
    case "boxShadow":
      return handleBoxShadow(prop, value);
    case "typography":
      return handleTypography(prop, value);
    case "letterSpacing":
      return handleLetterSpacing(prop, value);
    case "lineHeights":
      return handleLineHeights(prop, value);
    case "fontSizes":
      return handleFontSizes(prop, value);
    case "paragraphSpacing":
      return handleParagraphSpacing(prop, value);
    case "opacity":
      return handleOpacity(prop, value);
    case "spacing":
    case "sizing":
    case "borderWidth":
      return handleDimensionsAndSpacing(prop, value);
    case "fontFamilies":
      return handleFontFamilies(prop, value);
    case "borderRadius":
      return handleBorderRadius(prop, value);
    case "textDecoration":
      return handleTextDecoration(prop, value);
    default:
      return handleValues(prop, value);
  }
}

// Format variables for output
export function formattedVariables({ dictionary, type, allTypes }) {
  return dictionary.allTokens
    .filter((prop) =>
      type === "values" ? !allTypes.includes(prop.$type) : prop.$type === type,
    )
    .map((prop) => {
      const value = prop.$value;

      // Handle undefined values
      if (value === undefined) {
        return handleUndefinedValue(prop);
      }

      return handleToken(prop, value, type);
    })
    .join("\n");
}
