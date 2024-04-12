const { config } = require('./backendMethods/dbTransactions');

function getDataReturn(type, data) {
    const typeObj = config.resTypes[type]
    const returnObj = {
        success: true,
        message: typeObj.message,
    };

    for (const key in data) {
        const valKey = typeObj.dbName[key];
        returnObj[valKey] = data[key];
    }
    return returnObj
}

function getErrorReturn(error) {
    return {
        success: false,
        error,
    };
}


module.exports = { getDataReturn, getErrorReturn };