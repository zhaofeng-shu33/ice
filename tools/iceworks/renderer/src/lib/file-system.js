import fs from 'fs';
import pathExists from 'path-exists';
import junk from 'junk';

export const readdirSync = (targetPath) => {
  if (pathExists.sync(targetPath)) {
    return fs.readdirSync(targetPath).filter(junk.not);
  }
  return [];
};
