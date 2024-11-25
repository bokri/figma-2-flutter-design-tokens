/**
 * @fileoverview Utility functions for validating input files and removing old files.
 * This module provides functions to validate the existence of input files and to
 * remove old files from a specified output directory.
 */

import path from "path";
import { promises } from "fs";

// Validate the existence of input files
export async function validateInputs(tokensets) {
  for (const tokenset of tokensets) {
    const filePath = path.join(tokenset);
    try {
      await promises.access(filePath);
    } catch (_) {
      throw new Error(`Input file not found: ${filePath}`);
    }
  }
}

// Remove old files from the output directory
export async function removeOldFiles(outputPath) {
  try {
    const files = await promises.readdir(outputPath);
    for (const file of files) {
      await promises.rm(path.join(outputPath, file), {
        recursive: true,
        force: true,
      });
    }
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.error(`Error while removing old files: ${error.message}`);
    }
  }
}
