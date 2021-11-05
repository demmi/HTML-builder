const fs = require ('fs')
const path = require ('path')

let stream = fs.ReadStream(path.resolve(__dirname, 'text.txt'), {encoding: 'utf-8'});
stream.pipe(process.stdout)