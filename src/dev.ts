import * as fs from "fs"
import * as path from "path"

function walk (srcPath: string) {
    fs.readdir(srcPath, (err, files) => {
        if(err) {
            throw new Error(`dev.js fs.readdir error: ' ${err}`)
        } 
        files.forEach(async file => {
            try {
                const filePath = `${path.resolve(srcPath)}/${file}`
                const goDeep = await isDirectory(filePath)
                if (goDeep) {
                    watcher(filePath)
                    walk(filePath)
                }
            } catch(err) {
                console.error(err)
            }
        })
    })
}

function isDirectory (filePath: string) {
    return new Promise((resolve, reject) => {
        fs.stat(filePath, (err, stat) => {
            if (err) {
                return reject(err)
            }
            return resolve(stat.isDirectory())
        })
    })
}


function watcher(directory: string) {
    fs.watch(directory, {encoding: 'buffer'}, (eventType, filename) => {

    })
}