"use strict";

const axios = require("axios");
const jwt = require("jsonwebtoken");
const jwkToPem = require("jwk-to-pem");

const {
  AmazonCognitoIdentity,
  userPool
} = require("../../services/asw_cognito");

const register = (body, callback) => {
  const { username, email, password } = body;

  const attributeList = [];

  attributeList.push(
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "email",
      Value: email
    })
  );
  userPool.signUp(username, password, attributeList, null, function (
    err,
    result
  ) {
    if (err) {
      callback(err);
      return;
    }

    callback(null, result.user.getUsername());
  });
};

const login = (body, callback) => {
  const { username, password } = body;
  const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
    {
      Username: username,
      Password: password
    }
  );

  const userData = {
    Username: username,
    Pool: userPool
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (result) {
      const accesstoken = result.getAccessToken().getJwtToken();
      callback(null, accesstoken);
    },
    onFailure: function (err) {
      callback(err);
    }
  });
};

module.exports = { register, login };
