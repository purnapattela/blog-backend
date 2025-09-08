const ApiResponse = (res, statusCode, success, message, payload = {}) => {
    return res.status(statusCode).json({
        success,
        message,
        ...(success ? { data: payload } : { error: payload })
    });
}

export default ApiResponse