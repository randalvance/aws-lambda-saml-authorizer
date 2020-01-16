'use strict';

const AWS = require('aws-sdk');
const xml2js = require('xml2js');
const jwt = require('jsonwebtoken');

const sts = new AWS.STS();

const getAttributeValue = (key, attributes) => {
  const attribute = attributes.find(attr => attr['$'].Name === key);
  if (!attribute) {
    return null;
  }
  const value = attribute['saml:AttributeValue'][0]._;
  return value;
}

// Format could be different, verify the SAML output of your ADFS
const extractUserInfo = samlObject => {
  const response = samlObject['samlp:Response'];
  const assertion = response['saml:Assertion'][0];
  const attributeStatement = assertion['saml:AttributeStatement'][0];
  const attributes = attributeStatement['saml:Attribute'];

  const email = getAttributeValue('http://schemas.auth0.com/email', attributes);
  const userName = getAttributeValue('http://schemas.auth0.com/username', attributes);
  const displayName = getAttributeValue('http://schemas.auth0.com/name', attributes);
  
  // const roleFromSAML = getAttributeValue('https://aws.amazon.com/SAML/Attributes/Role', attributes);

  // Here we can have the logic on determining the role
  const role = 'User';

  return {
    email,
    userName,
    displayName,
    role,
  };
};

module.exports.handler = async (event, context) => {
  console.log('Starting SAML parsing...\n');
  const arr = event.body.split('&RelayState=');
  const relayState = decodeURIComponent(arr[1]);
  const samlResponse = unescape(arr[0].replace('SAMLResponse=', ''));
  const samlBuffer = Buffer.from(samlResponse, 'base64').toString('ascii');
  const samlObject = await xml2js.parseStringPromise(samlBuffer);

  try {
    // Verifies if SAML assertion is valid
    await sts.assumeRoleWithSAML({
      PrincipalArn: process.env.IDENTITY_PROVIDER_ARN,
      RoleArn: process.env.ROLE_ARN,
      SAMLAssertion: samlResponse
    }).promise();

    const userInfo = extractUserInfo(samlObject);

    const token = jwt.sign(userInfo, process.env.JWT_SECRET, {
      expiresIn: 60 // 30 seconds
    });

    return {
      statusCode: 301,
      headers: {
          Location: `${relayState}?token=${encodeURIComponent(token)}`,
      }
    };
  } catch(error) {
    console.error(error);
    return {
      statusCode: 500,
      body: 'An error occured!',
    };
  }
};
