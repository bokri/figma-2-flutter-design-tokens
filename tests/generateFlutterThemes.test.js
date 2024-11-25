const { promises } = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const inputPath = path.join(__dirname, "../example/$themes.json");  // Use the themes file from the example directory
const outputPath = path.join(__dirname, "output");

// Expected output files in generated directories
const expectedFiles = [
  "text_decoration.g.dart",
  "line_heights.g.dart",
  "border_width.g.dart",
  "box_shadow.g.dart",
  "values.g.dart",
  "paragraph_spacing.g.dart",
  "border_radius.g.dart",
  "letter_spacing.g.dart",
  "font_families.g.dart",
  "spacing.g.dart",
  "typography.g.dart",
  "opacity.g.dart",
  "color.g.dart",
  "font_sizes.g.dart",
  "font_weights.g.dart",
  "sizing.g.dart",
];

async function setup() {
  // Ensure the output directory is clean
  await promises.rm(outputPath, { recursive: true, force: true });
  await promises.mkdir(outputPath, { recursive: true });
}

async function teardown() {
  // Clean up output directory
  await promises.rm(outputPath, { recursive: true, force: true });
}

describe("Flutter Theme Generation", () => {
  beforeAll(setup);
  afterAll(teardown);

  test("should generate Flutter theme files correctly using example themes", async () => {
    // Check if the input file exists
    try {
      await promises.access(inputPath);
    } catch (err) {
      throw new Error(`Input file not found: ${inputPath}`);
    }

    // Run the script to generate theme files
    execSync(`node index.js --input='${inputPath}' --output=${outputPath}`);

    // Check if the output directories for light and dark themes were generated
    const directories = await promises.readdir(outputPath);
    expect(directories).toContain("default_light");
    expect(directories).toContain("default_dark");

    // Check if the expected files are generated within the directories
    // Check that the files are generated within the directories
    const lightFiles = await promises.readdir(path.join(outputPath, "default_light"));
    const darkFiles = await promises.readdir(path.join(outputPath, "default_dark"));

    expectedFiles.forEach((file) => {
      expect(lightFiles).toContain(file);  // Check that the file exists in light directory
      expect(darkFiles).toContain(file);   // Check that the file exists in dark directory
    });

    // Additional Check: Ensure that each expected file is found in the respective directories
    for (const file of expectedFiles) {
      const lightFilePath = path.join(outputPath, "default_light", file);
      const darkFilePath = path.join(outputPath, "default_dark", file);

      // Check if the file exists in the light and dark directories
      await promises.access(lightFilePath).catch(() => {
        throw new Error(`Expected file not found: ${lightFilePath}`);
      });
      await promises.access(darkFilePath).catch(() => {
        throw new Error(`Expected file not found: ${darkFilePath}`);
      });
    }

    // Check the content of one of the generated files
    const content = await promises.readFile(
      path.join(outputPath, "default_light", "values.g.dart"),
      "utf-8"
    );
    expect(content).toContain("class ThemeDefaultLightValues");
  });
});