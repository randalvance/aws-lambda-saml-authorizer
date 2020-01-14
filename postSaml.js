'use strict';

const AWS = require('aws-sdk');
const xml2js = require('xml2js');
const jwt = require('jsonwebtoken');

const sts = new AWS.STS();

module.exports.handler = async (event, context) => {
  console.log('Starting SAML parsing...\n');
  const arr = event.body.split('&RelayState=');
  const samlResponse = unescape(arr[0].replace('SAMLResponse=', ''));
  const samlBuffer = Buffer.from(samlResponse, 'base64').toString('ascii');
  const result = await xml2js.parseStringPromise(samlBuffer);

  try {
    await sts.assumeRoleWithSAML({
      PrincipalArn: process.env.IDENTITY_PROVIDER_ARN,
      RoleArn: process.env.ROLE_ARN,
      SAMLAssertion: samlResponse
    }).promise();

    const token = jwt.sign({ foo: 'bar' }, 'test');

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          jwt: token,
          saml: result,
        },
        null,
        2
      ),
    };
  } catch(error) {
    console.error(error);
    return {
      statusCode: 500,
      body: 'An error occured!',
    };
  }
};
