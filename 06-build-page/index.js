const fsPromises = require('fs/promises');
const path = require('path');

const projectPath = path.resolve(__dirname, 'project-dist');
const assetsPath = path.resolve(__dirname, 'assets');
const stylesPath = path.resolve(__dirname, 'styles');
const componentsPath = path.resolve(__dirname, 'components');

async function copyDirectory(src, dest) {
    await fsPromises.mkdir(dest, {
        recursive: true
    });
    let entries = await fsPromises.readdir(src, {
        withFileTypes: true
    });

    for (let entry of entries) {
        let srcPath = path.resolve(src, entry.name);
        let destPath = path.resolve(dest, entry.name);
        entry.isDirectory() ? await copyDirectory(srcPath, destPath) : await fsPromises.copyFile(srcPath, destPath);
    }
}

async function createStyles(src, dest) {
    await fsPromises.writeFile(dest, '')
    let files = await fsPromises.readdir(src, {
        withFileTypes: true
    })
    files.forEach(async file => {
        if (file.isFile() && path.extname(file.name) === '.css') {
            let content = await fsPromises.readFile(path.resolve(src, file.name), {
                encoding: 'utf-8'
            })
            await fsPromises.appendFile(dest, content+'\n')
        }
    })
}


async function readTemplate() {
    let template = await fsPromises.readFile(path.resolve(__dirname, 'template.html'), {
        encoding: 'utf-8'
    })
    return template
}

async function readComponents() {
    let filesList = {}
    let components = await fsPromises.readdir(componentsPath, {
        withFileTypes: true
    })
    components.forEach(component => {
        if (component.isFile() && path.extname(component.name) === '.html') {
            let fullFileName = path.resolve(componentsPath, component.name)
            filesList[path.basename(fullFileName, path.extname(fullFileName))] = component.name
        }
    })
    return filesList;
}

async function getComponents() {
    let componentsContent = {}
    let filesList = await readComponents();
    for (key in filesList) {
        let content = await fsPromises.readFile(path.resolve(componentsPath, filesList[key]), {
            encoding: 'utf-8'
        })
        componentsContent[key] = content
    }
    return componentsContent
}


async function createHtml() {
    const regExp = /(?<={{)[^}]*(?=}})/g
    let templateHTML = await readTemplate()
    let components = await getComponents();
    let templates = templateHTML.match(regExp)
    templates.forEach(template => {
        templateHTML = templateHTML.replace(`{{${template}}}`, components[template])
    })
    await fsPromises.writeFile(path.resolve(projectPath, 'index.html'), templateHTML)
}

async function init() {
    await copyDirectory(assetsPath, path.resolve(projectPath, 'assets'));
    await createStyles(stylesPath, path.resolve(projectPath, 'style.css'));
    await createHtml();
}

init();