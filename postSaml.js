'use strict';

const AWS = require('aws-sdk');
const xml2js = require('xml2js');
const sts = new AWS.STS();

module.exports.handler = async (event, context) => {
  console.log('Starting SAML parsing...\n');
  var arr = event.body.split('&RelayState=');
  var samlResponse = unescape(arr[0].replace('SAMLResponse=', ''));
  var samlBuffer = Buffer.from(samlResponse, 'base64').toString('ascii');
  var result = await xml2js.parseStringPromise(samlBuffer);

  console.log('SAML Response: ');
  console.log(JSON.stringify(result, null, 2));

  const data = await sts.assumeRoleWithSAML({
    PrincipalArn: process.env.IDENTITY_PROVIDER_ARN,
    RoleArn: process.env.ROLE_ARN,
    SAMLAssertion: samlResponse
  }).promise();

  console.log(data);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        input: result
      },
      null,
      2
    ),
  };
};
