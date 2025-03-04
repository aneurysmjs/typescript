/// <reference types="vitest" />
import { defineWorkspace } from 'vitest/config';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const packages = path.resolve(dirname, 'packages');

function getFoldersSync(dirPath: string) {
  const files = fs.readdirSync(dirPath);
  const folders = files.filter((file) => {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);

    return stats.isDirectory();
  });

  return folders;
}

const testProjectConfigurations = getFoldersSync(packages).map((pkgName) => {
  const app = path.resolve(packages, pkgName);

  return {
    test: {
      root: app,
      environment: 'jsdom',
      name: pkgName,
    },
  };
});

export default defineWorkspace([...testProjectConfigurations]);
