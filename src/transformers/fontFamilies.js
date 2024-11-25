/**
 * @fileoverview This file contains a function to handle font families.
 * The function generates a static constant declaration for a given property name and value.
 */

// Font family handler
export const handleFontFamilies = (prop, value) =>
  `  static const ${prop.name} = '${value}';`;
