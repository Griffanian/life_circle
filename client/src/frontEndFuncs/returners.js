function getDataReturn(data) {
    return {
        success: true,
        data: data,
    };
};

function getErrorReturn(error) {
    return {
        success: false,
        error,
    };
}


module.exports = { getDataReturn, getErrorReturn };