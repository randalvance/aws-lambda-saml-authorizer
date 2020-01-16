# AWS Lambda SAML Authorizer

This project uses the Serverless Framework to deploy the lamba functions.

## Configuration

You will need to create a `.env` file prior to deploying the application to AWS.
These are the variables that this project requires:

|Name|Description|
|----|-----------|
|`IDENTITY_PROVIDER_ARN`|The full ARN of the registered SAML-based identity provider in AWS IAM.|
|`ROLE_ARN`|The ARN of the role the user is assuming.|
|`JWT_SECRET`|The secret key used for signing the JWT.|
|`JWT_EXPIRATION_SECONDS`|The number of seconds before the JWT token expires.|
|`SAML_IDP_URL`|The login URL of the SAML-based identity provider|
|`SAML_CALLBACK_URL`|The callback URL after the user authenticates with the identity provider.|

# Deployment
To deploy run, make sure you are in the serverless project, then run:
```
npx serverless deploy
```
