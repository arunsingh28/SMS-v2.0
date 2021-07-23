const getTimeStamp = (): string => {
    return new Date().toISOString()
}

const info = (namespace: String, message: String, object?: any) => {
    if (object) {
        console.log(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`, object)
    } else {
        console.log(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`)
    }
}


export default { info }