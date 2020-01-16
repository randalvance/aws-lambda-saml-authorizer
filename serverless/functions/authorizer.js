'use strict';

const jwt = require('jsonwebtoken');

const generatePolicy = (effect, resource, token) => {
    const decoded = token && jwt.decode(token);
    return ({
        principalId: decoded ? decoded.userName : 'unauthorized-user',
        policyDocument: {
            Version: '2012-10-17',
            Statement: [
                {
                    Effect: effect,
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
        return callback(null, generatePolicy('Deny', event.methodArn, token));
    }
    const token = authHeader.split(' ')[1];
    try {
        jwt.verify(token, process.env.JWT_SECRET);
    } catch(error) {
        console.error(error);
        return callback(null, generatePolicy('Deny', event.methodArn, token));
    }
    return callback(null, generatePolicy('Allow', event.methodArn, token));
};
