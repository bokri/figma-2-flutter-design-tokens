/**
 * @file generateFlutterThemes.js
 * @description This script generates Flutter theme files using Style Dictionary and Tokens Studio transforms.
 * It parses command-line arguments, validates inputs, removes old files, loads themes, filters themes by group,
 * and generates configuration for each theme to build Flutter theme files.
 *
 * @module generateFlutterThemes
 */

import { register } from "@tokens-studio/sd-transforms";
import StyleDictionary from "style-dictionary";
import { parseArguments, displayHelp } from "../utils/cli.js";
import { validateInputs, removeOldFiles } from "../utils/validators.js";
import {
  formatThemeDestination,
  formatFileName,
  formatThemeClassName,
} from "../utils/themeHelpers.js";
import { loadThemes } from "../utils/fileHelpers.js";
import { allTypes } from "../utils/constants.js";
import flutterClassFormat from "../formats/flutterClassFormat.js";
import path from 'path';

// Register Tokens Studio transforms with Style Dictionary
register(StyleDictionary);

// Register the custom format
StyleDictionary.registerFormat(flutterClassFormat);

async function run() {
  // Parse command-line arguments
  const args = parseArguments();

  if ("help" in args) {
    displayHelp();
    return;
  }

  const inputPath = args.input;
  const outputPath = args.output || "generated/";
  const themeGroup = args.theme;

  // Check if input and output exist
  if (!inputPath || !outputPath) {
    console.error("Error: Both input and output paths are required.");
    return;
  }

  // Remove old generated files
  await removeOldFiles(outputPath);

  // Load the themes file
  const $themes = await loadThemes(inputPath);

  // Filter themes by group if specified
  const filteredThemes = themeGroup
    ? $themes.filter(
        (theme) => theme.group.toLowerCase() === themeGroup.toLowerCase(),
      )
    : $themes;

  const configs = filteredThemes.flatMap((theme) => {
    const themeName = formatThemeDestination(theme);


    return allTypes.map((type) => ({
      source: Object.entries(theme.selectedTokenSets)
        .filter(([, val]) => val !== "disabled")
        .map(([tokenset]) => {
          return path.resolve(path.dirname(inputPath), `${tokenset}.json`);
        }),
      log: {
        verbosity: "silent",
      },
      platforms: {
        flutter: {
          transformGroup: "flutter",
          transforms: ["attribute/cti", "name/camel", "color/hex"],
          buildPath: `${outputPath}/${themeName}/`,
          files: [
            {
              destination: `${formatFileName(type)}.g.dart`,
              format: "custom/flutter/class.dart",
              options: {
                outputReferences: false,
                className: `Theme${formatThemeClassName(theme)}${type.charAt(0).toUpperCase() + type.slice(1)}`,
                type,
              },
            },
          ],
        },
      },
    }));
  });

  // Add configuration for values file
  configs.push(
    ...filteredThemes.map((theme) => ({
      source: Object.entries(theme.selectedTokenSets)
        .filter(([, val]) => val !== "disabled")
        .map(([tokenset]) => {
          return path.resolve(path.dirname(inputPath), `${tokenset}.json`);
        }),
      log: {
        verbosity: "silent",
      },
      platforms: {
        flutter: {
          transformGroup: "flutter",
          transforms: ["attribute/cti", "name/camel", "color/hex"],
          buildPath: `${outputPath}/${formatThemeDestination(theme)}/`,
          files: [
            {
              destination: "values.g.dart",
              format: "custom/flutter/class.dart",
              options: {
                outputReferences: false,
                className: `Theme${formatThemeClassName(theme)}Values`,
                type: "values",
              },
            },
          ],
        },
      },
    })),
  );

  // Validate inputs and build for each theme configuration
  for (const config of configs) {
    await validateInputs(config.source);
    const sd = new StyleDictionary(config);
    sd.buildAllPlatforms();
  }

  console.log("Flutter theme files generated successfully!");
}

run();
