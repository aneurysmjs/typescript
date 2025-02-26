/* eslint-disable no-undef */
import { rollup } from 'rollup';
import rollupConfig from '../rollup.config.js';

import process from 'node:process';

async function build() {
  for (const config of rollupConfig) {
    const bundle = await rollup(config);

    await bundle.write(config.output);
  }

  console.log('Сборка завершена');
}

build().catch((error) => {
  console.error(error);
  process.exit(1);
});
