const { config } = require('./dbTransactions');

function getDataReturn(type, data) {
    console.log(type, data);
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
    console.log('error returned:', error);
    return {
        success: false,
        error,
    };
}


module.exports = { getDataReturn, getErrorReturn };