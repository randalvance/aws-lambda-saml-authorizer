'use strict';
const { SAML } = require('passport-saml/lib/passport-saml/saml');

const createRequest = event => ({
    query: event.queryStringParameters,
});

module.exports.handler = (event, context, callback) => {
    console.log('Logging in...');

    const samlParser = new SAML({
        entryPoint: process.env.SAML_IDP_URL,
        callbackUrl: process.env.SAML_CALLBACK_URL,
        cer: process.env.SAML_IDP_CERT,
        issuer: event.headers.Host + event.requestContext.path,
        audience: process.env.SAML_CALLBACK_URL,
        providerName: 'AWS SAML Lambda Example',
        signatureAlgorithm: 'sha256'
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