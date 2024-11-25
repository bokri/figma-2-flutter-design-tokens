/**
 * @fileoverview This module provides a generic value handler function.
 */

// Generic value handler
export const handleValues = (prop, value) =>
  `  static const ${prop.name} = '${value}';`;
