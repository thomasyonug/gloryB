import * as error from "koa-json-error"

interface formatErr {
    status: string
    message: string
    success: boolean
    reason: string
}

function formatError(err: Error): formatErr {
    return {
        status: err.stack,
        message: err.message,
        success: false,
        reason: 'Unexpected'
    }
}

export = error({
    preFormat: null,
    format: formatError
})