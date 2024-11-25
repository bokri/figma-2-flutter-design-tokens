/**
 * @file fontWeights.js
 * @description This file contains functions to process and handle font weights for Flutter.
 * It maps font weight strings to Flutter FontWeight constants and generates Flutter-compatible font weight constants.
 */

import { fontWeightMap } from "../utils/constants.js";

export const processFontWeights = (value) =>
  fontWeightMap[value.toLowerCase()] || "FontWeight.w400";

export const handleFontWeights = (prop, value) =>
  `  static const ${prop.name} = ${processFontWeights(value)};`;
