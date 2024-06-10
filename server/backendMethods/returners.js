const { config } = require('./dbTransactions');

function getDataReturn(type, data) {
    // console.log('type', type);
    // console.log('data', data);
    const typeObj = config.resTypes[type]
    const returnObj = {
        success: true,
        message: typeObj.message,
    };

    for (const key in data) {
        // console.log('key', key);
        const valKey = typeObj.dbName[key];
        // console.log('valKey', valKey);
        returnObj[valKey] = data[key];
    }
    return returnObj
}

function getErrorReturn(error) {
    // console.log(error);
    return {
        success: false,
        error,
    };
}


module.exports = { getDataReturn, getErrorReturn };