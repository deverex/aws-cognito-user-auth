"use strict";

const AmazonCognitoIdentity = require("amazon-cognito-identity-js");

global.fetch = require("node-fetch");

const poolData = {
  UserPoolId: process.env.AWS_USER_POOL_ID,
  ClientId: process.env.AWS_APP_CLIENT_ID
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

module.exports = { AmazonCognitoIdentity, userPool };
