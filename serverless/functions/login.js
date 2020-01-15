'use strict';

module.exports.handler = (event, context, callback) => {
    const response = {
        statusCode: 301,
        headers: {
            Location: process.env.LOGIN_ENDPOINT,
        }
    };
    
    callback(null, response);
};