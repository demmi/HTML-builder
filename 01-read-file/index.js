const fs = require ('fs')
const path = require ('path')

let stream = fs.ReadStream(path.resolve('01-read-file', 'text.txt'));
stream.pipe(process.stdout)