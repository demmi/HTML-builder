const fs = require('fs')
const path = require ('path')
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Введите текст > ',
});
const filePath = path.resolve(__dirname, 'log.txt');

fs.unlink(filePath, (err) => {});
const logger = fs.createWriteStream(filePath, {flags: 'a'});


rl.prompt();

rl.on('line', (line) => {
    switch (line) {
        case 'exit':
            logger.end()
            process.stdout.write('До свидания');
            process.exit(0);
        default:
            logger.write(line+'\n')
            break;
    }
}).on('close', () => {
    logger.end()
    process.stdout.write('До свидания');
    process.exit(0);
});