/**
 * @fileoverview This module exports a custom format for generating Flutter class files.
 * The format function generates a Dart class with the provided class name and variables.
 *
 * @module formats/flutterClassFormat
 */

import { fileHeader, formattedVariables } from "../utils/fileHelpers.js";
import { allTypes } from "../utils/constants.js";

// Custom format for generating Flutter class files
export default {
  name: "custom/flutter/class.dart",
  format: async ({ dictionary, file, options }) => {
    const { className, type } = options;
    const header = await fileHeader({ file });
    const variables = formattedVariables({ dictionary, type, allTypes });

    return (
      `${header}import 'package:flutter/material.dart';\n\n` +
      `class ${className} {\n` +
      `  ${className}._();\n\n` +
      `${variables}\n` +
      `}`
    );
  },
};
