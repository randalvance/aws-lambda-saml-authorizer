# AWS Lambda SAML Authorizer - React

## Configuration

You will need to create a `.env` file prior to building and deploying the application.
These are the variables that this project requires:
|Name|Description|
|----|-----------|
|`REACT_APP_LOGIN_URL`|The URL of the login lambda function.|


## Running the App

Install NodeJS dependencies.
```
npm install
```
Run the app locally.
```
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### Building the App for production
```
npm run build
```

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!
