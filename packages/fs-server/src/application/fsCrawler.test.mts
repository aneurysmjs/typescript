import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { vol } from 'memfs';

import { readFolderHierarchy } from './fsCrawler.mjs';

/**
 * Mock fs everywhere else with the memfs version.
 * @see https://kschaul.com/til/2024/06/26/mock-fs-with-vitest-and-memfs/
 */
vi.mock('node:fs', async () => {
  const memfs = await vi.importActual<typeof import('memfs')>('memfs');

  // Support both `import fs from "fs"` and "import { readFileSync } from "fs"`
  return {
    default: memfs.fs,
    ...memfs.fs,
  };
});

vi.mock('node:fs/promises', async () => {
  const memfs = await vi.importActual<typeof import('memfs')>('memfs');

  return {
    default: memfs.fs.promises,
    ...memfs.fs.promises,
  };
});

const localesFolder = `${process.cwd()}/bla`;

describe('fsCrawler', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    vi.resetAllMocks();
    vol.reset();
  });

  describe('readFolderHierarchy', () => {
    it('should return single array of one file in the hierarchy', async () => {
      vol.fromNestedJSON({
        [localesFolder]: {
          'pnpm-lock.yaml': '',
        },
      });
      const result = await readFolderHierarchy(localesFolder);

      expect(result).toStrictEqual(['pnpm-lock.yaml']);
    });

    it('should return nested array that represent nested file system hierarchies', async () => {
      vol.fromNestedJSON({
        [localesFolder]: {
          'pnpm-lock.yaml': '',
          'package.json': '{}',
          foo: {
            bar: {
              'my-file.mts': '{}',
            },
          },
        },
      });
      const result = await readFolderHierarchy(localesFolder);

      expect(result).toStrictEqual([
        ['foo', [['bar', ['my-file.mts']]]],
        'package.json',
        'pnpm-lock.yaml',
      ]);
    });
  });
});
