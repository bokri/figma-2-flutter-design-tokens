/**
 * @fileoverview Utility functions for formatting theme-related strings.
 * This file contains functions to format theme destinations, file names, and class names
 * into different cases such as snake_case and CamelCase.
 */

// Format theme destination
export function formatThemeDestination(theme) {
  const toSnakeCase = (str) =>
    str
      .replace(/\btheme\b/gi, "") // Remove the word 'theme' (case-insensitive)
      .replace(/([a-z])([A-Z])/g, "$1_$2") // Handle camelCase or PascalCase by inserting underscores
      .replace(/[\s]+/g, "_") // Replace spaces with underscores
      .replace(/[^a-z0-9_]/gi, "") // Remove non-alphanumeric characters except underscores
      .toLowerCase(); // Convert the entire string to lowercase for snake case

  return toSnakeCase(`${theme.group} ${theme.name}`);
}

// Format file name
export function formatFileName(type) {
  const toSnakeCase = (str) =>
    str
      .replace(/\btheme\b/gi, "") // Remove the word 'theme' (case-insensitive)
      .replace(/([a-z])([A-Z])/g, "$1_$2") // Handle camelCase or PascalCase by inserting underscores
      .replace(/[\s]+/g, "_") // Replace spaces with underscores
      .replace(/[^a-z0-9_]/gi, "") // Remove non-alphanumeric characters except underscores
      .toLowerCase(); // Convert the entire string to lowercase for snake case

  return toSnakeCase(`${type}`);
}

// Format class name
export function formatThemeClassName(theme) {
  const toCamelCase = (str) =>
    str
      .toLowerCase()
      .replace(/\btheme\b/g, "") // Remove the word 'theme'
      .split(/\s+/) // Split by spaces
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");

  return toCamelCase(`${theme.group} ${theme.name}`);
}
