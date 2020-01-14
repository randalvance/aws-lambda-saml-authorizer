'use strict';

const jwt = require('jsonwebtoken');

const generatePolicy = (resource, token) => {
    const decoded = jwt.decode(token);
    console.log('JWT Decoded = ' + decoded);
    return ({
        principalId: decoded.userName,
        policyDocument: {
            Version: '2012-10-17',
            Statement: [
                {
                    Effect: 'Allow',
                    Action: 'execute-api:Invoke',
                    Resource: resource,
                },
            ],
        },
        context: decoded,
    });
};

module.exports.handler = (event, context, callback) => {
    const authHeader = event.authorizationToken;
    if (!authHeader) {
        callback('Unauthorized.');
    }
    const token = authHeader.split(' ')[1];
    try {
        jwt.verify(token, 'test');
    } catch(error) {
        console.error(error);
        callback('Unauthorized.');
    }
    return callback(null, generatePolicy(event.methodArn, token));
};
