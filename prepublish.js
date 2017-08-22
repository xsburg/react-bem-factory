/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: 0 */

'use strict';

const exec = require('child_process').exec;
const fs = require('fs');

const removeBom = (text) => {
    return text.replace(/^\uFEFF/, '');
};

exec('git tag --contains HEAD', function (err, stdout, stderr) {
    if (err) {
        console.error(err);
        return;
    }

    if (stdout) {
        console.log(stdout);
    }
    if (stderr) {
        console.log(stderr);
    }

    let matchResult = /^v(.+)$/gm.exec(stdout);
    if (matchResult === null) {
        console.log('PrepareToPublishTask: no tags found, skip package.json update.');
        return;
    }
    const version = matchResult[1];

    console.log(`PrepareToPublishTask: There is a tag that matches the version pattern. Updating package.json with version ${version}...`);
    let packageJson = JSON.parse(removeBom(fs.readFileSync(`${__dirname}/package.json`, 'utf8')));
    packageJson.version = version;
    fs.writeFileSync(`${__dirname}/package.json`, JSON.stringify(packageJson, null, '  '), 'utf8');
    console.log(`Updated.`);
});
