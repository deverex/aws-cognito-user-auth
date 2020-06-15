"use strict";

const axios = require("axios");
const jwt = require("jsonwebtoken");
const jwkToPem = require("jwk-to-pem");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    const response = await axios.get(
      `https://cognito-idp.${process.env.AWS_POOL_REGION}.amazonaws.com/${process.env.AWS_USER_POOL_ID}/.well-known/jwks.json`
    );

    if (response.status !== 200) {
      throw new Error();
    }

    const body = response.data;

    const pems = {};
    const keys = body["keys"];
    for (let i = 0; i < keys.length; i++) {
      const key_id = keys[i].kid;
      const modulus = keys[i].n;
      const exponent = keys[i].e;
      const key_type = keys[i].kty;
      const jwk = { kty: key_type, n: modulus, e: exponent };
      const pem = jwkToPem(jwk);
      pems[key_id] = pem;
    }
    const decodedJwt = jwt.decode(token, { complete: true });
    if (!decodedJwt) {
      res.status(401);
      return res.send("Invalid token");
    }
    const kid = decodedJwt.header.kid;
    const pem = pems[kid];
    if (!pem) {
      res.status(401);
      return res.send("Invalid token");
    }
    jwt.verify(token, pem, function (err, payload) {
      if (err) {
        res.status(401);
        return res.send("Invalid tokern");
      } else {
        return next();
      }
    });
  } catch (error) {
    res.status(500);
    return res.send("Error! Unable to download JWKs");
  }
};
