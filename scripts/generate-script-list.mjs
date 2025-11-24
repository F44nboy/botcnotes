import fs from 'fs/promises';
import path from 'path';

// Paths are relative to the project root where the script is run
const scriptsDir = path.resolve(process.cwd(), 'public/scripts');
const outputFile = path.resolve(process.cwd(), 'public/script-list.json');

async function generateScriptList() {
  try {
    // Ensure the source directory exists
    await fs.access(scriptsDir);

    const files = await fs.readdir(scriptsDir);
    // Filter for .json files only
    const jsonFiles = files.filter(file => path.extname(file).toLowerCase() === '.json');

    // Prepare the JSON content
    const fileListJson = JSON.stringify(jsonFiles, null, 2);

    // Write the list to the output file
    await fs.writeFile(outputFile, fileListJson);

    console.log(`Successfully generated script list at: ${outputFile}`);
    console.log(fileListJson);

  } catch (error) {
    if (error.code === 'ENOENT') {
      console.warn(`Warning: Directory not found: ${scriptsDir}. No script list generated.`);
      // Create an empty list if the directory doesn't exist
      await fs.writeFile(outputFile, JSON.stringify([], null, 2));
    } else {
      console.error('Error generating script list:', error);
      process.exit(1);
    }
  }
}

generateScriptList();
