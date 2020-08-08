///source https://jwt.io/ check more for details
// const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

// const jwtParts = JWT.split('.');

// console.log(jwtParts);

// const headerInBase64UrlFormat = jwtParts[0];
// const payloadInBase64UrlFormat = jwtParts[1];
// const signatureInBase64UrlFormat = jwtParts[2];


// const decodedHeader = base64url.decode(headerInBase64UrlFormat);
// const decodedPayload = base64url.decode(payloadInBase64UrlFormat);
// const decodedSignature = base64url.decode(signatureInBase64UrlFormat);


// console.log(decodedHeader)
// console.log(decodedPayload)
// console.log(decodedSignature)
const base64url = require('base64url');
const crypto = require('crypto');
const signatureFunction = crypto.createSign('RSA-SHA256');
const verifyFunction = crypto.createVerify('RSA-SHA256');
const fs = require('fs');

const headerObj = {
    "alg": "HS256",
    "typ": "JWT"
  }

const payloadObj = {
    "sub": "1234567890",
    "name": "John Doe",
    "iat": 1516239022
  }

  const headerObjString = JSON.stringify(headerObj);
  const payloadObjString = JSON.stringify(payloadObj);

  const base64UrlHeader = base64url(headerObjString);
  const base64UrlPayload = base64url(payloadObjString);

  console.log(base64UrlHeader)
  console.log(base64UrlPayload)
 
//   signatureFunction.write(base64UrlHeader + '.' + base64UrlPayload);
//   signatureFunction.end();

//   const PRIV_KEY = fs.readFileSync(__dirname + '/priv_key.pem','utf8');
//   const signatureBase64 = signatureFunction.sign(PRIV_KEY,'base64');

//   const signatureBase64Url = base64url.fromBase64(signatureBase64);

//   console.log(signatureBase64Url)


const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

const jwtParts = JWT.split('.');

console.log(jwtParts);

const headerInBase64UrlFormat = jwtParts[0];
const payloadInBase64UrlFormat = jwtParts[1];
const signatureInBase64UrlFormat = jwtParts[2];





