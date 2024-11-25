/**
 * @file styleDictionaryConfig.js
 * @description Configuration file for Style Dictionary with custom formats and transforms.
 *
 * This file sets up the Style Dictionary configuration by registering Tokens Studio transforms
 * and a custom format for Flutter classes.
 *
 * @module styleDictionaryConfig
 */

import { register } from "@tokens-studio/sd-transforms";
import StyleDictionary from "style-dictionary";
import flutterClassFormat from "../formats/flutterClassFormat.js";

// Register Tokens Studio transforms with Style Dictionary
register(StyleDictionary);

// Register the custom format
StyleDictionary.registerFormat(flutterClassFormat);

export default StyleDictionary;
