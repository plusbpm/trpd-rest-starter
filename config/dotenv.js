const { join } = require('path');
const { existsSync, copyFileSync } = require('fs');
const dotenv = require('dotenv-safe');

const configFolder = process.env.CONFIG_FOLDER || '';
const root = join(__dirname, `../${configFolder}`);
const path = join(root, '.env');
const example = join(root, '.env.example');

if (!existsSync(path)) copyFileSync(example, path);

const { error } = dotenv.config({
  allowEmptyValues: true,
  path,
  example,
});
if (error) throw error;
