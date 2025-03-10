import path from 'node:path';
import fsP from 'node:fs/promises';

/**
 * Represents a nested folder structure where a file is a string and a folder is an array containing the folder name and its children.
 */
type FolderHierarchy = string | [string, FolderHierarchy[]];

/**
 * Recursively reads a directory and returns a nested array structure representing the folder hierarchy.
 * @param {string} dir - The directory to read.
 * @returns {Promise<Array>} - The hierarchical structure as a nested array.
 */
export async function readFolderHierarchy(dir: string): Promise<FolderHierarchy[]> {
  const entries = await fsP.readdir(dir, { withFileTypes: true });
  const result: FolderHierarchy[] = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const subDir = await readFolderHierarchy(path.join(dir, entry.name));
      result.push([entry.name, subDir]);
    } else {
      result.push(entry.name);
    }
  }

  return result;
}
