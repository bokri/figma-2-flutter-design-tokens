/**
 * @file boxShadow.js
 * @description This file contains the function to handle box shadow properties and convert them into a specific string format.
 */

import { processColor } from "./colors.js";

/**
 * Converts box shadow properties into a formatted string.
 *
 * @param {Object} prop - The property object containing the name of the property.
 * @param {Array} value - An array of shadow objects, each containing color, x, y, blur, and spread properties.
 * @returns {string} A formatted string representing the box shadow properties.
 */
export const handleBoxShadow = (prop, value) => {
  const shadows = value
    .map((shadow) => {
      const color = processColor(shadow.color || "Colors.transparent");
      const x = shadow.x || 0;
      const y = shadow.y || 0;
      const blur = shadow.blur || 0;
      const spread = shadow.spread || 0;
      return `BoxShadow(color: ${color}, offset: Offset(${x}, ${y}), blurRadius: ${blur}, spreadRadius: ${spread})`;
    })
    .join(", ");

  return `  static const ${prop.name} = [${shadows}];`;
};
