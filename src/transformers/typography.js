/**
 * @fileoverview This module provides a function to handle typography properties
 * and generate a TextStyle string for use in styling text elements.
 * It imports a helper function to process font weights.
 */

import { processFontWeights } from "./fontWeights.js";

export function handleTypography(prop, value) {
  const fontFamily = value.fontFamily || '""';
  const fontWeight = processFontWeights(
    value.fontWeight || "FontWeight.normal",
  );
  const lineHeight = value.lineHeight || "1.0";
  const fontSize = value.fontSize || "12.0";
  const letterSpacing = value.letterSpacing || "0.0";

  return `  static const ${prop.name} = TextStyle(
    fontFamily: '${fontFamily}',
    fontWeight: ${fontWeight},
    height: ${lineHeight},
    fontSize: ${fontSize},
    letterSpacing: ${letterSpacing}
  );
  `;
}
