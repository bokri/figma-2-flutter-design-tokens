/**
 * @fileoverview This file contains functions to process border radius values and generate corresponding Flutter BorderRadius expressions.
 * It includes utility functions to handle different formats of border radius values and generate Dart code for static final properties.
 */

import { removeUnit } from "../utils/utils.js";

export const processBorderRadius = (value) => {
  const corners = value.split(" ").map((corner) => removeUnit(corner));

  if (corners.length === 1) {
    return `BorderRadius.circular(${corners[0]})`;
  }

  if (corners.length === 2) {
    return `BorderRadius.vertical(
      top: Radius.circular(${corners[0]}),
      bottom: Radius.circular(${corners[1]})
    )`;
  }

  if (corners.length === 4) {
    return `BorderRadius.only(
      topLeft: Radius.circular(${corners[0]}),
      topRight: Radius.circular(${corners[1]}),
      bottomRight: Radius.circular(${corners[2]}),
      bottomLeft: Radius.circular(${corners[3]})
    )`;
  }

  return `BorderRadius.circular(0)`;
};

export const handleBorderRadius = (prop, value) =>
  `  static final ${prop.name} = ${processBorderRadius(value)};`;
