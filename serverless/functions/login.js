'use strict';
const { SAML } = require('passport-saml/lib/passport-saml/saml');

const createRequest = event => ({
    query: {
        RelayState: event.queryStringParameters.returnUrl,
    },
});

module.exports.handler = (event, context, callback) => {
    console.log('Logging in...');

    const samlParser = new SAML({
        entryPoint: process.env.SAML_IDP_URL,
        callbackUrl: process.env.SAML_CALLBACK_URL,
        issuer: event.headers.Host + event.requestContext.path,
        audience: process.env.SAML_CALLBACK_URL,
        providerName: 'AWS SAML Lambda Example',
    });
    samlParser.getAuthorizeUrl(createRequest(event), {}, (error, url) => {
        if (error) {
            throw error;
        }
        const response = {
            statusCode: 301,
            headers: {
                Location: url,
            }
        };
        
        callback(null, response);
    });
};