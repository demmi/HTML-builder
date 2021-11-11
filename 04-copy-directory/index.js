const fs = require('fs/promises');
const path = require('path');

const currentPath = path.resolve(__dirname, 'files');
const newPath = path.resolve(__dirname, 'files-copy');


async function copyDirectory(src, dest) {
    await fs.rm(dest, {
        recursive: true,
        force: true
    })
    await fs.mkdir(dest, {
        recursive: true
    });
    let entries = await fs.readdir(src, {
        withFileTypes: true
    });

    for (let entry of entries) {
        let srcPath = path.resolve(src, entry.name);
        let destPath = path.resolve(dest, entry.name);
        entry.isDirectory() ? await copyDirectory(srcPath, destPath) : await fs.copyFile(srcPath, destPath);
    }
}

copyDirectory(currentPath, newPath)