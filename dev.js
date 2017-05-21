const fs = require('fs')
const config = require('./config')
const path = require('path')




walk(config.dev.path.src)


function walk (srcPath) {
    fs.readdir(srcPath, (err, files) => {
        files.forEach(async file => {
            try {
                const filePath = `${path.resolve(srcPath)}/${file}`
                const goDeep = await isDirectory(filePath)
                if (goDeep) {
                    watcher(filePath)
                    walk(filePath)
                }
            } catch (err) {
                console.log(err)
            }
        })
    })
} 






function isDirectory (filePath) {
    return new Promise((resolve, rej) =>{
        fs.stat(filePath, (err, stat) => {
            if (err) { 
                rej() 
            }
            resolve(stat.isDirectory())
        })
    })
}


function watcher (directory) {
    fs.watch(directory, {encoding: 'buffer'}, (eventType, filename) => {
        
    })
}