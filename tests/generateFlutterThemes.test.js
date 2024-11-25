const { promises } = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const inputPath = path.join(__dirname, "test-themes.json");
const outputPath = path.join(__dirname, "output");

const expectedFiles = [
  "text_decoration.dart",
  "line_heights.dart",
  "border_width.dart",
  "box_shadow.dart",
  "values.dart",
  "paragraph_spacing.dart",
  "border_radius.dart",
  "letter_spacing.dart",
  "font_families.dart",
  "spacing.dart",
  "typography.dart",
  "opacity.dart",
  "color.dart",
  "font_sizes.dart",
  "font_weights.dart",
  "sizing.dart",
];

const testThemes = [
  {
    id: "c0383eb0870b6c29be38251a180431322672fc36",
    name: "Light",
    group: "Default Theme",
    selectedTokenSets: {
      "md/ref": "source",
      "md/sys": "enabled",
      "md/comp": "enabled",
      "md/atolls": "enabled",
    },
    $figmaStyleReferences: {},
  },
  {
    id: "6b841160c0bd64666dd3ec37718474b08c64132b",
    name: "Dark",
    group: "Default Theme",
    selectedTokenSets: {
      "md/ref": "source",
      "md/sys": "enabled",
      "md/comp": "enabled",
      "md/atolls": "enabled",
      "md/dark": "enabled",
    },
    $figmaStyleReferences: {},
  },
];

async function setup() {
  // Create test input file
  await promises.writeFile(inputPath, JSON.stringify(testThemes, null, 2));

  // Ensure the output directory is clean
  await promises.rm(outputPath, { recursive: true, force: true });
  await promises.mkdir(outputPath, { recursive: true });
}

async function teardown() {
  // Clean up test files
  await promises.rm(inputPath, { force: true });
  await promises.rm(outputPath, { recursive: true, force: true });
}

describe("index.js", () => {
  beforeAll(setup);
  afterAll(teardown);

  test("should generate Flutter theme files", async () => {
    // Run the build-output script
    execSync(`node index.js --input=${inputPath} --output=${outputPath}`);

    // Check that the output directories are generated
    const directories = await promises.readdir(outputPath);
    expect(directories).toContain("default_light");
    expect(directories).toContain("default_dark");

    // Check that the files are generated within the directories
    const lightFiles = await promises.readdir(
      path.join(outputPath, "default_light"),
    );
    const darkFiles = await promises.readdir(
      path.join(outputPath, "default_dark"),
    );

    expectedFiles.forEach((file) => {
      expect(lightFiles).toContain(file);
      expect(darkFiles).toContain(file);
    });

    // Check the content of one of the generated files
    const content = await promises.readFile(
      path.join(outputPath, "default_light", "values.dart"),
      "utf-8",
    );
    expect(content).toContain("class ThemeDefaultLightValues");
  });
});
