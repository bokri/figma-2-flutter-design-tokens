/**
 * @fileoverview This module provides a function to handle dimensions and spacing.
 * It imports a utility function `removeUnit` from the utils module.
 */

import { removeUnit } from "../utils/utils.js";

export const handleDimensionsAndSpacing = (prop, value) =>
  `  static const double ${prop.name} = ${removeUnit(value)};`;
