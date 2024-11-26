/**
 * Parses command line arguments into an object.
 *
 * @returns {Object} An object where the keys are the argument names (without the '--' prefix)
 *                   and the values are the argument values.
 */
export function parseArguments() {
  const args = process.argv.slice(2);
  const argMap = {};

  args.forEach((arg) => {
    const [key, value] = arg.split("=");
    argMap[key.replace("--", "")] = value;
  });

  return argMap;
}

/**
 * Displays the help message for the CLI usage.
 */
export function displayHelp() {
  console.log(`
  Usage: node index.js [options]
  
  Options:
    --input=<path>   Path to the input themes file
    --output=<path>  Path to the output folder (default: generated/)
    --theme=<name>   Filter themes by group name
    --help           Display this help message
  `);
}
