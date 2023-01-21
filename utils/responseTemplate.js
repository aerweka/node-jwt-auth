module.exports = (data, message, code) => {
    return {
        result: {
            code: code,
            message: message,
            data: data || [],
        }
    }
}