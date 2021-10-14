"use strict";
const dotenv = require("dotenv");
const assert = require("assert");

dotenv.config();

const {
  PORT,
  HOST,
  HOST_URL,
  APIKEY,
  AUTHDOMAIN,
  PROJECTID,
  STORAGEBUCKET,
  MESSAGINGSENDERID,
  APPID,
  DRIVE_TYPE,
  DRIVE_PROJECTID,
  DRIVE_PRIVATEKEYID,
  DRIVE_PRIVATEKEY,
  DRIVE_CLIENTEMAIL,
  DRIVE_CLIENTID,
  DRIVE_AUTHURI,
  DRIVE_TOKENURI,
  DRIVE_AUTHPROVIDERCERTURL,
  DRIVE_CLIENTCERTURL,
} = process.env;

assert(PORT, "PORT is required");
assert(HOST, "HOST is required");

module.exports = {
  port: PORT,
  host: HOST,
  url: HOST_URL,
  firebaseConfig: {
    apiKey: APIKEY,
    authDomain: AUTHDOMAIN,
    projectId: PROJECTID,
    storageBucket: STORAGEBUCKET,
    messagingSenderId: MESSAGINGSENDERID,
    appId: APPID,
  },
  driveConfig: {
    type: DRIVE_TYPE,
    project_id: DRIVE_PROJECTID,
    private_key_id: DRIVE_PRIVATEKEYID,
    private_key: DRIVE_PRIVATEKEY,
    client_email: DRIVE_CLIENTEMAIL,
    client_id: DRIVE_CLIENTID,
    auth_uri: DRIVE_AUTHURI,
    token_uri: DRIVE_TOKENURI,
    auth_provider_x509_cert_url: DRIVE_AUTHPROVIDERCERTURL,
    client_x509_cert_url: DRIVE_CLIENTCERTURL,
  },
};
