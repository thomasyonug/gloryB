import * as chalk from "chalk"

export default (color: any, content: any) => {
    console.log(chalk[color](content))
}