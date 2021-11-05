const fs = require('fs');
const path = require('path');

const stylesPath = path.resolve(__dirname, 'styles');
const projectPath = path.resolve(__dirname, 'project-dist', 'bundle.css');
let writeBundle = fs.createWriteStream(projectPath)

fs.readdir(stylesPath, {withFileTypes: true}, (err, files) => {
    files.forEach(file => {
        if (file.isFile() && path.extname(file.name) === '.css') {
            let readCSS = fs.createReadStream(path.resolve(stylesPath, file.name))
            readCSS.pipe(writeBundle)
        }
    })
})