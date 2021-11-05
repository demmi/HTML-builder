const fs = require('fs');
const path = require('path');

const currentPath = path.resolve(__dirname, 'files');
const newPath = path.resolve(__dirname, 'files-copy');


function createDir() {
    fs.stat(newPath, (err) => {
        if (err && err.code === 'ENOENT') {
            fs.mkdir(newPath, (err) => {})
        } else {
            fs.rm(newPath, {force: true}, (err, files) => {})
        }
    })
}

function copyDirectory() {
    createDir()
    fs.readdir(currentPath, (err, files) => {
        files.forEach(file => {
            fs.copyFile(path.resolve(currentPath, file), path.resolve(newPath, file), (err) => {})
        })
    })
}

copyDirectory()