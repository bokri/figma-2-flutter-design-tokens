/**
 * @fileoverview This file contains constant mappings and arrays used for text decoration, font weight,
 * and various style types. These constants are used to standardize and map style properties
 * throughout the application.
 */

// Constants for text decoration mapping
export const decorationMap = {
  none: "TextDecoration.none",
  underline: "TextDecoration.underline",
  overline: "TextDecoration.overline",
  lineThrough: "TextDecoration.lineThrough",
};

// Constants for font weight mapping
export const fontWeightMap = {
  thin: "FontWeight.w100",
  extralight: "FontWeight.w200",
  light: "FontWeight.w300",
  regular: "FontWeight.w400",
  medium: "FontWeight.w500",
  semibold: "FontWeight.w600",
  bold: "FontWeight.w700",
  extrabold: "FontWeight.w800",
  black: "FontWeight.w900",
};

// Array of all style types
export const allTypes = [
  "fontWeights",
  "color",
  "boxShadow",
  "typography",
  "letterSpacing",
  "lineHeights",
  "fontSizes",
  "paragraphSpacing",
  "opacity",
  "spacing",
  "sizing",
  "borderWidth",
  "fontFamilies",
  "borderRadius",
  "textDecoration",
];
