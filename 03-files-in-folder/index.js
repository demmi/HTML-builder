const fs = require('fs')
const path = require ('path')

let folderPath = path.resolve(__dirname, 'secret-folder')

let fileList = fs.readdir(folderPath, {withFileTypes: true}, (err, files) => {
    files.forEach(file => {
        if (file.isFile()) {
            let fullFileName = path.resolve(folderPath, file.name)
            fs.stat(fullFileName, (err, fileStat) => {
                console.log(path.basename(fullFileName, path.extname(fullFileName)), '-',path.extname(fullFileName).split('.').join(''), '-',(fileStat.size/1024).toFixed(2), 'kb')
            })
        }
        
    })
})