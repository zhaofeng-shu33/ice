const os = require('os');
const gulp = require('gulp');
const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');
const execa = require('execa');
const builder = require('electron-builder');
const { getNpmTarball, getAndExtractTarball } = require('ice-npm-utils');
const packageJSON = require('./package.json');

const Platform = builder.Platform;

gulp.task('dist', () => {
  let targets;
  if (os.platform() === 'win32') {
    targets = Platform.WINDOWS.createTarget();
  } else {
    targets = Platform.MAC.createTarget();
  }
  const serverDir = path.join(__dirname, 'server');

  getNpmTarball('iceworks-server')
    .then((tarball) => {
      if (fs.existsSync(serverDir)) {
        rimraf.sync(serverDir);
      }
      return getAndExtractTarball(serverDir, tarball);
    })
    .then(() => {
      return execa.shell('npm install', {
        stdio: 'inherit',
        cwd: serverDir,
      });
    })
    .then(() => {
      return builder.build({
        targets,
        config: packageJSON.build,
      });
    })
    .catch(console.error);
});

gulp.task('dist-dev', () => {
  let targets;
  if (os.platform() === 'win32') {
    targets = Platform.WINDOWS.createTarget();
  } else {
    targets = Platform.MAC.createTarget();
  }
  // the server directory is created and installed manually.
  builder.build({
    targets,
    config: packageJSON.build,
  })
    .catch(console.error);
});
